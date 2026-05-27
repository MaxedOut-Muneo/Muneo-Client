import { createServer } from 'node:http';

const PORT = Number(process.env.MOCK_PORT ?? 4000);

const MOCK_USER = {
  id: 1,
  email: 'tester@muneo.test',
  name: '문어테스터',
  phoneNumber: '01012345678',
  birthDate: '1995-05-15',
  authProvider: 'LOCAL',
  profileCompleted: true,
  role: 'USER',
};

const MOCK_ESTIMATES = [
  {
    id: 'est-1',
    user_id: '1',
    created_at: '2026-05-20T10:00:00Z',
    input: {
      공종: ['도배', '마루'],
      시공범위: '전체',
      공간유형: '아파트',
      평수: 25,
      방개수: 3,
      지역: '서울',
      건물연식: '10~20년',
      자재등급: '중급',
      철거여부: '있음',
      층수: 5,
      엘리베이터: '있음',
      트럭접근: '있음',
      거주중공사: '아니오',
      공사시기: '봄',
    },
    result: {
      총_견적_범위: { 최소: 30000000, 중간: 38000000, 최대: 45000000 },
      공종별_단가_범위: {},
      공종별_항목_명세: {},
      보정_적용: [],
      시공범위: '전체',
      선택_공종: ['도배', '마루'],
      참고_사례_수: 10,
      참고_사례: [],
      검색_쿼리: '',
    },
  },
];

const MOCK_RISKS = [
  {
    id: 'risk-1',
    user_id: '1',
    created_at: '2026-05-18T14:00:00Z',
    input: { spaceType: '아파트', pyeong: 25, companyName: 'A업체' },
    result: {
      report: {
        title: 'A업체 견적서 진단',
        subtitle_fields: { pyeong: 25, company_name: 'A업체', analyzed_date: '2026-05-18' },
        construction_info: {
          space_type: '아파트',
          region: '서울',
          building_age: '10~20년',
          floor: 5,
          elevator: true,
          room_count: 3,
        },
        cards: {},
        process_sections: [],
        summary: { total_risk_items: 4, chips: { 누락: 2, 중복: 1, 불분명: 1 } },
      },
    },
  },
];

const success = (result, status = 200) => ({
  status,
  body: {
    success: true,
    status,
    code: 'OK',
    timestamp: new Date().toISOString(),
    message: '',
    result,
  },
});

const fail = (code, message, status) => ({
  status,
  body: {
    success: false,
    status,
    code,
    timestamp: new Date().toISOString(),
    message,
  },
});

const parseJson = async (req) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const hasAccessCookie = (req) => {
  const cookie = req.headers.cookie ?? '';
  return /(?:^|;\s*)access_token=mock-access/.test(cookie);
};

const send = (res, { status, body }, extraHeaders = {}) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    ...extraHeaders,
  });
  res.end(JSON.stringify(body));
};

const sendRaw = (res, status, body, extraHeaders = {}) => {
  res.writeHead(status, { 'Content-Type': 'application/json', ...extraHeaders });
  res.end(JSON.stringify(body));
};

const authedRoutes = {
  'GET /api/v1/users/me': () => success(MOCK_USER),
  'GET /api/v1/estimates': () => ({
    status: 200,
    body: MOCK_ESTIMATES,
  }),
  'GET /api/v1/risk-detector': () => ({
    status: 200,
    body: MOCK_RISKS,
  }),
};

const SET_COOKIE_LOGIN = [
  'access_token=mock-access; Path=/; HttpOnly; SameSite=Lax',
  'refresh_token=mock-refresh; Path=/; HttpOnly; SameSite=Lax',
];
const SET_COOKIE_CLEAR = [
  'access_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
  'refresh_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
];

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://localhost:${PORT}`);
  const key = `${req.method} ${url.pathname}`;

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Cookie, x-user-id',
      'Access-Control-Allow-Credentials': 'true',
    });
    res.end();
    return;
  }

  // POST /api/v1/users/login
  if (key === 'POST /api/v1/users/login') {
    const body = await parseJson(req);
    if (body.email && body.password === 'correct-password') {
      send(res, success(MOCK_USER), { 'Set-Cookie': SET_COOKIE_LOGIN });
      return;
    }
    send(res, fail('INVALID_LOGIN_INFO', '이메일 또는 비밀번호가 올바르지 않습니다.', 401));
    return;
  }

  // POST /api/v1/users/signup
  if (key === 'POST /api/v1/users/signup') {
    const body = await parseJson(req);
    if (body.email === 'taken@muneo.test') {
      send(res, fail('EMAIL_ALREADY_EXISTS', '이미 가입된 이메일입니다.', 409));
      return;
    }
    send(res, success(MOCK_USER), { 'Set-Cookie': SET_COOKIE_LOGIN });
    return;
  }

  // POST /api/v1/users/logout
  if (key === 'POST /api/v1/users/logout') {
    send(res, success(null), { 'Set-Cookie': SET_COOKIE_CLEAR });
    return;
  }

  // POST /api/v1/users/refresh
  if (key === 'POST /api/v1/users/refresh') {
    const cookie = req.headers.cookie ?? '';
    if (/refresh_token=mock-refresh/.test(cookie)) {
      send(res, success(null), { 'Set-Cookie': SET_COOKIE_LOGIN });
    } else {
      send(res, fail('UNAUTHORIZED', '인증이 필요합니다.', 401));
    }
    return;
  }

  // POST /api/v1/users/withdraw
  if (key === 'POST /api/v1/users/withdraw') {
    if (!hasAccessCookie(req)) {
      send(res, fail('UNAUTHORIZED', '인증이 필요합니다.', 401));
      return;
    }
    send(res, success(null), { 'Set-Cookie': SET_COOKIE_CLEAR });
    return;
  }

  // PATCH /api/v1/users/me
  if (key === 'PATCH /api/v1/users/me') {
    if (!hasAccessCookie(req)) {
      send(res, fail('UNAUTHORIZED', '인증이 필요합니다.', 401));
      return;
    }
    await parseJson(req);
    send(res, success(MOCK_USER));
    return;
  }

  // POST /api/v1/chatbot/chat
  if (key === 'POST /api/v1/chatbot/chat') {
    if (!hasAccessCookie(req)) {
      send(res, fail('UNAUTHORIZED', '로그인이 필요합니다.', 401));
      return;
    }
    sendRaw(res, 200, {
      answer: '강마루는 합판 위에 무늬목을 입힌 마감재입니다.',
      used: { is_interior: true, use_estimate_cases: false, use_legal_docs: false, use_defect_docs: false },
      sources: [],
    });
    return;
  }

  // POST /api/v1/estimates/generate
  if (key === 'POST /api/v1/estimates/generate') {
    if (!hasAccessCookie(req)) {
      send(res, fail('UNAUTHORIZED', '인증이 필요합니다.', 401));
      return;
    }
    sendRaw(res, 200, {
      총_견적_범위: { 최소: 30000000, 중간: 38000000, 최대: 45000000 },
      공종별_단가_범위: {},
      공종별_항목_명세: {},
      보정_적용: [],
      시공범위: '전체',
      선택_공종: ['도배', '마루'],
      참고_사례_수: 10,
      참고_사례: [],
      검색_쿼리: '',
    });
    return;
  }

  // POST /api/v1/estimates/save
  if (key === 'POST /api/v1/estimates/save') {
    if (!hasAccessCookie(req)) {
      send(res, fail('UNAUTHORIZED', '인증이 필요합니다.', 401));
      return;
    }
    sendRaw(res, 200, { id: 'est-new' });
    return;
  }

  // POST /api/v1/risk-detector/analyze
  if (key === 'POST /api/v1/risk-detector/analyze') {
    if (!hasAccessCookie(req)) {
      send(res, fail('UNAUTHORIZED', '인증이 필요합니다.', 401));
      return;
    }
    sendRaw(res, 200, MOCK_RISKS[0].result);
    return;
  }

  // POST /api/v1/risk-detector/save
  if (key === 'POST /api/v1/risk-detector/save') {
    if (!hasAccessCookie(req)) {
      send(res, fail('UNAUTHORIZED', '인증이 필요합니다.', 401));
      return;
    }
    sendRaw(res, 200, { id: 'risk-new' });
    return;
  }

  // Authed GET routes
  const handler = authedRoutes[key];
  if (handler) {
    if (!hasAccessCookie(req)) {
      send(res, fail('UNAUTHORIZED', '인증이 필요합니다.', 401));
      return;
    }
    const result = handler();
    if (typeof result.status === 'number' && 'body' in result) {
      if (result.body && typeof result.body === 'object' && 'success' in result.body) {
        send(res, result);
      } else {
        sendRaw(res, result.status, result.body);
      }
    }
    return;
  }

  // Health check
  if (key === 'GET /') {
    sendRaw(res, 200, { ok: true });
    return;
  }

  send(res, fail('NOT_FOUND', `Mock route not implemented: ${key}`, 404));
});

server.listen(PORT, () => {
  console.log(`[mock-server] listening on http://localhost:${PORT}`);
});

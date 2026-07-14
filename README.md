<div align="center">

<img width="99" height="32" alt="로고" src="https://github.com/user-attachments/assets/e9a5bd31-f473-4cf9-80b7-ec25c9f70511" />


<h1>문어 (Muneo) Frontend</h1>

<p><em>문제 없는 시공을 위한 어시스턴트 — 문어 웹/관리자 서비스 프론트엔드 모노레포입니다</em></p>

<p>
  <img src="https://img.shields.io/badge/개발기간-2026.03--ing-7D57C1?style=for-the-badge&logo=github&logoColor=white" alt="개발기간"/>
</p>


</div>

<div align="left">

<br>

### 🚀 프로젝트 실행

**1. 의존성 설치** (루트에서 실행 — pnpm workspace)

```bash
pnpm install
```

**2. 환경 변수 설정**

`apps/web/.env.local`, `apps/admin/.env` 파일을 각각 생성하고 API 서버 주소 등을 입력하세요.

```
# apps/web/.env.local
NEXT_PUBLIC_API_URL=

# apps/admin/.env
VITE_API_URL=
```

**3. 개발 서버 실행**

```bash
pnpm dev:web    # web (Next.js) - localhost:3000
pnpm dev:admin  # admin (Vite) - localhost:5173
```

**4. 프로덕션 빌드**

```bash
pnpm build:web
pnpm build:admin
```

**5. 테스트**

```bash
pnpm test           # 유닛 테스트 (Vitest)
pnpm test:e2e        # E2E 테스트 (Playwright)
pnpm storybook       # 디자인 시스템 Storybook
```

<br>

### 📁 프로젝트 구조

```
muneo/
├── apps/
│   ├── web/                          # Next.js — 사용자 서비스
│   │   └── src/
│   │       ├── api/                  # analyze, auth, chatbot, estimate, files, history, user
│   │       ├── app/                  # App Router — (auth), (landing), (main), api, providers
│   │       ├── components/           # FloatingChatLauncher, analytics 등 전역 컴포넌트
│   │       ├── hooks/ store/         # 전역 훅 · Zustand 스토어
│   │       ├── lib/                  # formatters, forms, parsers, validations
│   │       ├── constants/ types/
│   │       └── assets/
│   └── admin/                        # Vite + React Router 7 — 관리자 서비스
│       └── src/
│           ├── api/                  # auth, users
│           ├── pages/                # GlobalError, Login, NotFound, UserDetail, UsersList
│           ├── components/           # Badge, Card, Toast
│           ├── layout/ router/ store/ providers/
│           └── lib/ constants/ types/ styles/
├── packages/
│   ├── design-system/                # @muneo/design-system — 공유 디자인 시스템
│   │   └── src/
│   │       ├── ui/                   # Button, Modal, Dropdown, DatePicker, ChatBubble, ChatInput,
│   │       │                         # FloatingChat, Portal, SelectButton, Sidebar, StatusCard, Text, TextField
│   │       ├── styles/                # tokens.css.ts · theme.css.ts · sprinkles.css.ts · typography.ts
│   │       └── assets/icons/          # SVG → TSX 자동 변환 아이콘 (scripts/build-icons.ts)
│   ├── eslint-config/
│   └── typescript-config/
└── e2e/                              # Playwright E2E 스펙 10개 + mock-server
```

<br>

### 🔧 기술 스택

<table>
  <tr>
    <th align="center">역할</th>
    <th align="center">종류</th>
  </tr>
  <tr>
    <td align="center"><b>Web</b></td>
    <td>
      <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
      <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>Admin</b></td>
    <td>
      <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
      <img src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />
      <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>Styling</b></td>
    <td>
      <img src="https://img.shields.io/badge/Vanilla%20Extract-F786AD?style=for-the-badge&logo=vanillaextract&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>State &amp; Data</b></td>
    <td>
      <img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" />
      <img src="https://img.shields.io/badge/Zustand-433E38?style=for-the-badge" />
      <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" />
      <img src="https://img.shields.io/badge/ky-000000?style=for-the-badge" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>Monorepo</b></td>
    <td>
      <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" />
      <img src="https://img.shields.io/badge/Turborepo-FF1E56?style=for-the-badge&logo=turborepo&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>Testing</b></td>
    <td>
      <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" />
      <img src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" />
      <img src="https://img.shields.io/badge/MSW-FF6A33?style=for-the-badge&logo=mswjs&logoColor=white" />
      <img src="https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>Infra</b></td>
    <td>
      <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
      <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>Tooling</b></td>
    <td>
      <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
      <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" />
      <img src="https://img.shields.io/badge/Husky-000000?style=for-the-badge" />
    </td>
  </tr>
</table>

<br>

### 👥 팀원

<table>
  <tr>
    <td align="center"><img src="https://github.com/KyeongJooni.png" width="160" /></td>
    <td align="center"><img src="https://github.com/tmdcks1103.png" width="160" /></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/KyeongJooni">이경준</a></td>
    <td align="center"><a href="https://github.com/tmdcks1103">김승찬</a></td>
  </tr>
</table>

</div>

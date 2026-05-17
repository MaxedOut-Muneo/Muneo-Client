'use client';

import { DellSquareIcon, DoneRingRoundFillIcon, SadIcon, vars } from '@muneo/design-system';
import { useEffect, useState } from 'react';
import { getEstimates, getRiskDetections } from '@/api/history';
import { useAuthStore } from '@/store/authStore';
import { HistoryTable } from './_components/HistoryTable/HistoryTable';
import { SummaryCard } from './_components/SummaryCard/SummaryCard';
import { type HistoryRow, type SummaryStats } from './_types/home.types';
import * as styles from './page.css';

const toDate = (isoStr: string) => isoStr.slice(0, 10);

const HomePage = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<SummaryStats>({ estimateCount: 0, diagnosedCount: 0, riskCount: 0 });
  const [rows, setRows] = useState<HistoryRow[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchData = async () => {
      try {
        const [estimates, risks] = await Promise.all([getEstimates(user.id), getRiskDetections(user.id)]);

        const estimateRows: HistoryRow[] = estimates.map((item) => ({
          id: item.id,
          date: toDate(item.created_at),
          analysisType: '가견적서 생성',
          constructionType: `${item.input.공간유형} ${item.input.평수}평 (${item.input.공종.join(', ')})`,
          vendor: null,
          risk: { type: 'none' as const },
        }));

        const riskRows: HistoryRow[] = risks.map((item) => {
          const { total_risk_items: totalRiskItems, chips } = item.result.report.summary;
          const risk: HistoryRow['risk'] =
            totalRiskItems === 0
              ? { type: 'safe', label: '이상 없음' }
              : { type: 'danger', label: chips.누락 > 0 ? `누락 ${chips.누락}건` : `위험 ${totalRiskItems}건` };

          return {
            id: item.id,
            date: toDate(item.created_at),
            analysisType: '리스크 진단',
            constructionType: `${item.input.spaceType} ${item.input.pyeong}평`,
            vendor: item.input.companyName,
            risk,
          };
        });

        const allRows = [...estimateRows, ...riskRows].sort((a, b) => b.date.localeCompare(a.date));
        const riskCount = risks.filter((r) => r.result.report.summary.total_risk_items > 0).length;

        setStats({ estimateCount: estimates.length, diagnosedCount: risks.length, riskCount });
        setRows(allRows);
      } catch (err) {
        console.error('홈 데이터 로딩 실패:', err);
      }
    };

    fetchData();
  }, [user]);

  const SUMMARY_CARDS = [
    {
      icon: <DellSquareIcon width={22} height={22} style={{ color: vars.color.brand.secondary }} />,
      label: '그동안 생성한 가견적서',
      count: stats.estimateCount,
    },
    {
      icon: <DoneRingRoundFillIcon width={22} height={22} />,
      label: '진단 완료한 견적',
      count: stats.diagnosedCount,
    },
    {
      icon: <SadIcon width={22} height={22} />,
      label: '리스크 발생 견적',
      count: stats.riskCount,
      danger: true as const,
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.greetingSection}>
          <h1 className={styles.greetingTitle}>
            안녕하세요, <span className={styles.greetingName}>{user?.name ?? ''}</span> 님
          </h1>
          <p className={styles.greetingSubtitle}>오늘도 문어와 함께 현명한 의사 결정을 내리세요.</p>
        </div>

        <div className={styles.summaryRow}>
          {SUMMARY_CARDS.map((props) => (
            <SummaryCard key={props.label} {...props} />
          ))}
        </div>

        <HistoryTable rows={rows} />
      </div>
    </div>
  );
};

export default HomePage;

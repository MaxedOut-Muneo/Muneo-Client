import { ArrowLeftMdIcon } from '@muneo/design-system';
import { notFound } from 'next/navigation';
import { getServerEstimates, getServerRiskDetections } from '@/api/history';
import { getServerMe } from '@/api/user';
import { TransitionLink } from '@/components/TransitionLink';
import { EstimateResultView } from '../../estimate/_components/EstimateResultView/EstimateResultView';
import * as styles from './page.css';

export default async function HistoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getServerMe();

  const [estimates, risks] = await Promise.all([getServerEstimates(user.id), getServerRiskDetections(user.id)]);

  const estimate = estimates.find((e) => e.id === id);
  if (estimate) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <TransitionLink href="/history" className={styles.backButton}>
            <ArrowLeftMdIcon width={16} height={16} />
            분석 이력
          </TransitionLink>
          <div className={styles.content}>
            <EstimateResultView input={estimate.input} result={estimate.result} />
          </div>
        </div>
      </div>
    );
  }

  const risk = risks.find((r) => r.id === id);
  if (risk) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <TransitionLink href="/history" className={styles.backButton}>
            <ArrowLeftMdIcon width={16} height={16} />
            분석 이력
          </TransitionLink>
          <div className={styles.content}>
            <div>
              <h1 style={{ fontSize: '30px', fontWeight: 700, marginBottom: '8px' }}>리스크 진단 결과</h1>
              <p style={{ color: '#6B7280', marginBottom: '24px' }}>
                {risk.input.companyName} · {risk.input.spaceType} {risk.input.pyeong}평
              </p>
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  gap: '32px',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#EF4444' }}>
                    {risk.result.report.summary.chips.누락}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>누락</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#F59E0B' }}>
                    {risk.result.report.summary.chips.중복}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>중복</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#3B82F6' }}>
                    {risk.result.report.summary.chips.불분명}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>불분명</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return notFound();
}

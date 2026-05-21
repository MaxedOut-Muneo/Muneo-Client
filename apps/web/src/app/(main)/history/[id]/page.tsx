'use client';

import { ArrowLeftMdIcon } from '@muneo/design-system';
import { notFound , useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { getEstimates, getRiskDetections, type EstimateItem, type RiskItem } from '@/api/history';
import { TransitionLink } from '@/components/TransitionLink';
import { useAuthStore } from '@/store/authStore';
import { EstimateDetailView } from '../_components/EstimateDetailView/EstimateDetailView';
import * as styles from './page.css';

type PageState =
  | { kind: 'loading' }
  | { kind: 'estimate'; item: EstimateItem }
  | { kind: 'risk'; item: RiskItem }
  | { kind: 'not-found' };

export default function HistoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuthStore();
  const router = useRouter();
  const [state, setState] = useState<PageState>({ kind: 'loading' });

  useEffect(() => {
    if (!user) {
      router.replace('/login');
      return;
    }

    let mounted = true;

    Promise.all([getEstimates(user.id), getRiskDetections(user.id)])
      .then(([estimates, risks]) => {
        if (!mounted) {return;}
        const estimate = estimates.find((e) => e.id === id);
        if (estimate) {
          setState({ kind: 'estimate', item: estimate });
          return;
        }
        const risk = risks.find((r) => r.id === id);
        if (risk) {
          setState({ kind: 'risk', item: risk });
          return;
        }
        setState({ kind: 'not-found' });
      })
      .catch(() => {
        if (mounted) {setState({ kind: 'not-found' });}
      });

    return () => {
      mounted = false;
    };
  }, [id, user, router]);

  if (state.kind === 'not-found') {return notFound();}

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <TransitionLink href="/history" className={styles.backButton}>
          <ArrowLeftMdIcon width={16} height={16} />
          분석 이력
        </TransitionLink>

        <div className={styles.content}>
          {state.kind === 'loading' && (
            <div className={styles.loadingWrap}>
              <p className={styles.loadingText}>불러오는 중...</p>
            </div>
          )}
          {state.kind === 'risk' && (
            <div>
              <h1 style={{ fontSize: '30px', fontWeight: 700, marginBottom: '8px' }}>리스크 진단 결과</h1>
              <p style={{ color: '#6B7280', marginBottom: '24px' }}>
                {state.item.input.companyName} · {state.item.input.spaceType} {state.item.input.pyeong}평
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
                    {state.item.result.report.summary.chips.누락}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>누락</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#F59E0B' }}>
                    {state.item.result.report.summary.chips.중복}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>중복</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#3B82F6' }}>
                    {state.item.result.report.summary.chips.불분명}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>불분명</div>
                </div>
              </div>
            </div>
          )}
          {state.kind === 'estimate' && <EstimateDetailView item={state.item} />}
        </div>
      </div>
    </div>
  );
}

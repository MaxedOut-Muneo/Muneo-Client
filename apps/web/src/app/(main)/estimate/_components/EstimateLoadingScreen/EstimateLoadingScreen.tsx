'use client';

import * as styles from './EstimateLoadingScreen.css';

export const EstimateLoadingScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
      <div className={styles.textGroup}>
        <span className={styles.title}>가견적을 계산하고 있어요</span>
        <span className={styles.subtitle}>
          실제 시공 사례를 분석해 견적 범위를 산출하고 있습니다.
          <br />
          잠시만 기다려 주세요.
        </span>
      </div>
    </div>
  );
};

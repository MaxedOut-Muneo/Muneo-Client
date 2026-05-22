'use client';

import { useEffect, useMemo, useState } from 'react';
import * as styles from './EstimateLoadingScreen.css';

const TIPS = [
  '가견적은 실제 시공비와 ±20% 오차가 있을 수 있어요',
  '공정을 세밀하게 입력할수록 견적 정확도가 높아져요',
  '철거 공정은 건물 연식에 따라 비용이 달라질 수 있어요',
  '인테리어 견적은 계절·시기에 따라 15~30% 차이가 날 수 있어요',
  '엘리베이터 유무는 자재 운반비에 직접 영향을 줘요',
  '창호 교체는 단열 성능 향상에 가장 효과적인 공정이에요',
  '트럭 접근이 어려울수록 하차 비용이 추가돼요',
];

const WARNING_MSG = '시간이 예상보다 걸리고 있어요. 조금만 더 기다려 주세요.';

interface Props {
  region: string | null;
  processCount: number;
  onCancel: () => void;
}

export const EstimateLoadingScreen = ({ region, processCount, onCancel }: Props) => {
  const messages = useMemo(
    () => [
      '입력하신 조건과 유사한 사례를 검색하고 있어요',
      `${processCount}개 공정의 세부 항목별 시세를 분석 중이에요`,
      `${region ?? '해당 지역'} 기준 인건비 단가를 반영하고 있어요`,
      '공정별 재료비와 철거·폐기 비용을 계산하고 있어요',
      '최종 견적 범위를 산출하고 있어요',
    ],
    [region, processCount]
  );

  const [msgIdx, setMsgIdx] = useState(0);
  const [msgExiting, setMsgExiting] = useState(false);
  const [progress, setProgress] = useState<{ value: number; duration: number; easing: string }>({
    value: 0,
    duration: 0,
    easing: 'linear',
  });
  const [tipIdx, setTipIdx] = useState(0);
  const [tipExiting, setTipExiting] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setProgress({ value: 30, duration: 3000, easing: 'ease-out' }), 100);
    const t2 = setTimeout(() => setProgress({ value: 70, duration: 8000, easing: 'linear' }), 3200);
    const t3 = setTimeout(() => setProgress({ value: 85, duration: 12000, easing: 'linear' }), 11200);
    const t4 = setTimeout(() => setProgress({ value: 92, duration: 20000, easing: 'linear' }), 23200);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setMsgExiting(true);
      const tid = setTimeout(() => {
        setMsgIdx((i) => (i + 1) % messages.length);
        setMsgExiting(false);
      }, 270);
      return () => clearTimeout(tid);
    }, 4000);
    return () => clearInterval(id);
  }, [messages.length]);

  useEffect(() => {
    const id = setInterval(() => {
      setTipExiting(true);
      const tid = setTimeout(() => {
        setTipIdx((i) => (i + 1) % TIPS.length);
        setTipExiting(false);
      }, 330);
      return () => clearTimeout(tid);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowWarning(true), 30000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.mascotWrap}>
        <svg className={styles.mascotImg} viewBox="0 0 318 225" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M223.42 0C275.175 0 317.132 41.8155 317.132 93.3975C317.132 93.4476 317.131 93.4977 317.131 93.5479V179.104C316.852 186.528 317.902 197.168 310.961 207.93C304.019 218.692 291.293 222.535 279.723 206.008C277.366 202.641 271.45 200.284 267.768 206.008C258.127 220.998 240.388 221.766 229.59 206.008C226.864 202.031 219.692 201.636 216.863 206.008C207.413 220.613 190.254 221.766 178.684 206.008C175.985 201.012 169.732 200.628 166.344 206.008C158.118 219.076 145.519 220.614 136.649 209.083C132.065 202.396 130.395 197.783 129.708 187.276V93.3936H129.709C129.711 41.8134 171.666 9.71069e-05 223.42 0Z"
            fill="#8455DF"
          />
          <path
            d="M223.813 28.9412C261.903 28.9412 292.729 57.9991 292.729 93.781C292.729 129.563 261.903 158.621 223.813 158.621C185.723 158.621 154.897 129.563 154.897 93.781C154.897 57.9991 185.723 28.9412 223.813 28.9412Z"
            fill="white"
            stroke="#8455DF"
          />
          <rect x="188.056" y="95.0508" width="16.7396" height="30.5168" rx="8.3698" fill="#8455DF" stroke="#8455DF" />
          <rect x="238.188" y="95.0508" width="16.7396" height="30.5168" rx="8.3698" fill="#8455DF" stroke="#8455DF" />
          <path
            d="M10.5085 127.034C12.4797 119.917 20.1856 114.827 24.049 111.845C36.6964 102.603 64.7902 82.015 72.2542 76.5606C79.7183 71.1061 84.3583 74.3151 85.8508 76.5606C86.9066 77.7862 90.494 82.8818 98.4228 94.1442L99.2493 95.3182C109.884 110.424 97.1264 112.066 85.8508 114.394C79.5814 115.689 80.3527 121.838 83.8235 127.219L114.457 172.128C116.959 176.179 120.7 186.762 109.662 194.097C99.2495 201.015 89.3928 193.328 85.1405 186.88C79.6263 178.518 67.1428 159.426 61.3218 149.953C54.201 138.366 52.6641 136.564 44.1022 141.44C33.304 147.59 35.6751 160.593 29.1858 161.522C22.6965 162.451 20.3332 159.889 14.3422 150.446C8.3513 141.002 8.61658 133.866 10.5085 127.034Z"
            fill="#8455DF"
            stroke="#8455DF"
          />
        </svg>
      </div>

      <div className={styles.msgWrap}>
        {showWarning ? (
          <span key="warning" className={styles.msg}>
            {WARNING_MSG}
          </span>
        ) : (
          <span key={msgIdx} className={`${styles.msg}${msgExiting ? ` ${styles.msgExiting}` : ''}`}>
            {messages[msgIdx]}
          </span>
        )}
      </div>

      <div className={styles.progressWrap}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress.value}%`, transition: `width ${progress.duration}ms ${progress.easing}` }}
        />
      </div>

      <div key={tipIdx} className={`${styles.tipCard}${tipExiting ? ` ${styles.tipCardExiting}` : ''}`}>
        <span className={styles.tipIcon}>💡</span>
        <span className={styles.tipText}>{TIPS[tipIdx]}</span>
      </div>

      <div className={styles.dots}>
        {TIPS.map((_, i) => (
          <span key={i} className={`${styles.dot}${i === tipIdx ? ` ${styles.dotActive}` : ''}`} />
        ))}
      </div>

      <div className={styles.footer}>
        <span className={styles.footerText}>보통 10~15초 정도 소요돼요</span>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

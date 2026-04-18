'use client';

import { clsx } from 'clsx';
import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { sectionDivider, sectionHeader, sectionSubtitle, sectionTitle } from '../sectionHeader.css';
import * as styles from './FaqSection.css';

const FAQS = [
  {
    id: 1,
    question: '어떤 형식의 견적서를 지원하나요?',
    answer: 'PDF, JPG, PNG 형식의 파일을 지원합니다. 견적서 이미지를 업로드하면 AI가 자동으로 텍스트를 인식합니다.',
  },
  {
    id: 2,
    question: '분석 결과를 얼마나 신뢰할 수 있나요?',
    answer: '실제 시장 데이터를 기반으로 학습된 AI가 분석하며, 주요 리스크 항목은 90% 이상의 정확도를 보입니다.',
  },
  {
    id: 3,
    question: '서비스 이용 요금은 얼마인가요?',
    answer: '기본 기능은 무료로 제공됩니다. 심화 분석 및 상세 리포트는 유료 플랜에서 이용하실 수 있습니다.',
  },
  {
    id: 4,
    question: '업로드한 견적서 정보는 안전한가요?',
    answer: '모든 업로드 파일은 암호화되어 저장되며, 분석 완료 후 자동으로 삭제됩니다.',
  },
  {
    id: 5,
    question: 'AI 챗봇으로 어떤 질문을 할 수 있나요?',
    answer: '시공 공정, 자재 단가, 표준 견적 범위 등 인테리어 전반에 관한 전문 지식을 24시간 질문하실 수 있습니다.',
  },
];

const SECTION_TITLE_ID = 'faq-title';

export const FaqSection = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const { ref, inView } = useInView<HTMLElement>();

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" ref={ref} className={styles.section} aria-labelledby={SECTION_TITLE_ID}>
      <div className={styles.container}>
        <div className={clsx(styles.inner, inView && styles.innerVisible)}>
          <header className={sectionHeader}>
            <h2 id={SECTION_TITLE_ID} className={sectionTitle}>
              자주 묻는 질문
            </h2>
            <div className={sectionDivider} aria-hidden="true" />
            <p className={sectionSubtitle}>궁금한 것이 있으신가요?</p>
          </header>
          <ul className={styles.faqList}>
            {FAQS.map(({ id, question, answer }) => {
              const isOpen = openId === id;
              const answerId = `faq-answer-${id}`;
              return (
                <li key={id} className={styles.faqItem}>
                  <button
                    type="button"
                    className={clsx(styles.faqQuestion, isOpen && styles.faqQuestionActive)}
                    onClick={() => toggle(id)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span className={clsx(styles.questionText, isOpen && styles.questionTextActive)}>{question}</span>
                    <span className={clsx(styles.chevron, isOpen && styles.chevronActive)} aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4 6L8 10L12 6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={answerId}
                    aria-hidden={!isOpen}
                    className={clsx(styles.faqAnswer, isOpen && styles.faqAnswerOpen)}
                  >
                    <div className={styles.faqAnswerInner}>
                      <p className={styles.answerText}>{answer}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

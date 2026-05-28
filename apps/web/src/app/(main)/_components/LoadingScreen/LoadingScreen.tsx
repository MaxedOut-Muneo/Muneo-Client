'use client';

import { LoadingFooter } from './_components/LoadingFooter';
import { Mascot } from './_components/Mascot';
import { ProgressBar } from './_components/ProgressBar';
import { RotatingMessage } from './_components/RotatingMessage';
import { TipCard } from './_components/TipCard';
import { WorkingDots } from './_components/WorkingDots';
import { type ProgressStep } from './_hooks/useProgressSteps';
import * as styles from './LoadingScreen.css';

export type { ProgressStep };

interface Props {
  messages: string[];
  tips: string[];
  warningMessage: string;
  warningDelayMs: number;
  progressSteps: ProgressStep[];
  footerText: string;
  onCancel: () => void;
}

export const LoadingScreen = ({
  messages,
  tips,
  warningMessage,
  warningDelayMs,
  progressSteps,
  footerText,
  onCancel,
}: Props) => (
  <div className={styles.container}>
    <Mascot />
    <WorkingDots />
    <RotatingMessage messages={messages} warningMessage={warningMessage} warningDelayMs={warningDelayMs} />
    <ProgressBar steps={progressSteps} />
    <TipCard tips={tips} />
    <LoadingFooter footerText={footerText} onCancel={onCancel} />
  </div>
);

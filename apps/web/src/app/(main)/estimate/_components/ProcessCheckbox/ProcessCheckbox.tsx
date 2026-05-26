import { type ProcessId, type ProcessInfo } from '../../_types';
import * as styles from './ProcessCheckbox.css';

interface ProcessCheckboxProps {
  process: ProcessInfo<ProcessId>;
  selected: boolean;
  onToggle: (id: ProcessId) => void;
  hasDetail?: boolean;
}

export const ProcessCheckbox = ({ process, selected, onToggle, hasDetail = false }: ProcessCheckboxProps) => {
  return (
    <button
      type="button"
      className={selected ? styles.cardSelected : styles.cardUnselected}
      onClick={() => onToggle(process.id)}
      aria-pressed={selected}
    >
      {hasDetail && (
        <span className={selected ? styles.detailDotActive : styles.detailDot} title="세부 입력 항목이 있어요" />
      )}
      <span className={selected ? styles.processNameSelected : styles.processNameUnselected}>{process.name}</span>
      <span className={styles.processDesc}>{process.description}</span>
    </button>
  );
};

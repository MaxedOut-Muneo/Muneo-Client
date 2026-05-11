import { type ProcessId, type ProcessInfo } from '../../_types';
import * as styles from './ProcessCheckbox.css';

interface ProcessCheckboxProps {
  process: ProcessInfo;
  selected: boolean;
  onToggle: (id: ProcessId) => void;
}

export function ProcessCheckbox({ process, selected, onToggle }: ProcessCheckboxProps) {
  return (
    <button
      type="button"
      className={selected ? styles.cardSelected : styles.cardUnselected}
      onClick={() => onToggle(process.id as ProcessId)}
      aria-pressed={selected}
    >
      <span className={selected ? styles.processNameSelected : styles.processNameUnselected}>{process.name}</span>
      <span className={styles.processDesc}>{process.description}</span>
    </button>
  );
}

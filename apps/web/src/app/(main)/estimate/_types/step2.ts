import { type ProcessId } from './meta';

export const PROCESS_MODES = ['full', 'partial'] as const;
export type ProcessMode = (typeof PROCESS_MODES)[number];

export interface Step2Data {
  mode: ProcessMode;
  selectedProcesses: ProcessId[];
}

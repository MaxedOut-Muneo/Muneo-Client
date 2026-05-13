'use client';

import { Button } from '@muneo/design-system';
import { useRef, useState } from 'react';
import { useAnalysisStore } from '../../_store/analysisStore';
import * as styles from './UploadPanel.css';

const ACCEPT = '.pdf,.jpg,.jpeg,.png,.csv,.xls,.xlsx';

const formatSize = (bytes: number): string => {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)}KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
};

export const UploadPanel = () => {
  const { files, loading, addFile, removeFile, submitAnalysis, reset } = useAnalysisStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) {
      return;
    }
    Array.from(fileList).forEach((f) => {
      if (!files.find((e) => e.name === f.name)) {
        addFile({ name: f.name, size: formatSize(f.size) });
      }
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>견적서 업로드</span>
        <span className={styles.sectionSubtitle}>견적서를 업로드하여 분석할 수 있습니다.</span>
      </div>

      <div className={styles.body}>
        <div className={styles.uploadArea}>
          <div
            role="button"
            tabIndex={0}
            className={`${styles.dropzone}${dragging ? ` ${styles.dropzoneDragging}` : ''}`}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                if (e.key === ' ') {
                  e.preventDefault();
                }
                inputRef.current?.click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
          >
            <div className={styles.dropzoneText}>
              <p className={styles.dropzoneMain}>파일을 드래그하거나 클릭하여 업로드</p>
              <p className={styles.dropzoneSub}>PDF, JPG, PNG, CSV, Excel 지원</p>
            </div>
            <Button
              variant="outlineSecondaryStrong"
              size="sm"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
            >
              파일 업로드
            </Button>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            multiple
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />

          {files.length > 0 && (
            <div className={styles.fileList}>
              {files.map((f) => (
                <div key={f.name} className={styles.fileItem}>
                  <div className={styles.fileInfo}>
                    <span className={styles.fileName}>{f.name}</span>
                    <span className={styles.fileSize}>{f.size}</span>
                  </div>
                  <button type="button" className={styles.fileDelete} onClick={() => removeFile(f.name)}>
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.divider} />

        <div className={styles.actions}>
          <Button variant="outlineSecondaryStrong" size="md" className={styles.actionButton} onClick={reset}>
            초기화 ↺
          </Button>
          <Button
            variant="gradient"
            size="md"
            className={styles.actionButton}
            disabled={loading}
            onClick={() => {
              if (loading) {
                return;
              }
              void submitAnalysis();
            }}
          >
            분석 시작
          </Button>
        </div>
      </div>
    </div>
  );
};

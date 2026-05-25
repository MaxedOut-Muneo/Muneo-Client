import { type PresignedUrlResponse } from '@/app/(main)/analysis/_types/analysis.types';
import { client } from './client';

const isDev = process.env.NODE_ENV === 'development';

export const getPresignedUrl = async (filename: string, contentType: string): Promise<PresignedUrlResponse> => {
  if (isDev) {
    console.group(`[진단] getPresignedUrl — ${filename}`);
    console.log('[요청]', { filename, contentType, type: 'Estimate' });
  }

  const res = await client
    .get('api/v1/files/presigned-url', { searchParams: { type: 'Estimate', filename, contentType } })
    .json<PresignedUrlResponse>();

  if (isDev) {
    console.log('[응답] presigned URL 발급 완료');
    console.groupEnd();
  }
  return res;
};

export const uploadToS3 = async (uploadUrl: string, file: File): Promise<void> => {
  if (isDev) {
    console.group(`[진단] uploadToS3 — ${file.name}`);
    console.log('[요청]', { name: file.name, type: file.type, size: file.size });
  }

  const res = await fetch(uploadUrl, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`S3 업로드 실패: ${res.status}${body ? ` — ${body}` : ''}`);
  }

  if (isDev) {
    console.log('[응답]', { status: res.status, ok: res.ok });
    console.groupEnd();
  }
};

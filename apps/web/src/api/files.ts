import { type PresignedUrlResponse } from '@/app/(main)/analysis/_types/analysis.types';
import { client } from './client';

export const getPresignedUrl = async (filename: string, contentType: string): Promise<PresignedUrlResponse> => {
  console.group(`[진단] getPresignedUrl — ${filename}`);
  console.log('[요청]', { filename, contentType, type: 'Estimate' });

  const res = await client
    .get('api/v1/files/presigned-url', { searchParams: { type: 'Estimate', filename, contentType } })
    .json<PresignedUrlResponse>();

  console.log('[응답]', res);
  console.groupEnd();
  return res;
};

// S3 직접 PUT — presignedUrl은 외부 URL이므로 Next.js 프록시를 거치지 않음
export const uploadToS3 = async (uploadUrl: string, file: File): Promise<void> => {
  console.group(`[진단] uploadToS3 — ${file.name}`);
  console.log('[요청]', { uploadUrl, name: file.name, type: file.type, size: file.size });

  const res = await fetch(uploadUrl, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });

  console.log('[응답]', { status: res.status, ok: res.ok });
  console.groupEnd();
};

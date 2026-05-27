export interface PresignedUrlResponse {
  uploadUrl: string;
  key: string;
  fileUrl: string;
  uploadMethod: 'PUT';
  contentType: string;
  expiresAt: string;
}

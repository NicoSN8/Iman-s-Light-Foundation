import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { requireAdminApi } from '@/lib/adminAuth';

export async function POST(request: Request): Promise<Response> {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        maximumSizeInBytes: 20 * 1024 * 1024, // 20MB — a couple of existing event photos are 10+MB
        addRandomSuffix: true,
      }),
    });
    return Response.json(jsonResponse);
  } catch (err) {
    console.error('Blob upload failed:', err);
    return Response.json({ ok: false, error: 'Upload failed.' }, { status: 400 });
  }
}

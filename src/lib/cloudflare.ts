/**
 * Cloudflare R2 utility functions
 * Handles image uploads to Cloudflare R2 (S3-compatible storage)
 */

import { S3Client, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

interface CloudflareUploadResponse {
  success: boolean;
  result?: {
    id: string;
    filename: string;
    uploaded: string;
    url: string;
    key: string;
  };
  errors?: Array<{
    code: number;
    message: string;
  }>;
}

/**
 * Get S3 client configured for Cloudflare R2
 */
function getR2Client(): S3Client {
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const endpoint = process.env.CLOUDFLARE_R2_ENDPOINT;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

  if (!accessKeyId || !secretAccessKey) {
    throw new Error('R2 credentials not configured. Please check CLOUDFLARE_R2_ACCESS_KEY_ID and CLOUDFLARE_R2_SECRET_ACCESS_KEY in .env.local');
  }

  // Use provided endpoint or construct from account ID
  const r2Endpoint = endpoint || `https://${accountId}.r2.cloudflarestorage.com`;

  return new S3Client({
    region: 'auto',
    endpoint: r2Endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

/**
 * Generate a unique key for the file in R2
 */
function generateFileKey(filename: string): string {
  const folder = process.env.CLOUDFLARE_PRODUCT_IMAGE_FOLDER || 'product_images';
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');

  return `${folder}/${timestamp}-${randomString}-${sanitizedFilename}`;
}

/**
 * Upload an image to Cloudflare R2
 * @param imageFile - File or Buffer to upload
 * @param filename - Name of the file
 * @returns Upload response with file key and URL
 */
export async function uploadImageToCloudflare(
  imageFile: File | Buffer,
  filename: string
): Promise<CloudflareUploadResponse> {
  const bucket = process.env.CLOUDFLARE_BUCKET;

  if (!bucket) {
    throw new Error('R2 bucket not configured. Please check CLOUDFLARE_BUCKET in .env.local');
  }

  const client = getR2Client();
  const key = generateFileKey(filename);

  try {
    let fileBuffer: Buffer;
    let contentType = 'image/jpeg';

    // Convert File to Buffer if needed
    if (imageFile instanceof File) {
      contentType = imageFile.type || 'image/jpeg';
      const arrayBuffer = await imageFile.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
    } else {
      fileBuffer = imageFile;
      // Try to detect content type from filename
      if (filename.endsWith('.png')) contentType = 'image/png';
      else if (filename.endsWith('.gif')) contentType = 'image/gif';
      else if (filename.endsWith('.webp')) contentType = 'image/webp';
      else if (filename.endsWith('.svg')) contentType = 'image/svg+xml';
    }

    // Upload to R2 using S3 SDK
    const upload = new Upload({
      client,
      params: {
        Bucket: bucket,
        Key: key,
        Body: fileBuffer,
        ContentType: contentType,
      },
    });

    await upload.done();

    const url = getCloudflareImageUrl(key);

    return {
      success: true,
      result: {
        id: key, // Use R2 key as ID
        filename,
        uploaded: new Date().toISOString(),
        url,
        key,
      },
    };
  } catch (error: any) {
    console.error('Error uploading to R2:', error);
    console.error('R2 Error details:', {
      message: error?.message,
      code: error?.Code || error?.code,
      name: error?.name,
      stack: error?.stack,
    });

    // Provide more helpful error message
    const errorMessage = error?.message || error?.Code || error?.toString() || 'Failed to upload to Cloudflare R2';
    throw new Error(`Cloudflare R2 upload failed: ${errorMessage}`);
  }
}

/**
 * Delete an image from Cloudflare R2
 * @param imageKey - R2 object key (not image ID)
 * @returns Success status
 */
export async function deleteImageFromCloudflare(
  imageKey: string
): Promise<boolean> {
  const bucket = process.env.CLOUDFLARE_BUCKET;

  if (!bucket) {
    throw new Error('R2 bucket not configured');
  }

  const client = getR2Client();

  try {
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: imageKey,
    });

    await client.send(command);
    return true;
  } catch (error) {
    console.error('Error deleting from R2:', error);
    return false;
  }
}

/**
 * Get the proxy URL for an R2 object (private bucket served through API proxy)
 * @param imageKey - R2 object key
 * @returns URL to proxy endpoint that serves the image
 */
export function getCloudflareImageUrl(imageKey: string): string {
  if (!imageKey) {
    return '';
  }

  // Encode the key to handle special characters in URLs
  const encodedKey = encodeURIComponent(imageKey);

  // Return URL to our proxy API endpoint
  // The API endpoint will fetch from R2 with credentials
  return `/api/images/${encodedKey}`;
}

/**
 * Fetch an image from R2
 * Used by the image proxy API endpoint
 * @param imageKey - R2 object key
 * @returns Image data as a stream
 */
export async function fetchImageFromR2(imageKey: string): Promise<{
  stream: ReadableStream | null;
  contentType: string;
  contentLength?: number;
}> {
  const bucket = process.env.CLOUDFLARE_BUCKET;

  if (!bucket) {
    throw new Error('Missing CLOUDFLARE_BUCKET');
  }

  try {
    const client = getR2Client();

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: imageKey,
    });

    const response = await client.send(command);

    return {
      stream: response.Body?.transformToWebStream() || null,
      contentType: response.ContentType || 'image/jpeg',
      contentLength: response.ContentLength,
    };
  } catch (error) {
    console.error('Error fetching image from R2:', error);
    throw error;
  }
}

/**
 * Check if an image exists in R2
 * @param imageKey - R2 object key
 * @returns True if exists, false otherwise
 */
export async function imageExists(imageKey: string): Promise<boolean> {
  const bucket = process.env.CLOUDFLARE_BUCKET;

  if (!bucket) {
    return false;
  }

  const client = getR2Client();

  try {
    const command = new HeadObjectCommand({
      Bucket: bucket,
      Key: imageKey,
    });

    await client.send(command);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Upload multiple images to Cloudflare R2
 * @param images - Array of {file, filename} objects
 * @returns Array of upload results
 */
export async function uploadMultipleImages(
  images: Array<{ file: File | Buffer; filename: string }>
): Promise<Array<{ success: boolean; imageId?: string; filename: string; error?: string; url?: string }>> {
  const results = await Promise.allSettled(
    images.map(({ file, filename }) => uploadImageToCloudflare(file, filename))
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled' && result.value.success) {
      return {
        success: true,
        imageId: result.value.result?.id,
        filename: images[index].filename,
        url: result.value.result?.url,
      };
    } else {
      return {
        success: false,
        filename: images[index].filename,
        error: result.status === 'rejected' ? result.reason?.message : 'Upload failed',
      };
    }
  });
}

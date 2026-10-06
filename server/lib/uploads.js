import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { UPLOADS_DIR } from './paths.js';

// Shared image uploader for meta/SEO images (jpg/png/webp/gif, 10MB)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = (path.extname(file.originalname || '').slice(0, 10) || '.jpg').toLowerCase();
    cb(null, `meta-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`);
  },
});

export const imageUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/^image\//.test(file.mimetype || '')) return cb(null, true);
    cb(new Error('Only image files are allowed.'));
  },
});

export async function deleteUploadImage(filePath) {
  if (!filePath) return;
  const abs = path.join(UPLOADS_DIR, path.basename(filePath)); // basename prevents traversal
  await fs.promises.unlink(abs).catch(() => {});
}

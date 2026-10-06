import crypto from 'crypto';

/**
 * Symmetric encryption for secrets stored in the database (e.g. SMTP passwords).
 * AES-256-GCM with a key derived (SHA-256) from ENCRYPTION_KEY — falling back
 * to JWT_SECRET so the project works with zero extra configuration.
 *
 * Stored format:  v1.<iv-b64>.<authTag-b64>.<ciphertext-b64>
 */

const RAW_KEY =
  process.env.ENCRYPTION_KEY || process.env.JWT_SECRET || 'dev-secret-change-me';
const KEY = crypto.createHash('sha256').update(RAW_KEY).digest(); // 32 bytes

export function encryptSecret(plain) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv);
  const enc = Buffer.concat([cipher.update(String(plain), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [
    'v1',
    iv.toString('base64'),
    tag.toString('base64'),
    enc.toString('base64'),
  ].join('.');
}

/** Returns the decrypted string, or null if the payload is missing/corrupt. */
export function decryptSecret(payload) {
  try {
    const [version, ivB64, tagB64, dataB64] = String(payload).split('.');
    if (version !== 'v1') return null;
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      KEY,
      Buffer.from(ivB64, 'base64')
    );
    decipher.setAuthTag(Buffer.from(tagB64, 'base64'));
    return Buffer.concat([
      decipher.update(Buffer.from(dataB64, 'base64')),
      decipher.final(),
    ]).toString('utf8');
  } catch {
    return null;
  }
}

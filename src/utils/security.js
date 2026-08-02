// Input Sanitization and Anti-Hacking Security Utilities

/**
 * Sanitizes user string input to prevent XSS (Cross-Site Scripting) and script injection attacks.
 */
export function sanitizeInput(str = '') {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/[<>'"]/g, '')    // Remove dangerous quotes and brackets
    .trim();
}

/**
 * Validates 10-digit Indian phone number strictly.
 */
export function validatePhone(phone = '') {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length === 10;
}

// In-memory timestamp tracker to prevent spam bot submissions (Rate Limiting)
let lastSubmissionTimestamp = 0;

export function checkRateLimit(cooldownMs = 4000) {
  const now = Date.now();
  if (now - lastSubmissionTimestamp < cooldownMs) {
    return false; // Rate limit exceeded (Spam attempt)
  }
  lastSubmissionTimestamp = now;
  return true; // Allowed
}

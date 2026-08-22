export const NUSASEC_PLATFORM = {
  coreApiUrl: (import.meta.env.VITE_NUSASEC_CORE_API_URL || 'https://api.nusasec.com').replace(/\/$/, ''),
  aiApiUrl: (import.meta.env.VITE_NUSASEC_AI_API_URL || 'https://ai.nusasec.com').replace(/\/$/, ''),
  customerAppUrl: (import.meta.env.VITE_NUSASEC_CUSTOMER_APP_URL || 'https://app.nusasec.com').replace(/\/$/, ''),
  internalAppUrl: (import.meta.env.VITE_NUSASEC_INTERNAL_APP_URL || 'https://internal.nusasec.com').replace(/\/$/, ''),
  publicWebsiteUrl: (import.meta.env.VITE_NUSASEC_PUBLIC_WEBSITE_URL || 'https://nusasec.com').replace(/\/$/, ''),
};

export const GOOGLE_LOGIN_URL = `${NUSASEC_PLATFORM.coreApiUrl}/api/v1/auth/mfa/google/start`;

export function redirectToPlane(userType?: string) {
  const target = String(userType || '').toUpperCase() === 'INTERNAL'
    ? NUSASEC_PLATFORM.internalAppUrl
    : NUSASEC_PLATFORM.customerAppUrl;
  window.location.assign(target);
}

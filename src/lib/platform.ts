const coreUrl = import.meta.env.VITE_NUSASEC_CORE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000' : '');
const aiUrl = import.meta.env.VITE_NUSASEC_AI_API_URL || (import.meta.env.DEV ? 'http://localhost:8001' : '');
const customerUrl = import.meta.env.VITE_NUSASEC_CUSTOMER_APP_URL || (import.meta.env.DEV ? 'http://localhost:5173' : '');
const internalUrl = import.meta.env.VITE_NUSASEC_INTERNAL_APP_URL || (import.meta.env.DEV ? 'http://localhost:5174' : '');
const publicUrl = import.meta.env.VITE_NUSASEC_PUBLIC_WEBSITE_URL || (import.meta.env.DEV ? 'http://localhost:3000' : '');

for (const [name, value] of [
  ['VITE_NUSASEC_CORE_API_URL', coreUrl],
  ['VITE_NUSASEC_AI_API_URL', aiUrl],
  ['VITE_NUSASEC_CUSTOMER_APP_URL', customerUrl],
  ['VITE_NUSASEC_INTERNAL_APP_URL', internalUrl],
  ['VITE_NUSASEC_PUBLIC_WEBSITE_URL', publicUrl],
] as const) {
  if (!value) throw new Error(`${name} must be explicitly configured for production/preview builds`);
}

export const NUSASEC_PLATFORM = {
  coreApiUrl: coreUrl.replace(/\/$/, ''),
  aiApiUrl: aiUrl.replace(/\/$/, ''),
  customerAppUrl: customerUrl.replace(/\/$/, ''),
  internalAppUrl: internalUrl.replace(/\/$/, ''),
  publicWebsiteUrl: publicUrl.replace(/\/$/, ''),
};

export const GOOGLE_LOGIN_URL = `${NUSASEC_PLATFORM.coreApiUrl}/api/v1/auth/mfa/google/start`;

export function redirectToPlane(userType?: string) {
  const target = String(userType || '').toUpperCase() === 'INTERNAL'
    ? NUSASEC_PLATFORM.internalAppUrl
    : NUSASEC_PLATFORM.customerAppUrl;
  window.location.assign(target);
}

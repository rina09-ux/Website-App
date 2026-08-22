import { NUSASEC_PLATFORM } from './platform';

const CORE_REQUEST_TIMEOUT_MS = 20000;

export interface CoreUser {
  email: string;
  display_name?: string;
  tenant_id: string;
  user_type?: string;
  role?: string;
  scopes?: string[];
  must_change_password?: boolean;
  mfa_enabled?: boolean;
}

export interface LoginResult {
  status: 'authenticated' | 'mfa_required';
  csrf_token?: string;
  challenge_id?: string;
  challenge_token?: string;
  bootstrap?: boolean;
  methods?: string[];
  expires_at?: string;
  mfa_verified?: boolean;
  user?: CoreUser;
}

export interface SignupPayload {
  email: string;
  password: string;
  display_name: string;
  organization_name: string;
  country_code: string;
  timezone: string;
}

export interface SignupResult {
  status: 'verification_required';
  organization?: { tenant_id: string; name: string; slug: string };
  dev_verification_token?: string;
}

function timeoutSignal(existing?: AbortSignal | null): AbortSignal {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), CORE_REQUEST_TIMEOUT_MS);
  if (existing) {
    if (existing.aborted) controller.abort();
    else existing.addEventListener('abort', () => controller.abort(), { once: true });
  }
  controller.signal.addEventListener('abort', () => window.clearTimeout(timeout), { once: true });
  return controller.signal;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${NUSASEC_PLATFORM.coreApiUrl}${path}`, {
      credentials: 'include',
      ...init,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...(init.headers || {}) },
      signal: timeoutSignal(init.signal),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = typeof body?.detail === 'string' ? body.detail : `NusaSec-Core request failed (${response.status})`;
      throw new Error(message);
    }
    return body as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('NusaSec-Core request timed out or was cancelled');
    }
    throw error;
  }
}

export function login(email: string, password: string): Promise<LoginResult> {
  return request<LoginResult>('/api/v1/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}
export function signup(payload: SignupPayload): Promise<SignupResult> {
  return request<SignupResult>('/api/v1/auth/signup', { method: 'POST', body: JSON.stringify(payload) });
}
export function verifyEmail(token: string): Promise<{ status: string; email: string; tenant_id: string }> {
  return request<{ status: string; email: string; tenant_id: string }>('/api/v1/auth/verify-email', { method: 'POST', body: JSON.stringify({ token }) });
}
export function verifyMfa(challengeId: string, challengeToken: string, code: string, method: 'totp' | 'recovery' = 'totp'): Promise<LoginResult> {
  return request<LoginResult>('/api/v1/auth/mfa/verify', { method: 'POST', body: JSON.stringify({ challenge_id: challengeId, challenge_token: challengeToken, method, code }) });
}
export function getPublicJson<T>(path: string): Promise<T> { return request<T>(`/api/v1/public${path}`); }

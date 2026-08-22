import { NUSASEC_PLATFORM } from './platform';

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
  organization?: {
    tenant_id: string;
    name: string;
    slug: string;
  };
  dev_verification_token?: string;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${NUSASEC_PLATFORM.coreApiUrl}${path}`, {
    credentials: 'include',
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = typeof body?.detail === 'string' ? body.detail : 'NusaSec-Core request failed';
    throw new Error(message);
  }
  return body as T;
}

async function requestTestData<T>(path: string): Promise<T> {
  const response = await fetch(`${NUSASEC_PLATFORM.testCoreApiUrl}${path}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = typeof body?.detail === 'string'
      ? body.detail
      : `NusaSec-Core TEST request failed (${response.status})`;
    throw new Error(message);
  }
  return body as T;
}

export function login(email: string, password: string): Promise<LoginResult> {
  return request<LoginResult>('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function signup(payload: SignupPayload): Promise<SignupResult> {
  return request<SignupResult>('/api/v1/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function verifyEmail(token: string): Promise<{ status: string; email: string; tenant_id: string }> {
  return request<{ status: string; email: string; tenant_id: string }>('/api/v1/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });
}

export function verifyMfa(
  challengeId: string,
  challengeToken: string,
  code: string,
  method: 'totp' | 'recovery' = 'totp',
): Promise<LoginResult> {
  return request<LoginResult>('/api/v1/auth/mfa/verify', {
    method: 'POST',
    body: JSON.stringify({
      challenge_id: challengeId,
      challenge_token: challengeToken,
      method,
      code,
    }),
  });
}

export function getPublicJson<T>(path: string): Promise<T> {
  return requestTestData<T>(`/api/v1/public${path}`);
}

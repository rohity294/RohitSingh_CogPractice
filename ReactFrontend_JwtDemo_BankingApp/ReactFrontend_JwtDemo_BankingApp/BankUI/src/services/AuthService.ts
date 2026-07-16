const API_BASE = '/api/v1';

export interface LoginResponse {
  token: string;
  username?: string;
  message?: string;
}

function parseJwt(token: string): any {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}

class AuthService {
  async login(username: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Login failed: ${res.status} ${text}`);
    }

    const data: LoginResponse = await res.json();

    if (data && data.token) {
      sessionStorage.setItem('auth_token', data.token);
      if (data.username) sessionStorage.setItem('auth_username', data.username);

      // try to extract roles from token payload
      const payload = parseJwt(data.token);
      if (payload && payload.roles) {
        try {
          sessionStorage.setItem('auth_roles', JSON.stringify(payload.roles));
        } catch (e) {
          // ignore
        }
      }
      // if backend didn't return username, try token subject
      if (!data.username && payload && payload.sub) {
        try {
          sessionStorage.setItem('auth_username', payload.sub);
        } catch (e) {
          // ignore
        }
      }
      // notify app that auth state changed
      try {
        window.dispatchEvent(new Event('authChange'));
        window.dispatchEvent(new CustomEvent('toast', { detail: 'Logged in successfully' }));
      } catch (e) {
        // ignore for SSR
      }
    }

    return data;
  }

  logout() {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_username');
    sessionStorage.removeItem('auth_roles');
    try {
      window.dispatchEvent(new Event('authChange'));
    } catch (e) {
      // ignore
    }
  }

  getToken() {
    return sessionStorage.getItem('auth_token');
  }

  getRoles(): string[] {
    const raw = sessionStorage.getItem('auth_roles');
    if (!raw) return [];
    try {
      return JSON.parse(raw) as string[];
    } catch (e) {
      return [];
    }
  }
}

export default new AuthService();

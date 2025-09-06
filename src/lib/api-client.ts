const BASE_URL = import.meta.env.DEV ? '/api' : 'https://gdghack-co9h.onrender.com';

// Get token from localStorage
const getAuthToken = (): string | null => {
  const session = localStorage.getItem('userSession');
  return session ? JSON.parse(session).token : null;
};

// Create a custom fetch with auth headers
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  // Handle 401 Unauthorized
  if (response.status === 401) {
    // Clear session and redirect to login
    localStorage.removeItem('userSession');
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }

  return response;
};

// API methods
export const api = {
  // Auth
  login: async (data: { email: string; password: string }) => {
    const response = await fetchWithAuth('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    
    if (result.success && result.data?.token) {
      // Store the token in the session
      const session = {
        user: result.data.user,
        token: result.data.token,
        userType: result.data.user.role || (result.data.user.student_id ? 'student' : 'educator'),
      };
      localStorage.setItem('userSession', JSON.stringify(session));
    }
    
    return result;
  },

  signup: async (data: {
    email: string;
    password: string;
    role: 'student' | 'educator';
    name: string;
    additionalData?: Record<string, any>;
  }) => {
    const response = await fetchWithAuth('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        role: data.role,
        name: data.name,
        ...data.additionalData,
      }),
    });
    
    const result = await response.json();
    
    if (result.success && result.data?.token) {
      // Store the token in the session
      const session = {
        user: result.data.user || result.data,
        token: result.data.token,
        userType: result.data.role || (result.data.student_id ? 'student' : 'educator'),
      };
      localStorage.setItem('userSession', JSON.stringify(session));
    }
    
    return result;
  },

  // Generic fetch method that includes auth token
  fetch: async <T = any>(
    url: string,
    options: RequestInit = {}
  ): Promise<{ success: boolean; data?: T; message?: string }> => {
    const response = await fetchWithAuth(url, options);
    return response.json();
  },

  // Logout
  logout: () => {
    localStorage.removeItem('userSession');
  },
};

export default api;

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

    // Handle old format (without success field)
    if (!result.success && result.message === 'Login successful') {
      const { user, session } = result;
      const userType = user?.user_metadata?.role || 'student';
      const sessionData = {
        user: {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.email,
          photo: user.user_metadata?.photo || ''
        },
        token: session?.access_token || '',
        userType
      };
      localStorage.setItem('userSession', JSON.stringify(sessionData));
      return result;
    }

    // Handle new format
    if (result.success && result.data) {
      const { user, session, userType } = result.data;
      const sessionData = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          photo: user.photo || ''
        },
        token: session?.access_token || '',
        userType
      };
      localStorage.setItem('userSession', JSON.stringify(sessionData));
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

  createStudent: async (data: {
    email: string;
    password: string;
    student_name: string;
    student_photo_key?: string;
  }) => {
    const response = await fetchWithAuth('/api/students/createStudent', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  createEducator: async (data: {
    email: string;
    password: string;
    educator_name: string;
    bio: string;
    subjects: string[];
    educator_photo_key?: string;
  }) => {
    const response = await fetchWithAuth('/api/educators/createEducator', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  createCourse: async (data: {
    educator_id: string;
    title: string;
    description: string;
    price: number;
    course_cover_image_key?: string;
    is_published: boolean;
  }) => {
    const response = await fetchWithAuth('/api/courses/createCourse', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getCourses: async (params?: {
    educator_id?: string;
    is_published?: boolean;
  }) => {
    const queryParams = new URLSearchParams();

    if (params?.educator_id) {
      queryParams.append('educator_id', params.educator_id);
    }

    if (params?.is_published !== undefined) {
      queryParams.append('is_published', params.is_published.toString());
    }

    const url = `/api/courses/getCourses${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

    const response = await fetchWithAuth(url, {
      method: 'GET',
    });
    return response.json();
  },

  updateCourse: async (id: string, data: any) => {
    const response = await fetchWithAuth(`/api/courses/updateCourse/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
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

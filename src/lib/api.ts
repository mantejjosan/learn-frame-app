// Use the full backend URL with /api prefix
const BASE_URL = 'https://gdghack-co9h.onrender.com/api';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

interface Educator {
  educator_id: string;
  educator_name: string;
  bio: string;
  subjects: string[];
  educator_photo_key: string;
  rating_sum: number;
  rating_count: number;
  follower_count: number;
}

interface Student {
  student_id: string;
  student_name: string;
  email: string;
  password: string;
  enrolled_courses: string[]; // Array of course IDs
  completed_courses: number;
  following_count: number;
  student_photo_key: string;
  created_at?: string;
  updated_at?: string;
}

interface Course {
  course_id: string;
  educator_id: string;
  title: string;
  description: string;
  price: number;
  course_cover_image_key: string;
  is_published: boolean;
  created_at: string;
  rating_sum: number;
  rating_count: number;
  star_rating: number;
  enrollment_count: number;
  follower_count: number;
}

// User session management
export const setUserSession = (user: any, userType: 'student' | 'educator') => {
  localStorage.setItem('userSession', JSON.stringify({ user, userType }));
};

export const getUserSession = () => {
  const session = localStorage.getItem('userSession');
  return session ? JSON.parse(session) : null;
};

export const clearUserSession = () => {
  localStorage.removeItem('userSession');
};

// Helper function to get auth token
const getAuthToken = (): string | null => {
  const session = localStorage.getItem('userSession');
  if (!session) return null;
  const { user } = JSON.parse(session);
  return user?.token || null;
};

// API functions
export const api = {
  // Educator APIs
  createEducator: async (data: {
    email: string;
    password: string;
    educator_name: string;
    bio: string;
    subjects: string[];
    educator_photo_key?: string;
  }): Promise<ApiResponse<Educator>> => {
    const response = await fetch(`${BASE_URL}/educators/createEducator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getEducators: async (): Promise<ApiResponse<Educator[]>> => {
    const response = await fetch(`${BASE_URL}/educators/getEducators`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  updateEducator: async (id: string, data: Partial<Educator>): Promise<ApiResponse<Educator>> => {
    const response = await fetch(`${BASE_URL}/educators/updateEducator/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Student APIs
  createStudent: async (data: {
    email: string;
    password: string;
    student_name: string;
    student_photo_key?: string;
  }): Promise<ApiResponse<Student>> => {
    const response = await fetch(`${BASE_URL}/students/createStudent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getStudents: async (): Promise<ApiResponse<Student[]>> => {
    // Get students from localStorage or return empty array
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    console.log('Retrieved students from localStorage:', students);
    return { 
      success: true, 
      data: students 
    };
  },
  
  getStudentById: async (studentId: string): Promise<ApiResponse<Student>> => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const student = students.find((s: Student) => s.student_id === studentId);
    
    if (!student) {
      return { 
        success: false, 
        message: 'Student not found' 
      };
    }
    
    return { 
      success: true, 
      data: student 
    };
  },
  
  updateStudent: async (studentId: string, data: Partial<Student>): Promise<ApiResponse<Student>> => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const studentIndex = students.findIndex((s: Student) => s.student_id === studentId);
    
    if (studentIndex === -1) {
      return { 
        success: false, 
        message: 'Student not found' 
      };
    }
    
    // Update student data
    const updatedStudent = { 
      ...students[studentIndex], 
      ...data,
      updated_at: new Date().toISOString()
    };
    
    students[studentIndex] = updatedStudent;
    localStorage.setItem('students', JSON.stringify(students));
    
    return { 
      success: true, 
      data: updatedStudent 
    };
  },

  // Course APIs
  createCourse: async (data: {
    educator_id: string;
    title: string;
    description: string;
    price: number;
    course_cover_image_key?: string;
    is_published: boolean;
    course_id?: string;
  }): Promise<ApiResponse<Course>> => {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/courses/createCourse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getCourses: async (params?: {
    educator_id?: string;
    is_published?: boolean;
  }): Promise<ApiResponse<Course[]>> => {
    const token = getAuthToken();
    const queryParams = new URLSearchParams();

    if (params?.educator_id) {
      queryParams.append('educator_id', params.educator_id);
    }

    if (params?.is_published !== undefined) {
      queryParams.append('is_published', params.is_published.toString());
    }

    const url = `${BASE_URL}/courses/getCourses${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });
    return response.json();
  },

  updateCourse: async (id: string, data: Partial<Course>): Promise<ApiResponse<Course>> => {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/courses/updateCourse/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // User authentication APIs
  signup: async (data: {
    email: string;
    password: string;
    role: 'student' | 'educator';
    name: string;
    additionalData?: Record<string, any>;
  }): Promise<ApiResponse<any>> => {
    const response = await fetch(`${BASE_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  login: async (data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<any>> => {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    // If login is successful, store the session
    if (result.success && result.data) {
      const { user, session, userType } = result.data;
      setUserSession({
        id: user.id,
        email: user.email,
        name: user.name,
        photo: user.photo || ''
      }, userType);

      // Store the token if provided
      if (session?.access_token) {
        localStorage.setItem('authToken', session.access_token);
      }
    }

    return result;
  },
};

export type { Educator, Student, Course, ApiResponse };
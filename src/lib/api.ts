const BASE_URL = 'https://gdghack-co9h.onrender.com';

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
  enrolled_courses: number;
  completed_courses: number;
  following_count: number;
  student_photo_key: string;
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
    const response = await fetch(`${BASE_URL}/students/getStudents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  // Course APIs
  createCourse: async (data: {
    educator_id: string;
    title: string;
    description: string;
    price: number;
    course_cover_image_key?: string;
    is_published: boolean;
  }): Promise<ApiResponse<Course>> => {
    const response = await fetch(`${BASE_URL}/courses/createCourse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getCourses: async (params?: {
    educator_id?: string;
    is_published?: boolean;
  }): Promise<ApiResponse<Course[]>> => {
    const url = new URL(`${BASE_URL}/courses/getCourses`);
    if (params?.educator_id) url.searchParams.append('educator_id', params.educator_id);
    if (params?.is_published !== undefined) url.searchParams.append('is_published', params.is_published.toString());
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  updateCourse: async (id: string, data: Partial<Course>): Promise<ApiResponse<Course>> => {
    const response = await fetch(`${BASE_URL}/courses/updateCourse/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};

export type { Educator, Student, Course, ApiResponse };
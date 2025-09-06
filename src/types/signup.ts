export type QuestionType = 'text' | 'number' | 'select' | 'multiselect';

export interface Question {
  id: string;
  type: QuestionType;
  label: string;
  options?: string[];
  min?: number;
  max?: number;
  conditional?: {
    questionId: string;
    equals: string;
  };
  conditionalOptions?: Record<string, string[]>;
}

export interface Role {
  id: string;
  label: string;
  questions: Question[];
  summaryTemplate?: string;
}

export interface SignupFlow {
  welcomeMessage: string;
  roles: Role[];
}

export interface SignupFormData {
  [key: string]: string | string[] | number | undefined;
  role: string;
  name: string;
  email: string;
  password: string;
}

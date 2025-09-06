import { SignupFlow } from '@/types/signup';

export const signupFlow: SignupFlow = {
  welcomeMessage: "Welcome! Please select your role to continue.",
  roles: [
    {
      id: "educator",
      label: "Educator",
      questions: [
        {
          id: "qualification",
          type: "select",
          label: "What is your highest qualification?",
          options: ["Bachelor's", "Master's", "PhD", "Diploma", "Other"]
        },
        {
          id: "subjects",
          type: "multiselect",
          label: "Which subjects do you teach?",
          options: ["Math", "Science", "English", "History", "Computer Science", "Other"]
        },
        {
          id: "experience",
          type: "number",
          label: "How many years of teaching experience do you have?",
          min: 0,
          max: 50
        },
        {
          id: "certifications",
          type: "select",
          label: "Select your teaching certification (if any)",
          options: ["CTET", "NET", "B.Ed", "M.Ed", "Other", "None"]
        }
      ]
    },
    {
      id: "student",
      label: "Student",
      questions: [
        {
          id: "examType",
          type: "select",
          label: "Which exam are you preparing for?",
          options: ["JEE", "NEET", "CUET", "CAT", "UPSC", "None"]
        },
        {
          id: "goal",
          type: "text",
          label: "What is your target rank/score?"
        },
        {
          id: "timeline",
          type: "select",
          label: "When do you plan to achieve this goal?",
          options: ["6 months", "1 year", "2 years", "Other"]
        },
        {
          id: "gradeLevel",
          type: "select",
          label: "What is your current grade level?",
          options: ["High School", "Undergraduate", "Postgraduate", "Other"]
        },
        {
          id: "weakSubjects",
          type: "multiselect",
          label: "Which subjects do you feel you are weak in?",
          conditional: {
            questionId: "examType",
            equals: "JEE"
          },
          conditionalOptions: {
            "JEE": ["Math", "Physics", "Chemistry"],
            "NEET": ["Physics", "Chemistry", "Biology"],
            "CUET": ["English", "General Knowledge", "Reasoning", "Subject-Specific"],
            "CAT": ["Quantitative Aptitude", "Verbal Ability", "Data Interpretation", "Logical Reasoning"],
            "UPSC": ["History", "Geography", "Economics", "Polity", "Current Affairs"]
          }
        },
        {
          id: "schoolName",
          type: "text",
          label: "Enter your school/college name"
        }
      ],
      summaryTemplate: "I am {name}, studying in {schoolName}, my goal is to clear {examType} with at least {goal} by {timeline}."
    }
  ]
};
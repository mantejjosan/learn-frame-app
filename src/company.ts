interface CompanyInfo {
  name: string;
  fullName: string;
  logo: {
    light: string;
    dark: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
}

export const companyInfo: CompanyInfo = {
  name: 'LearnFrame',
  fullName: 'LearnFrame Education Platform',
  logo: {
    light: '/logo-light.svg',
    dark: '/logo-dark.svg',
  },
  contact: {
    email: 'contact@learnframe.com',
    phone: '+1 (555) 123-4567',
    address: '123 Education St, Learning City, 10101',
  },
  social: {
    twitter: 'https://twitter.com/learnframe',
    linkedin: 'https://linkedin.com/company/learnframe',
    facebook: 'https://facebook.com/learnframe',
    instagram: 'https://instagram.com/learnframe',
  },
};

export default companyInfo;

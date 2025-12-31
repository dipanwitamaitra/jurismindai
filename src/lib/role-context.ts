export type UserRole = 'lawyer' | 'citizen' | 'student';

export const ROLE_SYSTEM_PROMPTS: Record<UserRole, string> = {
  citizen: `You are a legal guidance assistant for Bangladeshi citizens.
Explain legal rights in simple language.
Avoid legal jargon.
Always explain:
1. What the legal right is
2. Which law it comes from
3. What the next step should be
4. What documents are required
Use clear, friendly language.
Always include a disclaimer: This is not a substitute for a licensed lawyer.`,

  lawyer: `You are a legal reasoning assistant for Bangladeshi lawyers.
Structure every response as:
Facts → Relevant Law → Case References → Legal Reasoning → Logical Gaps → Suggested Actions.
Use professional legal language.
Ensure reasoning transparency and consistency.
Generate export-ready summaries.
Reference specific sections of Bangladesh's legal codes including:
- The Constitution of Bangladesh
- The Penal Code, 1860
- The Code of Criminal Procedure, 1898
- The Code of Civil Procedure, 1908
- Various specialized Acts and Ordinances`,

  student: `You are a legal tutor for Bangladeshi law students.
Explain concepts step by step.
Use examples.
Highlight statutes and legal principles.
Provide exam-oriented explanations.
Encourage analytical thinking.
Reference key legal textbooks and landmark judgments from Bangladesh's Supreme Court.`,
};

export const ROLE_INFO: Record<UserRole, {
  title: string;
  description: string;
  color: string;
  icon: string;
  features: string[];
}> = {
  lawyer: {
    title: 'Legal Professional',
    description: 'Advanced legal reasoning with case law analysis and structured arguments',
    color: 'lawyer',
    icon: 'Scale',
    features: [
      'Structured legal reasoning blocks',
      'Statute and precedent references',
      'Case law analysis',
      'Exportable summaries',
    ],
  },
  citizen: {
    title: 'Citizen',
    description: 'Clear explanations of your legal rights and step-by-step guidance',
    color: 'citizen',
    icon: 'Users',
    features: [
      'Simple language explanations',
      'Rights and duties explained',
      'Required documents checklist',
      'Next steps guidance',
    ],
  },
  student: {
    title: 'Law Student',
    description: 'Educational content with exam-oriented explanations and concept breakdowns',
    color: 'student',
    icon: 'GraduationCap',
    features: [
      'Concept explanations',
      'Case study breakdowns',
      'Exam preparation tips',
      'Legal principle highlights',
    ],
  },
};

export const DEMO_USERS: Record<UserRole, { email: string; password: string }> = {
  lawyer: {
    email: 'lawyer@jurismind.app',
    password: '123admin',
  },
  citizen: {
    email: 'citizen@jurismind.app',
    password: '123admin',
  },
  student: {
    email: 'student@jurismind.app',
    password: '123admin',
  },
};

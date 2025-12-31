export type UserRole = 'lawyer' | 'citizen' | 'student';

export const ROLE_SYSTEM_PROMPTS: Record<UserRole, string> = {
  citizen: `You are a legal guidance assistant for Bangladeshi citizens.

Your role:
- Explain legal matters clearly and simply
- Focus only on what the user needs to know next

Response rules:
- Use plain language
- No legal jargon unless unavoidable
- Keep explanations short

Always cover:
1. The right or issue involved
2. The relevant law (brief mention)
3. The immediate next step
4. Required documents (if any)

End with a short disclaimer: "This is general guidance, not a substitute for a lawyer."`,

  lawyer: `You are a legal reasoning assistant for Bangladeshi lawyers.

Your role:
- Assist with structured legal analysis
- Improve clarity and logical consistency

Response structure (always):
1. Key Facts
2. Applicable Law
3. Legal Reasoning
4. Gaps or Risks
5. Suggested Next Actions

Tone: Professional, precise, efficient.
Do not over-explain basic legal concepts.`,

  student: `You are a legal tutor for Bangladeshi law students.

Your role:
- Help students understand legal concepts clearly
- Focus on learning and exam relevance

Response rules:
- Step-by-step but concise
- Use short examples only when helpful
- Highlight key legal principles or statutes

Avoid unnecessary academic discussion.`,
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

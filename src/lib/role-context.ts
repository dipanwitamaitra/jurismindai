export type UserRole = 'lawyer' | 'citizen' | 'student';

export const ROLE_SYSTEM_PROMPTS: Record<UserRole, string> = {
  citizen: `You are a legal guidance assistant for Bangladeshi citizens.

Your role:
- Help users understand legal matters simply and safely
- Focus on practical next steps

Response style:
- Plain language
- Short explanations
- No legal jargon unless necessary

Always include briefly:
1. The issue or right involved
2. Relevant law (one-line reference)
3. Immediate next step
4. Required documents (if applicable)

For sensitive or extreme statements:
- Calmly redirect
- Invite clarification
- Avoid legal threats or lectures

If a user makes a harm-related statement, respond: "I can't assist with harm-related matters. If this was meant as a hypothetical, historical, or you need emotional support, please clarify and I'll help constructively."

End with: "This is general information, not legal advice."`,

  lawyer: `You are a legal reasoning assistant for Bangladeshi lawyers.

Your role:
- Support structured legal analysis
- Improve clarity and logic

Response structure (keep concise):
1. Material Facts
2. Applicable Law
3. Legal Reasoning
4. Risks / Gaps
5. Suggested Action

Tone: Professional, precise, neutral.

For sensitive or extreme statements:
- Treat them analytically
- Reframe as hypothetical, historical, or factual discussion
- Avoid moral commentary

If a user describes harm, respond professionally: "I can provide legal analysis on consequences, defenses, or procedural matters. Please clarify the context—hypothetical, historical, or case study—and I'll assist accordingly."`,

  student: `You are a legal tutor for Bangladeshi law students.

Your role:
- Explain concepts clearly for learning and exams

Response style:
- Step-by-step but brief
- Focus on principles and statutes
- Use short examples only if helpful

For sensitive statements:
- Reframe into academic or historical context
- Guide discussion toward lawful analysis
- Avoid emotional or moral judgment

If a student mentions harm, respond: "I can help explore this as a legal concept, case study, or exam scenario. Please clarify the academic context and I'll explain the relevant law."`,
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

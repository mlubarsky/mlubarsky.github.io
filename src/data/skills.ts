export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    name: 'Languages',
    skills: ['Java', 'Python', 'JavaScript', 'C', 'Rust'],
  },
  {
    name: 'Machine Learning and AI',
    skills: ['TensorFlow', 'Pytorch', 'Scikit-learn', 'NumPy', 'pandas'],
  },
  {
    name: 'Databases',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL'],
  },
  {
    name: 'DevOps / Tools',
    skills: ['Git', 'Docker', 'Auth0', 'Railway', 'Jira', 'ServiceNow'],
  },
];

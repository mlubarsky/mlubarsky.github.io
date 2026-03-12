export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    name: 'Languages',
    skills: ['Java', 'Python', 'C', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    name: 'Machine Learning',
    skills: ['TensorFlow', 'Pytorch', 'Scikit-learn', 'Jupyter Notebook'],
  },
  {
    name: 'Databases',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL'],
  },
  {
    name: 'DevOps / Tools',
    skills: ['Docker', 'Git', 'GitHub', 'Jira', 'ServiceNow', 'Auth0', 'Railway'],
  },
];

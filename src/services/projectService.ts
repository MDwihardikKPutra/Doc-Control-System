import type { Project } from '../types';
import { slugify } from '../utils';

export const ProjectService = {
  /**
   * Checks if a project name would result in a duplicate slug.
   */
  isDuplicateSlug: (name: string, projects: Project[], editingId: string | null = null): boolean => {
    const slug = slugify(name);
    return projects.some(p => p.id !== editingId && slugify(p.name) === slug);
  },

  /**
   * Finds a project by its slugified name.
   */
  findProjectBySlug: (slug: string, projects: Project[]): Project | undefined => {
    return projects.find(p => slugify(p.name) === slug || p.id === slug);
  }
};

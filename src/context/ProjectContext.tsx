import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Project } from '../types';
import { mockProjects } from '../data';
import { ProjectService } from '../services/projectService';
import { generateId } from '../utils';

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (p: Project | null) => void;
  setCurrentProjectById: (id: string | null) => void;
  setCurrentProjectBySlug: (slug: string | null) => void;
  addProject: (data: Omit<Project, 'id'>) => boolean;
  updateProject: (id: string, data: Partial<Project>) => boolean;
  deleteProject: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const setCurrentProjectById = useCallback((id: string | null) => {
    if (!id) {
      setCurrentProject(null);
      return;
    }
    const proj = projects.find(p => p.id === id);
    if (proj) setCurrentProject(proj);
  }, [projects]);

  const setCurrentProjectBySlug = useCallback((slug: string | null) => {
    if (!slug) {
      setCurrentProject(null);
      return;
    }
    const proj = ProjectService.findProjectBySlug(slug, projects);
    if (proj) setCurrentProject(proj);
  }, [projects]);

  const addProject = useCallback((data: Omit<Project, 'id'>) => {
    if (ProjectService.isDuplicateSlug(data.name, projects)) {
      alert(`Project with name "${data.name}" already exists.`);
      return false;
    }
    const newProject = { ...data, id: generateId() };
    setProjects(prev => [newProject, ...prev]);
    return true;
  }, [projects]);

  const updateProject = useCallback((id: string, data: Partial<Project>) => {
    if (data.name && ProjectService.isDuplicateSlug(data.name, projects, id)) {
      alert(`Project with name "${data.name}" already exists.`);
      return false;
    }
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    return true;
  }, [projects]);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (currentProject?.id === id) setCurrentProject(null);
  }, [currentProject]);

  const value = {
    projects,
    currentProject,
    setCurrentProject,
    setCurrentProjectById,
    setCurrentProjectBySlug,
    addProject,
    updateProject,
    deleteProject
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) throw new Error('useProjects must be used within ProjectProvider');
  return context;
};

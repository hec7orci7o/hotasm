import React, {useState, useEffect, useContext} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {defaultConfig, defaultEditor} from '@/data/examples';

const ProjectsContext = React.createContext();

export function useProjects() {
  return useContext(ProjectsContext);
}

export function ProjectsProvider({children}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const _data = JSON.parse(localStorage.getItem('editor-data'));
    if (_data) setData(_data);
  }, []);

  useEffect(() => {
    localStorage.setItem('editor-data', JSON.stringify(data));
  }, [data]);

  const createProject = (config=defaultConfig, editor=defaultEditor) => {
    const newProject = {id: uuidv4(), config, editor, createdAt: new Date().toISOString()};
    setData([...data, newProject]);
    return newProject;
  };

  const deleteProjects = () => {
    setData([]);
  };

  const updateProject = (id, config, editor) => {
    const newData = data.map((project) => {
      if (project.id === id) {
        return {id, config, editor, createdAt: project.createdAt, updatedAt: new Date().toISOString()};
      }
      return project;
    });

    setData(newData);
  };

  const getProject = (id) => data.find((project) => project.id === id);

  return (
    <ProjectsContext.Provider value={{
      data,
      createProject,
      updateProject,
      deleteProjects,
      getProject,
    }}>
      {children}
    </ProjectsContext.Provider>
  );
}

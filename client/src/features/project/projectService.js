import { baseURL } from "../../utils/baseURL";
import axios from "axios";

const createProject = async (projectData, token) => {
    
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${baseURL}/projects/create-project`, projectData, config);
    return response.data;
}

const editProject = async (projectData, token) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    const { projectId } = projectData;

    const response = await axios.patch(`${baseURL}/projects/edit-project/${projectId}`, projectData, config);
    return response.data;
}


const getProjectsManager = async (token) => {
    
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${baseURL}/projects/projects-manager`, config);
    return response.data;
}


const getProjectsEmployee = async (token) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${baseURL}/projects/projects-employee`, config);
    return response.data;
} 

export const projectService = { createProject, editProject, getProjectsManager, getProjectsEmployee }
import { baseURL } from "../../utils/baseURL";
import axios from "axios";

const getManagerDashboard = async (projectId, token) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${baseURL}/statistics/manager-dashboard/${projectId}`, config);
    return response.data;
}

const getEmployeeDashboard = async (projectId, token) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${baseURL}/statistics/employee-dashboard/${projectId}`, config);
    return response.data;
}

const getExpenseContribution = async (expenseId) => {

    const response = await axios.get(`${baseURL}/statistics/expense-contribution/${expenseId}`);
    return response.data;
}

const getManagerAnalytics = async (projectId, token) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${baseURL}/statistics/manager-analytics/${projectId}`, config);
    return response.data;
}

const getEmployeeAnalytics = async (projectId, token) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${baseURL}/statistics/employee-analytics/${projectId}`, config);
    return response.data;

}

export const statisticService = { getManagerDashboard, getEmployeeDashboard, getExpenseContribution, getManagerAnalytics, getEmployeeAnalytics }
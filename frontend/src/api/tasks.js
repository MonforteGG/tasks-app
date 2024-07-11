import axios from 'axios';

const URL = 'http://localhost:8000';
const endpoint = `${URL}/api/tasks`;

// Función para obtener el token JWT
const getToken = () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error('No token found');
    }
    return token;
};

// Configuración de Axios con el encabezado de autorización
const axiosInstance = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
    }
});

export default axiosInstance;

// Funciones de solicitud reutilizando axiosInstance
export const fetchTasks = async () => {
    try {
        const response = await axiosInstance.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const fetchTask = async (id) => {
    try {
        const response = await axiosInstance.get(`${endpoint}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching task with id ${id}:`, error);
        throw error;
    }
};

export const createTask = async (newTask) => {
    try {
        const response = await axiosInstance.post(endpoint, newTask);
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

export const updateTask = async (id, updatedTask) => {
    try {
        const response = await axiosInstance.put(`${endpoint}/${id}`, updatedTask);
        return response.data;
    } catch (error) {
        console.error(`Error updating task with id ${id}:`, error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await axiosInstance.delete(`${endpoint}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting task with id ${id}:`, error);
        throw error;
    }
};

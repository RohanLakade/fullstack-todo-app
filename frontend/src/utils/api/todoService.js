import { apiRequest } from "./apiService";
import { API_ENDPOINTS } from "./constants";

export const fetchTasks = async () => {
  return apiRequest(API_ENDPOINTS.GET_TASKS, {
    method: "GET",
    credentials: "include",
  });
};

export const fetchTaskById = async (id) => {
  return apiRequest(`${API_ENDPOINTS.GET_TASKS}/${id}`, {
    method: "GET",
    credentials: "include",
  });
};

export const addTask = async (data) => {
  return apiRequest(API_ENDPOINTS.ADD_TASK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
};

export const toggleTaskStatus = async (id, data) => {
  return apiRequest(`${API_ENDPOINTS.TOGGLE_TASK_STATUS}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
};

export const updateTask = async (id, data) => {
  return apiRequest(`${API_ENDPOINTS.UPDATE_TASK}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
};

export const deleteTask = async (id) => {
  return apiRequest(`${API_ENDPOINTS.DELETE_TASK}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};

export const deleteAllTasks = async () => {
  return apiRequest(API_ENDPOINTS.DELETE_ALL_TASKS, {
    method: "DELETE",
    credentials: "include",
  });
};

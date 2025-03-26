import { API_ENDPOINTS } from "./constants";

// Register User
export const registerUser = async (userData) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}${API_ENDPOINTS.REGISTER}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

// Login User
export const loginUser = async (userData) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}${API_ENDPOINTS.LOGIN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

export const logoutUser = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}${API_ENDPOINTS.LOGOUT}`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

import { API_ENDPOINTS } from "@utils/api/constants";
import { getFromLocalStorage, setToLocalStorage } from "@utils/helpers/helpers";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Function to refresh access token
const refreshAccessToken = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.REFRESH_TOKEN}`,
      {
        method: "POST",
        credentials: "include", // Sends cookies with the request
      }
    );

    if (!response.ok)
      throw new Error(result.message || "Failed to refresh token");

    const result = await response.json();

    setToLocalStorage("accessToken", result.accessToken);
    return result.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    return null;
  }
};

// Primary Function to handle all API request handler
export const apiRequest = async (url, options = {}) => {
  let accessToken = getFromLocalStorage("accessToken");

  // If no token, attempt to refresh
  if (!accessToken) {
    accessToken = await refreshAccessToken();
    if (!accessToken) {
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
      return;
    }
  }

  // Make the Actual API request with User's Access token
  let response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // If token expired, refresh and retry
  if (response.status === 403) {
    accessToken = await refreshAccessToken();
    if (!accessToken) {
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
      return;
    }

    response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

import { getFromLocalStorage, setToLocalStorage } from "@utils/helpers/helpers";

export const refreshAccessToken = async () => {
  try {
    // get a new accessToken using Refresh Token
    const response = await fetch("http://localhost:8800/api/auth/refresh", {
      method: "POST",
      credentials: "include", // Sends cookies with the request
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to refresh token");
    }

    setToLocalStorage("accessToken", result.accessToken);

    return result.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    return null;
  }
};

export const handleRequest = async (url, options = {}) => {
  let accessToken = getFromLocalStorage("accessToken");

  // if token was manually removed or  browser storage was cleared
  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }

  // Actual request
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 403) {
    accessToken = await refreshAccessToken();

    if (!accessToken) {
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
      return;
    }

    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return response;
};

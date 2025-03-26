export const getFromLocalStorage = (key) => {
  return key === "user"
    ? JSON.parse(localStorage.getItem(key))
    : localStorage.getItem(key);
};

export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, key === "user" ? JSON.stringify(value) : value);
};

export const clearFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const sortOptionsArr = [
  { value: "", label: "\u21C5 sort by" }, // Unicode escape sequences ↑ (U+21C5)
  { value: "priority-asc", label: "\u2191 priority" }, // Unicode escape sequences ↑ (U+2191)
  { value: "priority-desc", label: "\u2193 priority" }, // Unicode escape sequences ↓ (U+2193)
];
export const statusOptionsArr = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];
export const priorityOptionsArr = [
  { value: "all", label: "All" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

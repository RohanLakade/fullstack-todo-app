export const validationRules = {
  fullName: {
    required: "Full Name is required",
    minLength: {
      value: 3,
      message: "Full Name must be at least 3 characters",
    },
    maxLength: {
      value: 50,
      message: "Full Name cannot exceed 50 characters",
    },
  },
  email: {
    required: "Email is required",
    maxLength: {
      value: 30,
      message: "Email cannot exceed 30 characters",
    },
    pattern: {
      value: /^[a-zA-Z0-9.]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
      message: "Please enter a valid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      message: "Password must contain at least one letter and one number",
    },
  },
  confirmPassword: {
    required: "Confirm Password is required",
  },
};

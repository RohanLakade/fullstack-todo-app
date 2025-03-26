// React & Third-Party Libraries Imports
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// Project Utilities & API Helpers Imports
import { validationRules } from "@utils/validations/validations";
import { useAuth } from "@context/AuthContext";
import { registerUser, loginUser } from "@utils/api/authService";
import { setToLocalStorage } from "@utils/helpers/helpers";

// Components Imports
import RenderInput from "@components/utils/render-input/RenderInput";
import RenderButton from "@components/utils/render_button/RenderButton";
import RenderTooltipButton from "@components/utils/render-tooltip/RenderTooltipButton";

// Component Styles Imports
import "./LoginAndRegister.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginAndRegister = ({ id, title, page = "register" }) => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  }, [errorMessage]);

  const onSubmit = async (data) => {
    try {
      if (page === "register") {
        await registerUser(data); // handle user register for new users
        navigate("/login"); // Redirect to login page
      } else {
        const result = await loginUser(data); // handle user login for registered users

        setToLocalStorage("accessToken", result.accessToken); // Save token to localStorage
        setToLocalStorage("user", result.user); // Save user data to localStorage
        setUser(result.user);
        navigate("/dashboard"); // Redirect to dashboard page
      }
      reset();
    } catch (error) {
      setErrorMessage(error.message);
      console.error(error.message);
    }
  };

  return (
    <div id={id}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && <div className={"error-msg"}>{errorMessage}</div>}
        <h1 className="title">{title}</h1>
        {page === "register" && (
          <div>
            <RenderInput
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              {...register("fullName", validationRules.fullName)}
            />
            {errors.fullName ? (
              <div className={"error-msg"}>{errors?.fullName?.message}</div>
            ) : (
              <div className={"error-msg"}>&nbsp;</div>
            )}
          </div>
        )}
        <div>
          <RenderInput
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            {...register("email", validationRules.email)}
          />
          {errors.email ? (
            <div className={"error-msg"}>{errors?.email?.message}</div>
          ) : (
            <div className={"error-msg"}>&nbsp;</div>
          )}
        </div>

        <div>
          <div className="password-input">
            <RenderInput
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              {...register("password", validationRules.password)}
            />
            <RenderTooltipButton
              className={"toggle-btn"}
              onClick={() => setShowPassword(!showPassword)}
              showIcon={true}
              icon={showPassword ? FaEyeSlash : FaEye}
              toolTipText={showPassword ? "hide" : "show"}
            />
          </div>
          {errors.password ? (
            <div className={"error-msg"}>{errors?.password?.message}</div>
          ) : (
            <div className={"error-msg"}>&nbsp;</div>
          )}
        </div>
        {page === "register" && (
          <div>
            <div className="confirm-password-input">
              <RenderInput
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  ...validationRules.confirmPassword,
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              <RenderTooltipButton
                className={"toggle-btn"}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                showIcon={true}
                icon={showConfirmPassword ? FaEyeSlash : FaEye}
                toolTipText={showConfirmPassword ? "hide" : "show"}
              />
            </div>
            {errors.confirmPassword ? (
              <div className={"error-msg"}>
                {errors?.confirmPassword?.message}
              </div>
            ) : (
              <div className={"error-msg"}>&nbsp;</div>
            )}
          </div>
        )}
        <div>
          <RenderButton type="submit" className="brand-color" text="Submit" />
        </div>
        {page === "register" ? (
          <p>
            Already have an account?
            <span className="link">
              <Link to={"/login"}>Login</Link>
            </span>
          </p>
        ) : (
          <p>
            Don't have an account,
            <Link to={"/register"}>
              <span className="link">Register Now</span>
            </Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginAndRegister;

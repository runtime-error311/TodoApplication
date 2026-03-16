import AuthForm from "../components/AuthForm";
import { passwordValidation } from "../utils/validation.js";
import useAuth from "../hooks/useAuth";

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    loading,
    touched,
    setTouched,
  } = useAuth();
  const errors = {
    password: passwordValidation(touched, password)
      ? "Password must be at least 8 characters"
      : "",
  };
  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      onFocus: () => setTouched((prev) => ({ ...prev, password: false })),
      onBlur: () => setTouched((prev) => ({ ...prev, password: true })),
    },
  ];

  return (
    <AuthForm
      title="Login"
      fields={fields}
      errors={errors}
      onSubmit={handleLogin}
      loading={loading}
      buttonText="Login"
      footerText="New User? "
      footerLinkText="Sign Up Now!"
      footerLink="/signup"
    />
  );
}

export default Login;

import AuthForm from "../components/AuthForm";
import useAuth from "../hooks/useAuth";
import { nameValidation, passwordValidation } from "../utils/validation.js";

function Signup() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    touched,
    setTouched,
    handleSignUp,
    loading,
  } = useAuth();

  const errors = {
    name: nameValidation(touched, name)
      ? "Username must be in range of 3 to 100"
      : "",
    password: passwordValidation(touched, password)
      ? "Password must be at least 8 characters"
      : "",
  };

  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      value: name,
      onChange: (e) => setName(e.target.value),
      onFocus: () => setTouched((prev) => ({ ...prev, name: false })),
      onBlur: () => setTouched((prev) => ({ ...prev, name: true })),
    },
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
      title="Sign Up"
      fields={fields}
      errors={errors}
      onSubmit={handleSignUp}
      loading={loading}
      buttonText="Sign Up"
      footerText="Already Registered? "
      footerLinkText="Login Now!"
      footerLink="/login"
    />
  );
}

export default Signup;

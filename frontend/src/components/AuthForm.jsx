import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { authInputStyle } from "../constants/constant";
import { Fragment } from "react";

function AuthForm({
  title,
  fields,
  errors,
  onSubmit,
  loading,
  buttonText,
  footerText,
  footerLinkText,
  footerLink,
}) {
  return (
    <div className="min-h-screen w-full bg-linear-to-r from-purple-100 to-pink-100 flex justify-center items-center">
      <div className="bg-white w-full max-w-md rounded-xl">
        <form className="flex flex-col" onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold text-black my-2 mx-5">{title}</h1>
          {fields.map((field) => (
            <Fragment key={field.name}>
              <input
                className={authInputStyle}
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={field.onChange}
                onFocus={field.onFocus}
                onBlur={field.onBlur}
              />

              {errors[field.name] && (
                <p className="text-red-500 mx-5 text-sm">
                  {errors[field.name]}
                </p>
              )}
            </Fragment>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="font-bold my-2 mx-5 rounded-lg bg-red-400 hover:bg-red-600 p-1 cursor-pointer text-white disabled:opacity-50"
          >
            {loading ? <ClipLoader size={20} color="white" /> : buttonText}
          </button>
          <p className="font-semibold mx-auto my-2">
            {footerText}
            <Link className="text-blue-500 hover:text-blue-300" to={footerLink}>
              {footerLinkText}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;

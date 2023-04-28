import classNames from "classnames";

const COLOR_CONFIG_MAP = {
  primary:
    "w-full inline-flex justify-center rounded-sm border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 sm:w-auto sm:text-sm",
  success:
    "w-full inline-flex justify-center rounded-sm border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 sm:w-auto sm:text-sm",
  secondary:
    "w-full inline-flex justify-center rounded-sm border border-gray-300 shadow-sm px-4 py-2 bg-gray-50 text-black font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800 sm:mt-0 sm:w-auto sm:text-sm",
  danger:
    "w-full inline-flex justify-center rounded-sm border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 sm:w-auto sm:text-sm",
};

const Button = ({
  children,
  type = "button",
  onClick = () => { },
  color = "primary",
  className = "",
  classNameOverride = "",
  form,
  disabled = false,
}) => {
  const getClassname = () => {
    return classNameOverride
      ? classNameOverride
      : classNames(COLOR_CONFIG_MAP[color], className);
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={getClassname()}
      form={form}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

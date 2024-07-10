const Button = ({ children, onclickfn, styles, ...otherProps }) => {
  return (
    <button
      {...otherProps}
      onClick={onclickfn}
      className={`bg-blue-500 text-white shadow-md p-3 rounded-md ${styles} hover:bg-blue-700`}
    >
      {children}
    </button>
  );
};

export default Button;

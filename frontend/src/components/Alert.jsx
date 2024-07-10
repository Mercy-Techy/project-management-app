const Alert = ({ children, closeModal }) => {
  return (
    <div className="bg-red-400 mx-2 text-white shadow-md w-80 h-20 rounded-sm font-bold mb-10 fixed right-0 flex flex-col justify-center items-center">
      <span
        className="absolute left-0 top-0 ml-2 cursor-pointer"
        onClick={closeModal}
      >
        X
      </span>
      <div>{children}</div>
    </div>
  );
};

export default Alert;

import { useState, useEffect } from "react";

const Input = ({ styles, label, invalidData, value, ...otherProps }) => {
  const inputvalue = value || "";
  const [inputedValue, setInputedValue] = useState(inputvalue);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    if (invalidData === otherProps.name) setInvalid(true);
  }, [invalidData]);

  const onchangeHandler = (event) => {
    setInvalid(false);
    setInputedValue(event.target.value);
  };
  const onBlurHandler = () => {
    if (!inputedValue.trim()) {
      setInvalid(true);
    }
    return;
  };

  return (
    <div className="pt-5">
      <label htmlFor={otherProps.name} className="block my-2">
        {label}
      </label>
      <input
        {...otherProps}
        value={inputedValue}
        onChange={onchangeHandler}
        onBlur={onBlurHandler}
        className={`outline-none shadow-sm w-96 p-2 ${
          invalid && "border border-red-400"
        } ${styles}`}
      />
    </div>
  );
};

export default Input;

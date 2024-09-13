import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

// Styled Password input field.
const PasswordInput = ({
  value,
  placeholder,
  onChange,
}: {
  value?: string | undefined;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  // State to convert field to text or password field
  const [display, setDisplay] = useState(false);
  return (
    // Relative div
    <div className="relative w-full">
      {/* Input field - can be text or password field depending on state */}
      <input
        type={display ? 'text' : 'password'}
        className="bg-transparent border-b-2 placeholder:text-greyText w-full py-2 min-h-8 mt-3 focus:outline-none"
        // Value of input box
        value={value}
        // Placeholder text to be displayed
        placeholder={placeholder}
        // Function to run when user enters password
        onChange={onChange}
      />
      {/* Absolutely positioned icon - acts as buttons to change field type */}
      {display ? (
        <FaEye
          className="absolute top-6 right-2 cursor-pointer"
          onClick={() => setDisplay((prev) => !prev)}
        />
      ) : (
        <FaEyeSlash
          className="absolute top-6 right-2 cursor-pointer"
          onClick={() => setDisplay((prev) => !prev)}
        />
      )}
    </div>
  );
};

export default PasswordInput;

// Styled Text input
const Input = ({
  value,
  placeholder,
  onChange,
  className = '',
}: {
  value?: string | undefined;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) => {
  return (
    <input
      type="text"
      className={`bg-transparent border-b-2 placeholder:text-greyText w-full py-2 min-h-8 mt-3 focus:outline-none ${className}`}
      // Value for the input field
      value={value}
      // Placeholder text to be displayed
      placeholder={placeholder}
      // Function to run when user has typed something
      onChange={onChange}
    />
  );
};

export default Input;

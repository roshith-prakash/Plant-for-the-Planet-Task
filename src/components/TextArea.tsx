// Styled Text Area Component
const TextArea = ({
  value,
  placeholder,
  onChange,
  className = '',
}: {
  value?: string | undefined;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}) => {
  return (
    <textarea
      className={`bg-transparent border-b-2 resize-none placeholder:text-greyText w-full py-2 min-h-8 mt-3 focus:outline-none ${className}`}
      // Value of the text area component
      value={value}
      // Placeholder text to be displayed
      placeholder={placeholder}
      // Function to run when user types something
      onChange={onChange}
    />
  );
};

export default TextArea;

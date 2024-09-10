// Styled Text input
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
      className={`border-b-2 resize-none placeholder:text-greyText w-full py-2 min-h-8 mt-3 focus:outline-none ${className}`}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default TextArea;

// Styled Button
const CTAButton = ({
  text,
  disabled,
  disabledText,
  className,
  onClick,
}: {
  text: string;
  disabled?: boolean;
  disabledText?: string;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <button
      // Function to run when button is clicked
      onClick={onClick}
      // State to disable button
      disabled={disabled}
      // Custom styling for button
      className={`bg-gradient-to-r text-white font-medium from-cta to-hovercta rounded-lg py-2 px-4 hover:scale-105 hover:shadow transition-all ${className}`}
    >
      {/* If button is disabled, show disabledText, else show text */}
      {disabled ? disabledText : text}
    </button>
  );
};

export default CTAButton;

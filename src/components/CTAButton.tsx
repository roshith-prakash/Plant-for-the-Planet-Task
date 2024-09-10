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
      onClick={onClick}
      disabled={disabled}
      className={`bg-gradient-to-r text-white font-medium from-cta to-hovercta rounded-lg py-2 px-4 hover:scale-105 hover:shadow transition-all ${className}`}
    >
      {disabled ? disabledText : text}
    </button>
  );
};

export default CTAButton;

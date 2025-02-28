interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ variant, children, onClick, className }) => {
  const baseStyles = `px-4 py-2 font-semibold rounded-[40px] transition-colors ${className || ''}`;
  const variantStyles = {
    primary:
      'bg-midnight h-[66px] text-xl text-white hover:opacity-90 shadow-[0px_8px_32px_0px_rgba(123,137,158,0.2),0px_4px_8px_0px_rgba(123,137,158,0.2),0px_1px_4px_0px_rgba(123,137,158,0.2)]',
    secondary:
      'bg-white border h-[56px] border-light-gray hover:opacity-80 text-light-gray shadow-[0px_10px_20px_0px_rgba(123,137,158,0.1)]',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant || 'primary']}`} onClick={onClick}>
      {children}
    </button>
  );
};

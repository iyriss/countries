type InputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
};

export function Input({ label, type, placeholder, className, icon, onIconClick }: InputProps) {
  return (
    <div className='relative'>
      <input
        className={`h-[70px] w-full rounded-[20px] border border-light-gray px-6 pb-3 pt-8 text-navy-blue outline-midnight placeholder-shown:pb-6 placeholder-shown:pt-6 ${
          icon ? 'pr-12' : 'pr-6'
        } peer placeholder:text-[#b1b3bd] ${className}`}
        type={type || 'text'}
        placeholder={placeholder}
      />
      {label && (
        <label className='absolute left-6 top-1/2 -translate-y-1/2 text-[#b1b3bd] opacity-0 transition-all peer-focus:-translate-y-9 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-9 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:opacity-100'>
          {label}
        </label>
      )}
      {icon && (
        <div
          className='absolute right-4 top-1 translate-y-full cursor-pointer transition-all hover:opacity-80'
          onClick={onIconClick}
        >
          {icon}
        </div>
      )}
    </div>
  );
}

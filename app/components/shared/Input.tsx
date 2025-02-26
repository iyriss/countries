type InputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
};

export default function Input({ label, type, placeholder, className }: InputProps) {
  return (
    <div className='relative'>
      <input
        className={`peer h-[70px] w-full rounded-[20px] border border-light-gray px-6 pb-3 pr-6 pt-8 text-navy-blue outline-midnight placeholder:text-[#b1b3bd] placeholder-shown:pb-6 placeholder-shown:pt-6 ${className}`}
        type={type || 'text'}
        placeholder={placeholder}
      />
      {label && (
        <label className='absolute left-6 top-1/2 -translate-y-1/2 text-[#b1b3bd] opacity-0 transition-all peer-focus:-translate-y-9 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-9 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:opacity-100'>
          {label}
        </label>
      )}
    </div>
  );
}

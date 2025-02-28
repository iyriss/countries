import React, { useState } from 'react';

type InputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  icon?: React.ReactNode;
  error?: string;
  onIconClick?: () => void;
};

export function Input({
  label,
  name,
  type,
  placeholder,
  className,
  icon,
  error,
  onIconClick,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  return (
    <div className='relative'>
      <input
        className={`h-[70px] w-full rounded-[20px] border ${error ? 'border-red-500' : 'border-light-gray'} text-navy-blue outline-midnight ${
          isFocused && hasContent ? 'px-6 pb-3 pt-8' : 'p-6'
        } ${icon ? 'pr-12' : ''} placeholder:text-[#b1b3bd] ${className}`}
        type={type || 'text'}
        name={name}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-errormessage={error ? 'email-error' : undefined}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setHasContent(e.target.value.length > 0)}
      />
      {label && (
        <label
          className={`absolute left-6 top-1/2 -translate-y-1/2 text-[#b1b3bd] transition-all ${isFocused && hasContent ? '-translate-y-9 text-xs opacity-100' : 'opacity-0'}`}
        >
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
      {error && (
        <div className='absolute bottom-3 left-0 translate-y-0 transform px-6 font-assistant text-sm text-red-500 opacity-100 transition-all duration-200 ease-in-out'>
          {error}
        </div>
      )}
    </div>
  );
}

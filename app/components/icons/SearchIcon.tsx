type SearchIconProps = {
  className?: string;
};

export const SearchIcon = ({ className }: SearchIconProps) => {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className || ''}
    >
      <circle
        cx='6'
        cy='6'
        r='5'
        stroke={'currentColor'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.66675 9.66667L13.0001 13'
        stroke={'currentColor'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

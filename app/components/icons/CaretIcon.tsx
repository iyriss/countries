type CaretIconProps = {
  className?: string;
};

export const CaretIcon = ({ className }: CaretIconProps) => (
  <svg
    width='12'
    height='8'
    viewBox='0 0 12 8'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className || ''}
  >
    <path
      d='M1 1.5L6 6.5L11 1.5'
      stroke={'currentColor'}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

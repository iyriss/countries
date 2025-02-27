type CheckMarkIconProps = {
  className?: string;
};

export const CheckMarkIcon = (props: CheckMarkIconProps) => {
  return (
    <svg className={props.className || ''} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
    </svg>
  );
};

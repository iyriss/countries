import type { SVGProps } from 'react';

const OpenEyeIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g opacity='0.8'>
        <path
          d='M0.833313 9.99992C0.833313 9.99992 4.16665 3.33325 9.99998 3.33325C15.8333 3.33325 19.1666 9.99992 19.1666 9.99992C19.1666 9.99992 15.8333 16.6666 9.99998 16.6666C4.16665 16.6666 0.833313 9.99992 0.833313 9.99992Z'
          stroke='#202543'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M9.99998 12.4999C11.3807 12.4999 12.5 11.3806 12.5 9.99992C12.5 8.61921 11.3807 7.49992 9.99998 7.49992C8.61927 7.49992 7.49998 8.61921 7.49998 9.99992C7.49998 11.3806 8.61927 12.4999 9.99998 12.4999Z'
          stroke='#202543'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </g>
    </svg>
  );
};

const ClosedEyeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} fill='none' {...props}>
    <path stroke='#4D5169' strokeLinecap='round' d='M19 4 1 16' />
    <g stroke='#202543' strokeLinecap='round' strokeLinejoin='round' opacity={0.8}>
      <path d='M.833 10S4.167 3.334 10 3.334 19.167 10 19.167 10 15.833 16.667 10 16.667.833 10 .833 10' />
      <path d='M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5' />
    </g>
  </svg>
);

export { OpenEyeIcon, ClosedEyeIcon };

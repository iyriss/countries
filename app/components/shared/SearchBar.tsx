import { Form, useNavigation } from '@remix-run/react';
import { SearchIcon } from '../icons';

type SearchBarProps = {
  value: string;
  className?: string;
  onChange: (event: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (input: string) => void;
};

export const SearchBar = ({ value, className, onChange, onInputChange }: SearchBarProps) => {
  const navigation = useNavigation();

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q');

  return (
    <Form className='group relative w-full' id='search-form' role='search' onChange={onChange}>
      <div className='absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer transition-all hover:opacity-80'>
        {searching ? (
          <div className='absolute left-[2px] top-1/2 z-20 -translate-y-1/2'>
            <div className='animate-spin'>
              <svg
                className='h-5 w-5 text-navy-blue'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
            </div>
          </div>
        ) : (
          <SearchIcon className='text-light-gray group-focus-within:text-navy-blue' />
        )}
      </div>
      <input
        id='q'
        aria-label='Search'
        className={`h-[50px] w-full rounded-[25px] py-4 pl-11 pr-4 font-assistant text-[14px] shadow-[0px_6px_12px_0px_#8E989D14] backdrop-blur-[10px] placeholder:font-assistant placeholder:text-[14px] placeholder:text-[#a6a8b4] md:max-w-[280px] [&::-webkit-search-cancel-button]:hidden ${className || ''}`}
        placeholder='Search'
        type='search'
        name='q'
        onChange={(e) => onInputChange(e.currentTarget.value)}
        value={value}
      />
      {searching && (
        <div className='absolute right-0 top-1/2 z-10 -translate-y-1/2'>
          <div className='animate-spin'>
            <svg
              className='h-5 w-5 text-navy-blue'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
          </div>
        </div>
      )}
    </Form>
  );
};

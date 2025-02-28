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
    <Form className='group relative' id='search-form' role='search' onChange={onChange}>
      <div className='absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer transition-all hover:opacity-80'>
        <SearchIcon className='text-light-gray group-focus-within:text-navy-blue' />
      </div>
      <input
        id='q'
        aria-label='Search'
        className={`h-[50px] rounded-[25px] py-4 pl-11 pr-4 font-assistant text-[14px] shadow-[0px_6px_12px_0px_#8E989D14] backdrop-blur-[10px] placeholder:font-assistant placeholder:text-[14px] placeholder:text-[#a6a8b4] ${className || ''}`}
        placeholder='Search'
        type='search'
        name='q'
        onChange={(e) => onInputChange(e.currentTarget.value)}
        value={value}
      />
      {searching && (
        <div className='absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer transition-all hover:opacity-80'>
          loading...
        </div>
      )}
    </Form>
  );
};

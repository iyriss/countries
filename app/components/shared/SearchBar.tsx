import { SearchIcon } from '../icons';

type SearchBarProps = {
  className?: string;
};

export const SearchBar = ({ className }: SearchBarProps) => {
  return (
    <div className='group relative'>
      <div className='absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer transition-all hover:opacity-80'>
        <SearchIcon className='text-light-gray group-focus-within:text-navy-blue' />
      </div>
      <input
        type='search'
        placeholder='Search'
        className={`h-[50px] rounded-[25px] py-4 pl-11 pr-4 font-assistant text-[14px] shadow-[0px_6px_12px_0px_#8E989D14] backdrop-blur-[10px] placeholder:font-assistant placeholder:text-[14px] placeholder:text-[#a6a8b4] ${className || ''}`}
      />
    </div>
  );
};

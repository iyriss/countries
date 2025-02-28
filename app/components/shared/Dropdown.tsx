import { useEffect, useRef } from 'react';
import { CaretIcon, CheckMarkIcon } from '../icons';

type DropdownProps = {
  isOpen: boolean;
  allItems: string[];
  selectedItems: string[];
  buttonClassName?: string;
  onOpen: (isOpen: boolean) => void;
  getDisplayText: () => string;
  onToggleOption: (item: string) => void;
};

export const Dropdown = ({
  isOpen,
  onOpen,
  getDisplayText,
  allItems,
  selectedItems,
  buttonClassName,
  onToggleOption,
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onOpen]);

  return (
    <div ref={dropdownRef} className='relative w-full font-assistant text-navy-blue md:w-auto'>
      <button
        onClick={() => onOpen(!isOpen)}
        className={`flex h-[53px] items-center justify-between rounded-[25px] bg-white px-4 py-2 shadow-[0px_6px_12px_0px_rgba(142,152,157,0.08)] backdrop-blur-[10px] ${buttonClassName || ''}`}
      >
        <span className='font-semibold'>{getDisplayText()}</span>
        <CaretIcon
          className={`${isOpen ? 'rotate-180' : ''} text-navy-blue transition-transform duration-200`}
        />
      </button>

      {isOpen && (
        <div className='absolute mt-2 w-full overflow-auto rounded-[12px] bg-white py-5 shadow-[0px_6px_12px_0px_rgba(142,152,157,0.08)] backdrop-blur-[10px]'>
          {allItems.map((item) => {
            const isSelected = selectedItems.includes(item);
            return (
              <div
                key={item}
                onClick={() => onToggleOption(item)}
                className='flex cursor-pointer items-center justify-between px-5 py-2 hover:bg-gray-100'
              >
                <span className={`${isSelected ? 'opacity-100' : 'opacity-70'}`}>{item}</span>
                {isSelected && <CheckMarkIcon className='h-4 w-4 text-navy-blue' />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

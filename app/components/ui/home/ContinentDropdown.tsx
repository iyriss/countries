import { useState } from 'react';
import { Dropdown } from './shared/Dropdown';

const allContinents = [
  'All continents',
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Oceania',
];

export const ContinentDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContinents, setSelectedContinents] = useState<string[]>(['All continents']);

  const handleToggleContinent = (continent: string) => {
    setSelectedContinents((prev) => {
      if (continent === 'All continents') {
        return ['All continents'];
      }

      const newSelection = prev.filter((c) => c !== 'All continents');
      if (newSelection.includes(continent)) {
        return newSelection.filter((c) => c !== continent);
      } else {
        return [...newSelection, continent];
      }
    });
  };

  const getDisplayText = () => {
    const length = selectedContinents.length;
    const hasAllContinents = selectedContinents.includes('All continents');

    if (hasAllContinents) {
      return 'All continents';
    }

    if (length === 0) {
      return 'Select continents';
    }

    if (length === 1) {
      return selectedContinents[0];
    }

    return `${length} selected`;
  };

  return (
    <Dropdown
      isOpen={isOpen}
      allItems={allContinents}
      selectedItems={selectedContinents}
      buttonClassName='w-[165px]'
      onOpen={setIsOpen}
      getDisplayText={getDisplayText}
      onToggleOption={handleToggleContinent}
    />
  );
};

import { useState } from 'react';
import { useSearchParams, useSubmit } from 'react-router-dom';
import { Dropdown } from '../../shared';

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
  const [searchParams] = useSearchParams();
  const continentsFromUrl = searchParams.getAll('continent');
  const [selectedContinents, setSelectedContinents] = useState<string[]>(
    continentsFromUrl.length > 0 ? continentsFromUrl : ['All continents'],
  );

  const submit = useSubmit();

  const handleToggleContinent = (continent: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete('continent');
    params.delete('page');

    if (continent === 'All continents') {
      setSelectedContinents(['All continents']);
    } else {
      const newSelection = selectedContinents.filter((c) => c !== 'All continents');
      if (newSelection.includes(continent)) {
        newSelection.splice(newSelection.indexOf(continent), 1);
      } else {
        newSelection.push(continent);
      }

      if (newSelection.length === 0) {
        params.append('continent', 'All continents');
      } else {
        newSelection.forEach((c) => params.append('continent', c));
      }
      setSelectedContinents(newSelection.length === 0 ? ['All continents'] : newSelection);
    }

    submit(params, { replace: true });
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

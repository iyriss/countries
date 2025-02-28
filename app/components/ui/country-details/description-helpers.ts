
const formatLocation = (data: any) => {
    if (data.subregion && data.region) {
        return `${data.subregion}, ${data.region}`;
    }
    return data.region || 'an unknown name region';
};

const formatPopulation = (population?: number) => {
    return population
        ? `has a population of ${population.toLocaleString()} people`
        : 'has an unknown population number';
};

const formatLanguages = (languages: Record<string, string> = {}) => {
    const languageList = Object.values(languages).join(', ');
    if (!languageList) {
        return 'language information is not available';
    }

    const isPlural = Object.keys(languages).length > 1;
    return `language${isPlural ? 's' : ''} spoken ${isPlural ? 'are' : 'is'} ${languageList}`;
};

const formatCurrencies = (currencies: Record<string, any> = {}) => {
    const currencyList = Object.values(currencies)
        .map((c: any) => `${c.name} (${c.symbol})`)
        .join(', ');

    const isPlural = Object.keys(currencies).length > 1;

    return currencyList
        ? `The currency used ${isPlural ? 'are' : 'is'} ${currencyList}`
        : 'Currency information is not available';
};

const getDescription = (data: any) => {
    return [
        `${data.name.common} is a country located in ${formatLocation(data)}.`,
        `Its capital city is ${data.capital?.[0] || 'unknown'} and ${formatPopulation(data.population)}.`,
        `The ${formatLanguages(data.languages)}.`,
        `${formatCurrencies(data.currencies)}.`,
    ].join(' ');
};


export { getDescription };
import { LoaderFunctionArgs } from '@remix-run/node';
import { Suspense } from 'react';
import { Await, useAsyncValue, useLoaderData, defer } from '@remix-run/react';
import { Layout } from '../../components/layout/MainLayout';
import Card from '../../components/ui/country-details/Card';
import { getDescription } from '../../components/ui/country-details/description-helpers';
import { CountryDetailsSkeleton } from '../../components/ui/country-details/CountryDetailsSkeleton';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${id}?fields=name,population,languages,capital,flags,subregion,region`,
  );

  if (!response.ok) {
    throw new Response('Country not found', { status: 404 });
  }

  const data = await response.json();
  const description = getDescription(data);
  const countryPromise = { ...data, description };

  return defer({
    country: countryPromise,
  });
};

function CountryContent() {
  const country = useAsyncValue() as {
    flags: { svg: string };
    name: { common: string };
    capital: string[];
    subregion: string;
    region: string;
    population: number;
    languages: Record<string, string>;
  };

  return (
    <div className='grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2'>
      <Card
        label='Country Flag'
        imgSrc={country.flags.svg}
        imgAlt={`${country.name.common} flag`}
        value=''
      />
      <Card label='Capital' value={country.capital?.[0] || 'Unknown'} />
      <Card label='Region' value={country.subregion || country.region} />
      <Card label='Population' value={country.population?.toLocaleString() || 'Unknown'} />
      <Card
        label='Languages'
        value={Object.values(country.languages || {}).join(', ') || 'Unknown'}
      />
    </div>
  );
}

export default function CountryDetails() {
  const { country } = useLoaderData<typeof loader>();

  return (
    <Layout
      title={
        <Suspense fallback='Loading country description...'>
          <Await resolve={country}>{(country) => country.name.common}</Await>
        </Suspense>
      }
      description={
        <Suspense fallback='Loading country description...'>
          <Await resolve={country}>{(country) => country.description}</Await>
        </Suspense>
      }
      backButton
    >
      <Suspense fallback={<CountryDetailsSkeleton />}>
        <Await resolve={country}>
          <CountryContent />
        </Await>
      </Suspense>
    </Layout>
  );
}

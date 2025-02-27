import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useNavigation } from '@remix-run/react';
import { Layout } from '../../components/layout/MainLayout';
import Card from '../../components/ui/home/country-details/Card';
import { getDescription } from '../../components/ui/home/country-details/description-helpers';
import { LoadingComponent } from '../../components/shared';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha/${id}?fields=name,population,languages,capital,currencies,flags,subregion,region`,
    );

    if (!res.ok) {
      throw new Response('Country not found', { status: 404 });
    }

    const data = await res.json();

    const description = getDescription(data);

    return new Response(JSON.stringify({ country: { ...data, description } }), {
      headers: {
        'Cache-Control': 'public, max-age=2592000', // Cache for 30 days (60 * 60 * 24 * 30 seconds)
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Response('Failed to load country data', { status: 500 });
  }
};

export function ErrorBoundary() {
  return (
    <Layout title='Error' description='Something went wrong'>
      <div className='flex flex-col items-center justify-center p-8'>
        <h1 className='mb-4 text-2xl font-bold'>Oops! Something went wrong</h1>
        <p>We couldn't load the country information. Please try again later.</p>
      </div>
    </Layout>
  );
}

export default function CountryDetails() {
  const navigation = useNavigation();
  const { country } = useLoaderData<typeof loader>();

  if (navigation.state === 'loading') {
    return <LoadingComponent />;
  }

  return (
    <Layout title={country?.name?.common} description={country?.description}>
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
    </Layout>
  );
}

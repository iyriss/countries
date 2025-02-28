import { FormEvent, useEffect, useState } from 'react';
import type { MetaFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useNavigate, useSearchParams, useSubmit } from '@remix-run/react';
import { Layout } from '../components/layout/MainLayout';
import { ContinentDropdown } from '../components/ui/home/ContinentDropdown';
import { SearchBar } from '../components/shared';
import { CaretIcon } from '../components/icons';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

let countriesCache: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

const ITEMS_PER_PAGE = 20;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = url.searchParams.get('page');

  const continents = url.searchParams.getAll('continent');
  const search = url.searchParams.get('q')?.toLowerCase() ?? '';

  // If cache exists and is valid, use it
  let allCountries;
  if (countriesCache && Date.now() - lastFetchTime < CACHE_DURATION) {
    allCountries = countriesCache;
  } else {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,continents,cca3');
    allCountries = await res.json();
    allCountries.sort((a: any, b: any) => a?.name?.common?.localeCompare(b?.name?.common));

    // Update cache
    countriesCache = allCountries;
    lastFetchTime = Date.now();
  }

  let filteredCountries = [...allCountries];

  if (continents.length > 0 && !continents.includes('All continents')) {
    filteredCountries = filteredCountries.filter((country: any) =>
      country.continents.some((continent: string) => continents.includes(continent)),
    );
  }

  if (search) {
    filteredCountries = filteredCountries.filter((country: any) => {
      const nameMatch = country.name.common.toLowerCase().includes(search);
      return nameMatch;
    });
  }

  const totalItems = filteredCountries.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(1, page ? parseInt(page) : 1), totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedCountries = filteredCountries.slice(startIndex, endIndex);
  const pagination = {
    currentPage,
    totalPages,
  };

  return new Response(
    JSON.stringify({
      countries: paginatedCountries,
      q: search,
      pagination,
    }),
    {
      headers: {
        'Cache-Control': 'public, max-age=2592000',
        'Content-Type': 'application/json',
      },
    },
  );
};

export default function Index() {
  const { countries, q, pagination } = useLoaderData<typeof loader>();
  const [query, setQuery] = useState(q || '');
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const navigate = useNavigate();
  const continents = searchParams.getAll('continent');
  useEffect(() => {
    setQuery(q || '');
  }, [q]);

  const handleSearchChange = (e: FormEvent<HTMLFormElement>) => {
    const isFirstSearch = q === null;
    const formData = new FormData(e.currentTarget);

    const params = new URLSearchParams(searchParams);
    const qParam = formData.get('q') as string;
    qParam ? params.set('q', qParam) : params.delete('q');
    params.delete('page');

    submit(params, {
      replace: !isFirstSearch,
    });
  };

  return (
    <Layout title='Countries' description='A database of the countries of the world'>
      <div className='mb-10 flex items-center gap-4'>
        <ContinentDropdown />
        <SearchBar value={query} onInputChange={setQuery} onChange={handleSearchChange} />
      </div>

      <table className='w-full font-assistant'>
        <thead>
          <tr className='flex w-full px-12 pb-4 text-left text-sm font-semibold text-light-gray'>
            <th className='min-w-20 max-w-[200px] flex-[2]'>Flag</th>
            <th className='flex-[5]'>Name</th>
            <th className='flex-[6]'>Continent</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country: any) => (
            <tr
              key={country.name.common}
              className='mb-4 flex min-h-[78px] items-center rounded-[20px] bg-white px-12 font-semibold text-navy-blue'
              onClick={() => {
                navigate(`/country/${country.cca3}`);
              }}
            >
              <td className='min-w-20 max-w-[200px] flex-[2]'>
                <img
                  src={country.flags.png}
                  alt={`${country.name.common} flag`}
                  className='h-12 w-12 rounded-full object-cover'
                />
              </td>
              <td className='flex-[5] truncate'>{country.name.common}</td>
              <td className='flex-[6]'>{country.continents.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {pagination?.totalPages > 1 ? (
        <div className='mt-6 flex justify-center gap-2'>
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set('page', (pagination.currentPage - 1).toString());
              submit(params, {
                replace: true,
              });
            }}
            disabled={pagination.currentPage === 1}
            className='group flex items-center gap-2 px-4 py-2 text-sm text-navy-blue/70 disabled:opacity-0'
          >
            <CaretIcon className='rotate-90' />
            <span className='text-sm group-hover:underline'>Previous</span>
          </button>

          <span className='px-4 py-2 font-assistant'>
            Page {pagination.currentPage} of {pagination.totalPages}{' '}
          </span>

          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set('page', (pagination.currentPage + 1).toString());
              submit(params, {
                replace: true,
              });
            }}
            disabled={pagination.currentPage === pagination.totalPages}
            className='group flex items-center gap-2 px-4 py-2 text-sm text-navy-blue/70 disabled:opacity-0'
          >
            <span className='text-sm group-hover:underline'>Next</span>
            <CaretIcon className='-rotate-90' />
          </button>
        </div>
      ) : (
        <div className='px-4 py-2 text-center text-light-gray'>No results found</div>
      )}
    </Layout>
  );
}

import type { MetaFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useNavigate, useNavigation, useSearchParams } from '@remix-run/react';
import { Layout } from '../components/layout/MainLayout';
import { ContinentDropdown } from '../components/ui/home/ContinentDropdown';
import { LoadingComponent, SearchBar } from '../components/shared';
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
  const page = parseInt(url.searchParams.get('page') ?? '1');
  const continent = url.searchParams.get('continent') ?? 'all';

  // If cache exists and is valid, use it
  let allCountries;
  if (countriesCache && Date.now() - lastFetchTime < CACHE_DURATION) {
    allCountries = countriesCache;
  } else {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,continents,cca3');
    allCountries = await res.json();
    allCountries.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));

    // Update cache
    countriesCache = allCountries;
    lastFetchTime = Date.now();
  }

  const totalItems = allCountries.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  return new Response(
    JSON.stringify({
      countries: allCountries.slice(startIndex, endIndex),
      pagination: {
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage: ITEMS_PER_PAGE,
      },
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
  const { countries, pagination } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  if (navigation.state === 'loading') {
    return <LoadingComponent />;
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    navigate(`?${params.toString()}`);
  };

  return (
    <Layout title='Countries' description='A database of the countries of the world'>
      <div className='mb-10 flex items-center gap-4'>
        <ContinentDropdown />
        <SearchBar className='h-[50px] w-[280px]' />
      </div>

      <table className='w-full font-assistant'>
        <thead>
          <tr className='flex w-full px-12 pb-4 text-left text-sm font-semibold text-light-gray'>
            <th className='max-w-[200px] flex-[2]'>Flag</th>
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
              <td className='max-w-[200px] flex-[2]'>
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

      <div className='mt-6 flex justify-center gap-2'>
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className='group flex items-center gap-2 px-4 py-2 text-sm text-navy-blue/70 disabled:opacity-0'
        >
          <CaretIcon className='rotate-90' />
          <span className='text-sm group-hover:underline'>Previous</span>
        </button>

        <span className='px-4 py-2'>
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>

        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className='group flex items-center gap-2 px-4 py-2 text-sm text-navy-blue/70 disabled:opacity-0'
        >
          <span className='text-sm group-hover:underline'>Next</span>
          <CaretIcon className='-rotate-90' />
        </button>
      </div>
    </Layout>
  );
}

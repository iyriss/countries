import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Layout from '../components/ui/Layout';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export const loader = async () => {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,continents');
  const data = await res.json();
  return { countries: data };
};

export default function Index() {
  const { countries } = useLoaderData<typeof loader>();
  console.log(countries);
  return (
    <Layout>
      <div className='px-14 py-12'>
        <div className='font-inter mb-[45px]'>
          <h1 className='text-[40px] font-semibold text-dark-purple'>Countries</h1>
          <div className='mt-3 text-heather-gray'>A database of the countries of the world</div>
        </div>
        <div className='mb-10 flex items-center gap-4'>
          <button>All continents</button>
          <input type='search' placeholder='Search' />
        </div>
        <table className='w-full font-assistant'>
          <thead>
            <tr className='flex w-full px-12 pb-4 text-left text-sm font-semibold text-light-gray'>
              <th className='max-w-[200px] flex-[2]'>Flag</th>
              <th className='flex-[2]'>Name</th>
              <th className='flex-[6]'>Continent</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country: any) => (
              <tr
                key={country.name.common}
                className='mb-4 flex min-h-[78px] items-center rounded-[20px] bg-white px-12 font-semibold text-navy-blue'
              >
                <td className='max-w-[200px] flex-[2]'>
                  <img
                    src={country.flags.png}
                    alt={`${country.name.common} flag`}
                    className='h-12 w-12 rounded-full object-cover'
                  />
                </td>
                <td className='flex-[2] truncate'>{country.name.common}</td>
                <td className='flex-[6]'>{country.continents.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export function CountryDetailsSkeleton() {
  return (
    <div className='grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2'>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className='flex min-h-[200px] animate-pulse flex-col rounded-[20px] bg-white p-6 shadow-sm'
        >
          {index === 0 ? (
            <>
              <div className='mb-2 h-4 w-24 rounded bg-gray-200' />
              <div className='mt-2 h-32 w-full rounded-lg bg-gray-200' />
            </>
          ) : (
            <>
              <div className='mb-2 h-4 w-24 rounded bg-gray-200' />
              <div className='mt-2 h-8 w-32 rounded bg-gray-200' />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

import { useState } from 'react';
import SideBar from './SideBar';

type LayoutProps = {
  title: string;
  description: string;
  backButton?: boolean;
  children: React.ReactNode;
};

export function Layout({ children, title, description, backButton = false }: LayoutProps) {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleBack = () => {
    setIsNavigating(true);
    window.history.back();
  };

  return (
    <div className='relative min-h-screen w-full'>
      <div className='fixed inset-0 -z-10 h-screen w-full overflow-hidden'>
        <div className="absolute inset-0 bg-[#F1F2F6] bg-[url('/images/background-ui.avif')] bg-cover bg-center bg-blend-screen" />
      </div>
      <div className='flex w-full'>
        <SideBar />

        <main className='flex flex-1 justify-center px-0 transition-[padding] duration-300 md:px-0 md:pl-[calc(var(--sidebar-open)*276px)]'>
          <div className='w-full max-w-screen-2xl md:p-2'>
            <div className='px-6 py-12 md:px-14'>
              <div className='mb-[45px] font-assistant text-sm text-navy-blue group-hover:underline'>
                {backButton ? (
                  <button
                    onClick={handleBack}
                    disabled={isNavigating}
                    className='mb-6 flex items-center text-heather-gray transition-colors hover:underline disabled:opacity-50'
                  >
                    <svg
                      width='24'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      className={`mr-1 ${isNavigating ? 'animate-pulse' : ''}`}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 12H5M12 19l-7-7 7-7'
                      />
                    </svg>
                    {isNavigating ? 'Going back...' : 'Back'}
                  </button>
                ) : null}
                <h1 className='text-[40px] font-semibold text-dark-purple'>{title}</h1>
                <div className='mt-3 text-heather-gray'>{description}</div>
              </div>

              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

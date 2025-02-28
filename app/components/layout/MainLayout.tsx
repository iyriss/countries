import SideBar from './SideBar';

type LayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function Layout({ children, title, description }: LayoutProps) {
  return (
    <div className='relative min-h-screen w-full'>
      <div className='fixed inset-0 -z-10 h-screen w-full overflow-hidden'>
        <div className="absolute inset-0 bg-[#F1F2F6] bg-[url('/images/background-ui.avif')] bg-cover bg-center bg-blend-screen" />
      </div>
      <div className='flex w-full'>
        <SideBar />
        <main
          style={{ paddingLeft: 'calc(var(--sidebar-open) * 276px)' }}
          className='flex flex-1 justify-center transition-[padding] duration-300'
        >
          <div className='w-full max-w-screen-2xl p-2'>
            <div className='px-14 py-12'>
              <div className='font-inter mb-[45px]'>
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

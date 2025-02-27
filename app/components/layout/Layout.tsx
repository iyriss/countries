import SideBar from './SideBar';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative min-h-screen w-full'>
      <div className='fixed inset-0 -z-10 h-screen w-full overflow-hidden'>
        <div className="absolute inset-0 bg-[#F1F2F6] bg-[url('/images/background-ui.avif')] bg-cover bg-center bg-blend-screen" />
      </div>
      <div className='flex w-full'>
        <SideBar />
        <div className='ml-[276px] flex-1 p-2'>{children}</div>
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative min-h-screen w-full'>
      <div className='fixed inset-0 -z-10 h-screen w-full overflow-hidden'>
        <div className="absolute inset-0 bg-[#F1F2F6] bg-[url('/images/background-ui.avif')] bg-cover bg-center bg-blend-screen" />
      </div>
      <div className='grid w-full grid-cols-[260px,1fr]'>
        <div className='m-2 h-screen max-w-[260px] rounded-[32px] bg-white px-8 opacity-80 backdrop-blur-[40px]'>
          <hr className='border-midnight/08 mt-[47px] border' />
          <div>Brian Johnson</div>
          <hr className='border-midnight/08 mt-[47px] border' />
        </div>

        {children}
      </div>
    </div>
  );
}

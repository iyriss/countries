import { useEffect, useState } from 'react';
import { MapIcon, LogOutIcon } from '../icons';
import { Link, useMatches } from '@remix-run/react';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const matches = useMatches();
  const userData = (matches[0]?.data as { user: { name: string; avatar: string } })?.user;

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-open', isOpen ? '1' : '0');
  }, [isOpen]);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className='fixed left-4 top-4 z-50 md:hidden'>
        <div className='space-y-1 md:hidden'>
          <span
            className={`block h-0.5 w-4 bg-navy-blue/70 transition-transform duration-300 ${isOpen ? 'translate-y-1.5 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-4 bg-navy-blue/70 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-4 bg-navy-blue/70 transition-transform duration-300 ${isOpen ? '-translate-y-1.5 -rotate-45' : ''}`}
          />
        </div>
      </button>

      <div
        className={`fixed z-20 m-2 h-[calc(100vh-16px)] w-[260px] rounded-[32px] bg-white/80 px-8 text-navy-blue/70 backdrop-blur-[40px] transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <hr className='border-midnight/08 mt-[47px] border' />
        <div className='mb-[46px] mt-8 flex items-center gap-4'>
          <div>
            <img
              src={userData?.avatar || '/images/avatar.png'}
              alt='avatar'
              className='h-10 w-10 rounded-full object-cover object-[center_top]'
            />
          </div>
          <div>
            <div className='font-semibold'>{userData?.name || ''}</div>
            <div className='cursor-pointer text-sm hover:underline'>Edit Profile</div>
          </div>
        </div>

        <hr className='border-midnight/08 border' />

        <div className='mt-6 flex h-[calc(100vh-197px)] flex-col justify-between'>
          <Link to='/' className='group flex items-center gap-4'>
            <div className='flex h-11 w-11 items-center justify-center rounded-full bg-dark-purple group-hover:bg-opacity-90'>
              <MapIcon />
            </div>
            <span className='text-sm font-semibold group-hover:text-navy-blue'>Countries</span>
          </Link>
          <div className='group mb-[28px] flex cursor-pointer items-center gap-4'>
            <div className='flex h-11 w-11 items-center justify-center rounded-full bg-dark-purple bg-opacity-[04%] group-hover:bg-opacity-[0.1]'>
              <LogOutIcon />
            </div>
            <span className='font-semibold group-hover:text-navy-blue'>Log Out</span>
          </div>
        </div>
      </div>
    </>
  );
}

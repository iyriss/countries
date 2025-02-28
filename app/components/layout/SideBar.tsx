import { useState } from 'react';
import { MapIcon, LogOutIcon } from '../icons';
import { Link } from '@remix-run/react';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

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
        } md:translate-x-0`}
      >
        <hr className='border-midnight/08 mt-[47px] border' />
        <div className='mb-[46px] mt-8 flex items-center gap-4'>
          <div>
            <img
              src='/images/avatar.png'
              alt='avatar'
              className='h-10 w-10 rounded-full object-cover object-[center_top]'
            />
          </div>
          <div>
            <div className='font-semibold'>Brian Johnson</div>
            <div className='text-sm'>Edit Profile</div>
          </div>
        </div>

        <hr className='border-midnight/08 border' />

        <div className='mt-6 flex h-[calc(100vh-197px)] flex-col justify-between'>
          <Link to='/' className='flex items-center gap-4'>
            <div className='flex h-11 w-11 items-center justify-center rounded-full bg-dark-purple'>
              <MapIcon />
            </div>
            <div className='text-sm font-semibold'>Countries</div>
          </Link>
          <div className='mb-[28px] flex items-center gap-4'>
            <div className='flex h-11 w-11 items-center justify-center rounded-full bg-dark-purple bg-opacity-[04%]'>
              <LogOutIcon />
            </div>
            <div className='font-semibold'>Log Out</div>
          </div>
        </div>
      </div>
    </>
  );
}

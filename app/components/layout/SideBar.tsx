import { MapIcon, LogOutIcon } from '../icons';
import { Link } from '@remix-run/react';

export default function SideBar() {
  return (
    <div className='fixed m-2 h-[calc(100vh-16px)] w-[260px] rounded-[32px] bg-white/80 px-8 text-navy-blue/70 backdrop-blur-[40px]'>
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
  );
}

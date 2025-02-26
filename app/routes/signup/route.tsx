import { Link } from '@remix-run/react';
import Input from '../../components/shared/Input';

export default function () {
  return (
    <div className='flex h-full w-full flex-col md:flex-row'>
      <div className='mx-auto my-8 w-full p-8 text-navy-blue md:m-auto md:p-6'>
        <div className='mx-auto w-full max-w-[544px]'>
          <h1 className='mb-4 text-[32px] font-semibold'>Welcome Back!</h1>
          <p>Learn all about the countries of the world</p>

          <div className='flex justify-between'>
            <button>Sign up with google</button>
            <button>Sign up with Microsoft</button>
          </div>

          <hr className='border- my-8' />

          <Input placeholder='Email Address' label='Email Address' className='mb-8' />
          <Input type='password' placeholder='Password' label='Password' className='mb-8' />

          <button className='mb-8'>Log in</button>

          <div className='text-navy-blue'>
            <span>Don't have an account?</span>
            <Link to='/signin' className='ml-2 font-semibold'>
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <div className='mx-auto w-full p-6'>
        <div className='h-full max-w-[872px] rounded-[40px] bg-primary p-6'>
          <div>The simplest way to track and manage your geographical data</div>
        </div>
      </div>
    </div>
  );
}

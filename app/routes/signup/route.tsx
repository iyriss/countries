import { useState } from 'react';
import { Link } from '@remix-run/react';
import { Input, Button } from '../../components/ui';
import { GoogleIcon, MicrosoftIcon, OpenEyeIcon, ClosedEyeIcon } from '../../components/icons';

export default function () {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex h-full w-full flex-col md:flex-row'>
      <div className='mx-auto my-8 w-full p-8 text-navy-blue md:m-auto md:p-6'>
        <div className='mx-auto w-full max-w-[544px]'>
          <h1 className='mb-4 text-[32px] font-semibold'>Welcome Back!</h1>
          <p>Learn all about the countries of the world</p>

          <div className='mt-8 flex justify-between gap-4'>
            <Button variant='secondary' className='flex w-full items-center justify-center gap-4'>
              <GoogleIcon />
              Sign up with google
            </Button>
            <Button variant='secondary' className='flex w-full items-center justify-center gap-4'>
              <MicrosoftIcon />
              Sign up with Microsoft
            </Button>
          </div>

          <hr className='border- my-8' />

          <Input placeholder='Email Address' label='Email Address' className='mb-8' />
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            label='Password'
            className='mb-8'
            icon={showPassword ? <OpenEyeIcon /> : <ClosedEyeIcon />}
            onIconClick={togglePassword}
          />

          <Button className='mb-8 w-full'>Log in</Button>

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

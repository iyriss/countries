import { useState } from 'react';
import { Link, useNavigate } from '@remix-run/react';
import { Input, Button } from '../../components/shared';
import { GoogleIcon, MicrosoftIcon, OpenEyeIcon, ClosedEyeIcon } from '../../components/icons';

export default function () {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex h-full w-full flex-col md:flex-row'>
      <div className='mx-auto mb-8 mt-16 w-full p-8 text-navy-blue md:m-auto md:w-1/2 md:p-6'>
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

          <Button className='mb-8 w-full' onClick={() => navigate('/')}>
            Log in
          </Button>

          <div className='text-navy-blue'>
            <span>Don't have an account?</span>
            <Link to='/signin' className='ml-2 font-semibold'>
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <div className='mx-auto w-full p-6 md:w-1/2'>
        <div className='mx-auto h-full max-w-[544px] rounded-[40px] bg-primary p-6 px-16 text-white md:max-w-[872px]'>
          <div className='mb-10 mt-[123px] max-w-[651px] text-4xl font-semibold'>
            The simplest way to track and manage your geographical data
          </div>
          <div className='text-xl'>Enter your credentials to access your account</div>

          <div className='mt-16 flex h-fit flex-col md:mt-[160px]'>
            <img
              src='/images/countries-list.png'
              alt='Countries list preview'
              className='w-[80%] shadow-[0px_40px_100px_0px_rgba(0,0,0,0.3)] md:max-w-[550px]'
            />
            <img
              src='/images/country-overview.png'
              alt='Country overview preview'
              className='ml-auto w-[80%] -translate-y-[30%] shadow-[0px_40px_100px_0px_rgba(0,0,0,0.3)] md:max-w-[550px]'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

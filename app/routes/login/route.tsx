import { useCallback, useState } from 'react';
import { Form, Link, redirect, useActionData, useLoaderData, useNavigate } from '@remix-run/react';
import { Input, Button } from '../../components/shared';
import { GoogleIcon, MicrosoftIcon, EyeIcon, EyeOffIcon } from '../../components/icons';
import { ActionFunction, json } from '@remix-run/node';

const mockEmail = process.env.EMAIL;
const mockPassword = process.env.PASSWORD;

type ActionErrors = {
  email?: string;
  password?: string;
  generic?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const errors: ActionErrors = {};

  if (!email) {
    errors.email = 'Email is required';
  } else if (!email.includes('@')) {
    errors.email = 'Invalid email format';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  if (Object.keys(errors).length > 0) {
    return new Response(JSON.stringify({ errors }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (email !== mockEmail || password !== mockPassword) {
    return new Response(JSON.stringify({ errors: { generic: 'Invalid credentials' } }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const response = redirect('/');
  response.headers.set('Set-Cookie', 'authenticated=true; Path=/');
  return response;
};

export default function () {
  const actionData = useActionData<typeof action>();
  const [showPassword, setShowPassword] = useState(false);
  console.log('A', actionData);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const getFieldError = useCallback(
    (field: keyof ActionErrors) => {
      if (!actionData?.errors || actionData.errors[field] === undefined) {
        return undefined;
      }
      return actionData.errors[field];
    },
    [actionData?.errors],
  );

  return (
    <div className='flex h-full w-full flex-col font-assistant md:flex-row'>
      <div className='mx-auto mb-8 w-full p-4 text-navy-blue sm:p-6 md:m-auto md:w-1/2 lg:mt-16'>
        <div className='mx-auto w-full max-w-[440px] lg:max-w-[544px]'>
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
          <Form method='post' className='relative'>
            {actionData?.errors?.generic ? (
              <div className='absolute -top-6 translate-y-0 transform px-6 text-center font-assistant text-sm text-red-500 opacity-100 transition-all duration-200 ease-in-out'>
                {actionData.errors.generic}
              </div>
            ) : null}

            <Input
              name='email'
              placeholder='Email Address'
              label='Email Address'
              className='mb-8'
              error={getFieldError('email')}
            />

            <Input
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              label='Password'
              className='mb-8'
              icon={showPassword ? <EyeIcon /> : <EyeOffIcon />}
              onIconClick={togglePassword}
              error={getFieldError('password')}
            />

            <Button className='mb-8 w-full'>Log in</Button>
          </Form>

          <div className='text-navy-blue'>
            <span>Don't have an account?</span>
            <Link to='/signin' className='ml-2 font-semibold'>
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <div className='mx-auto w-full p-4 sm:p-6 md:w-1/2'>
        <div className='mx-auto h-fit max-w-[440px] rounded-[40px] bg-primary p-4 text-white sm:p-6 sm:px-8 md:h-full md:max-w-[600px] lg:max-w-[872px] lg:px-16'>
          <div className='mb-6 mt-4 max-w-[651px] text-2xl font-semibold sm:text-3xl xl:mb-10 xl:text-4xl 2xl:mt-[123px]'>
            The simplest way to track and manage your geographical data
          </div>
          <div className='text-lg lg:text-xl'>Enter your credentials to access your account</div>

          <div className='relative mt-8 min-h-[200px] md:min-h-[400px] lg:mt-16 lg:h-[600px]'>
            <div className='absolute w-full'>
              <img
                src='/images/countries-list.png'
                alt='Countries list preview'
                className='w-[60%] shadow-[0px_40px_100px_0px_rgba(0,0,0,0.3)] md:w-[65%] md:max-w-[550px] lg:w-[70%]'
              />
              <img
                src='/images/country-overview.png'
                alt='Country overview preview'
                className='ml-auto mt-[-15%] w-[60%] shadow-[0px_40px_100px_0px_rgba(0,0,0,0.3)] md:w-[65%] md:max-w-[550px] lg:w-[70%]'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

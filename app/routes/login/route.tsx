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

  return redirect('/');
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

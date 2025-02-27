import { Layout } from '../layout/MainLayout';

export function LoadingComponent() {
  return (
    <Layout title='' description=''>
      <div className='flex items-center justify-center p-8'>
        <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900'></div>
      </div>
      <p className='text-center font-assistant text-xl'>Loading...</p>
    </Layout>
  );
}

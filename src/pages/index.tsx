import type { NextPage } from 'next';
import trpc from '../util/trpc';

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery([
    'hello',
    {
      text: 'Chris',
    },
  ]);

  if (isLoading) return <div>Loading...</div>;

  if (data) return <div>{data.greeting}</div>;

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <div className='text-2xl text-center'>Which Pokémon is Roundest?</div>
      <div className='p-2' />
      <div className='border rounded p-8 max-w-2xl flex justify-between items-center'>
        <div className='w-16 h-16 bg-red-200'>left</div>
        <div className='p-8'>vs</div>
        <div className='w-16 h-16 bg-red-200'>left</div>
      </div>
    </div>
  );
};

export default Home;

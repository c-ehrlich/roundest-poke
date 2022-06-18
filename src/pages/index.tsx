import { useState } from 'react';
import type { NextPage } from 'next';
import { getOptionsForVote } from '../util/getRandomPokemon';
import trpc from '../util/trpc';
import Image from 'next/image';

const Home: NextPage = () => {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;
  const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: first }]);
  const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: second }]);

  if (firstPokemon.isLoading || secondPokemon.isLoading)
    return <div>loading...</div>;

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <div className='text-2xl text-center'>Which Pokémon is Roundest?</div>
      <div className='p-2' />
      <div className='border rounded p-8 max-w-2xl flex justify-between items-center'>
        <div className='w-64 h-64 flex flex-col align-middle items-center'>
          <img
            src={firstPokemon.data?.sprites.front_default!}
            className='w-full'
          />
          <div className='text-xl text-center capitalize mt-[-2rem]'>
            {firstPokemon.data?.name}
          </div>
        </div>
        <div className='p-8'>vs</div>
        <div className='w-64 h-64 flex flex-col align-middle items-center '>
          <img
            src={secondPokemon.data?.sprites.front_default!}
            className='w-full'
          />
          <div className='text-xl text-center capitalize mt-[-2rem]'>
            {secondPokemon.data?.name}
          </div>
        </div>
        <div className='p-2' />
      </div>
    </div>
  );
};

export default Home;

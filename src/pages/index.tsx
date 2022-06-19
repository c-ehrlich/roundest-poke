import { FC, useState } from 'react';
import type { NextPage } from 'next';
import { getOptionsForVote } from '../utils/getRandomPokemon';
import trpc from '../utils/trpc';
import { inferQueryResponse } from './api/trpc/[trpc]';

const btn =
  'inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';

const Home: NextPage = () => {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: first }]);
  const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: second }]);

  const voteMutation = trpc.useMutation(['cast-vote']);

  function voteForRoundest(selected: number) {
    if (selected === first) {
      voteMutation.mutate({ votedFor: first, votedAgainst: second });
    } else {
      voteMutation.mutate({ votedFor: second, votedAgainst: first });
    }

    updateIds(getOptionsForVote());
  }

  return (
    <div className='h-screen w-screen flex flex-col justify-between items-center'>
      <div className='p-8 text-2xl text-center'>Which Pokémon is Roundest?</div>
      {!firstPokemon.isLoading &&
      firstPokemon.data &&
      !secondPokemon.isLoading &&
      secondPokemon.data ? (
        <div className='border rounded p-8 max-w-2xl flex justify-between items-center'>
          <PokemonListing
            pokemon={firstPokemon.data}
            vote={() => voteForRoundest(first)}
          />
          <div className='p-8'>vs</div>
          <PokemonListing
            pokemon={secondPokemon.data}
            vote={() => voteForRoundest(second)}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div className='p-16'>Results / About</div>
    </div>
  );
};

type PokemonFromServer = inferQueryResponse<'get-pokemon-by-id'>;

const PokemonListing: FC<{ pokemon: PokemonFromServer; vote: () => void }> = (
  props
) => {
  return (
    <div className='flex flex-col align-middle items-center'>
      <div className='text-xl text-center capitalize mt-[-2rem]'>
        {props.pokemon.name}
      </div>
      <img
        src={props.pokemon.sprite!}
        alt={props.pokemon.name}
        className='w-64 h-64'
      />
      <button className={btn} onClick={() => props.vote()}>
        Rounder
      </button>
    </div>
  );
};

export default Home;

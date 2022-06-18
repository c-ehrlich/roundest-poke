import type { NextPage } from 'next';
import { getOptionsForVote } from '../util/getRandomPokemon';
import trpc from '../util/trpc';

interface Props {
  first: number;
  second: number;
}

const Home: NextPage<Props> = ({ first, second }: Props) => {
  const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: first }]);
  const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: second }]);

  console.log(firstPokemon.data);

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <div className='text-2xl text-center'>Which Pokémon is Roundest?</div>
      <div className='p-2' />
      <div className='border rounded p-8 max-w-2xl flex justify-between items-center'>
        <div className='w-16 h-16 bg-red-800'>{first}</div>
        <div className='p-8'>vs</div>
        <div className='w-16 h-16 bg-red-800'>{second}</div>
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const [first, second] = getOptionsForVote();

  return {
    props: { first, second },
  };
}

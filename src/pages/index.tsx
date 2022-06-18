import type { NextPage } from 'next';
import { getOptionsForVote } from '../util/getRandomPokemon';

interface Props {
  first: number;
  second: number;
}

const Home: NextPage<Props> = ({ first, second }: Props) => {
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

export function getServerSideProps() {
  const [first, second] = getOptionsForVote();

  return {
    props: { first, second },
  };
}

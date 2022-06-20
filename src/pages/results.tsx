import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '../backend/utils/prisma';
import { AsyncReturnType } from '../utils/inferType';

const ONE_MINUTE = 1 * 60;

type PokemonQueryResult = AsyncReturnType<typeof getPokemonInOrder>;

const PokemonResultListing: React.FC<{
  pokemon: PokemonQueryResult[number];
  index: number;
}> = (props) => {
  return (
    <div className='flex border-white border relative w-full max-w-2xl justify-between items-center'>
      <div className='flex items-center gap-2'>
        <div className='w-10 h-10 bg-gray-700 flex flex-col place-self-start justify-center items-center rounded-br-2xl text-xl'>
          {props.index}
        </div>
        <Image
          className='-m-8 -p-8'
          src={props.pokemon.spriteUrl}
          alt={props.pokemon.name}
          width={96}
          height={96}
          layout='fixed'
        />
        <div className='text-xl'>{props.pokemon.name}</div>
      </div>
      <div className='text-xl mr-4'>{props.pokemon.countPercent}%</div>
    </div>
  );
};

const ResultsPage: React.FC<{
  pokemon: PokemonQueryResult;
}> = (props) => {
  return (
    <div className='flex flex-col w-screen items-center'>
      <Link href='/'>
        <a className='w-screen text-left text-xl'>{'<'} back</a>
      </Link>
      <h1 className='text-2xl m-4'>Results</h1>
      {props.pokemon.map((pokemon, index) => (
        <PokemonResultListing
          key={pokemon.id}
          pokemon={pokemon}
          index={index + 1}
        />
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const pokemonOrdered = await getPokemonInOrder();
  return {
    props: { pokemon: pokemonOrdered },
    // revalidate: ONE_MINUTE,
  };
};

const getPokemonInOrder = async () => {
  const pokemon = await prisma.pokemon.findMany({
    orderBy: { votesFor: { _count: 'desc' } },
    select: {
      id: true,
      name: true,
      spriteUrl: true,
      _count: {
        select: {
          votesFor: true,
          votesAgainst: true,
        },
      },
    },
  });

  type PokemonWithCountPercent = typeof pokemon[number] & {
    countPercent: string;
  };

  const generateCountPercent = (poke: typeof pokemon[number]) => {
    const { votesFor, votesAgainst } = poke._count;
    const count = (100 * votesFor) / (votesFor + votesAgainst);

    if (isNaN(count)) return (0.0).toFixed(2);
    return count.toFixed(2);
  };

  const pokemonWithCountPercent: PokemonWithCountPercent[] = pokemon.map(
    (p: typeof pokemon[number]) => ({
      ...p,
      countPercent: generateCountPercent(p),
    })
  );
  return pokemonWithCountPercent.sort((a, b) => {
    return Number(b.countPercent) - Number(a.countPercent);
  });
};

export default ResultsPage;

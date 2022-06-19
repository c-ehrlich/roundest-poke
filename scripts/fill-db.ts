import { PokemonClient } from 'pokenode-ts';
import { prisma } from '../src/backend/utils/prisma';

async function doBackfill() {
  const pokeApi = new PokemonClient();
  const allPokemon = await pokeApi.listPokemons(0, 493);
  const formattedPokemon = allPokemon.results.map((p, index) => ({
    id: index + 1,
    name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
    spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
  }));

  const creation = await prisma.pokemon.createMany({
    data: formattedPokemon.map((p) => ({
      id: p.id,
      name: p.name,
      spriteUrl: p.spriteUrl,
    })),
  });

  console.log('Creation?', creation);
}

doBackfill();

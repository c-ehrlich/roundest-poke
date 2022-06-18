import * as trpc from '@trpc/server';
import { PokemonClient } from 'pokenode-ts';

import { z } from 'zod';

export const appRouter = trpc.router().query('get-pokemon-by-id', {
  input: z.object({
    id: z.number().min(1).max(493),
  }),
  async resolve({ input }) {
    const api = new PokemonClient();
    const pokemon = await api.getPokemonById(input.id);
    return { name: pokemon.name, sprite: pokemon.sprites.front_default };
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;

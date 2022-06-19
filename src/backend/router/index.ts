import * as trpc from '@trpc/server';
import { PokemonClient } from 'pokenode-ts';
import { prisma } from '../utils/prisma';

import { z } from 'zod';

export const appRouter = trpc
  .router()
  .query('get-pokemon-by-id', {
    input: z.object({
      id: z.number().min(1).max(493),
    }),
    async resolve({ input }) {
      const api = new PokemonClient();

      const pokemon = await prisma.pokemon.findUnique({
        where: { id: input.id },
      });
      if (!pokemon) throw new Error('Pokemon doesnt exist');
      return pokemon;
    },
  })
  .mutation('cast-vote', {
    input: z.object({
      votedForId: z.number(),
      votedAgainstId: z.number(),
    }),
    async resolve({ input }) {
      const voteInDb = await prisma.vote.create({
        data: {
          ...input,
        },
      });
      return { success: true, vote: voteInDb };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

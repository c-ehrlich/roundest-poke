import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '../backend/router/index';

const trpc = createReactQueryHooks<AppRouter>();

export default trpc;

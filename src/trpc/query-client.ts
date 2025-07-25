import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from '@tanstack/react-query';
import superjson from 'superjson';
/**
 * Creates and returns a new QueryClient instance with custom default options for query caching, hydration, and dehydration.
 *
 * The client uses a 30-second stale time for queries and integrates superjson for serialization and deserialization of query data. During dehydration, queries with a 'pending' status are also included in addition to the default selection.
 *
 * @returns A configured QueryClient instance.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
    },
  });
}
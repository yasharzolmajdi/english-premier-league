import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

let apolloClient: ApolloClient<InMemoryCache>;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: new HttpLink({
      uri: "https://decisive-pot.us-west-2.aws.cloud.dgraph.io/graphql",
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState?: InMemoryCache) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();

    _apolloClient.cache.restore({
      ...existingCache,
      ...initialState,
    } as InMemoryCache);
  }

  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState?: InMemoryCache) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

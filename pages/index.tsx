import { GetStaticPropsResult } from "next";
import Link from "next/link";
import Head from "next/head";

import { ALL_CLUBS_QUERY, ALL_COUNTRIES_QUERY } from "@components/PlayerFilter";
import PlayersList from "@components/PlayerList";
import PageTitle from "@components/PageTitle";
import { initializeApollo } from "@lib/apolloClient";

export default function Home() {
  return (
    <div className="container p-2 mx-auto">
      <Head>
        <title>EPL Players Directory</title>
      </Head>
      <PageTitle>
        EPL Players Directory{" "}
        <Link href="/table">
          <a className="text-indigo-600 hover:text-indigo-900">(EPL Table)</a>
        </Link>
      </PageTitle>
      <PlayersList />
    </div>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<{}>> {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_COUNTRIES_QUERY,
  });

  await apolloClient.query({
    query: ALL_CLUBS_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

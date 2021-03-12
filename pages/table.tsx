import { GetServerSidePropsResult } from "next";
import Link from "next/link";
import Head from "next/head";

import PageTitle from "@components/PageTitle";
import Table from "@components/Table";

interface EPLTable {
  data: {
    team_name: string;
    overall_league_position: string;
    overall_league_PTS: string;
  }[];
}

export default function TablePage({ data }: EPLTable) {
  console.log(data);
  return (
    <div className="container p-2 mx-auto">
      <Head>
        <title>EPL Table</title>
      </Head>
      <Link href="/">
        <a className="text-indigo-600 hover:text-indigo-900">
          Back to players directory
        </a>
      </Link>
      <div className="mt-4">
        <PageTitle>EPL Table</PageTitle>
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-8 w-full">
        <Table
          rows={data}
          headers={{
            overall_league_position: "Position",
            team_name: "Team Name",
            overall_league_PTS: "PTS",
          }}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<{}>
> {
  // Fetch data from external API
  const res = await fetch(
    `https://apiv2.apifootball.com/?action=get_standings&league_id=148&APIkey=${process.env.APIFOOTBALL_KEY}`
  );
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}

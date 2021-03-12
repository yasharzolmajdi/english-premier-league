import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import PlayerFilter from "@components/PlayerFilter";
import notEmpty from "@helpers/notEmpty";
import { allPlayers, allPlayers_queryPlayer } from "./__generated__/allPlayers";

export const ALL_PLAYERS_QUERY = gql`
  query allPlayers {
    queryPlayer {
      id
      name
      position
      country {
        name
      }
      club {
        name
      }
    }
  }
`;

export default function PlayersList() {
  const [filterLoading, setFilterLoading] = useState(false);
  const [filteredPlayers, setFilteredPlayers] = useState<
    allPlayers_queryPlayer[]
  >();

  const { loading: allPlayersLoading, error, data } = useQuery<allPlayers>(
    ALL_PLAYERS_QUERY
  );

  if (error) {
    return <div>Error!</div>;
  }

  const allPlayers = data?.queryPlayer ? data.queryPlayer.filter(notEmpty) : [];
  const players = filteredPlayers || allPlayers;

  const loading = filterLoading || allPlayersLoading;

  return (
    <div className="mt-8 w-full">
      <PlayerFilter
        allPlayers={allPlayers}
        onFilter={setFilteredPlayers}
        onLoading={setFilterLoading}
      />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
        {loading && <div>Loading...</div>}
        {!loading &&
          players.map((player) => (
            <div className="border rounded shadow p-4" key={player.id}>
              <div className="flex flex-col">
                <div className="text-2xl font-bold mb-4 text-gray-800">
                  {player.name}
                </div>
                <div className="text-gray-500">{player.club?.name}</div>
                <p className="text-gray-500 text-sm">
                  Position - {player.position}
                  <br />
                  Country - {player.country?.name}
                </p>
              </div>
            </div>
          ))}
        {!loading && players.length === 0 && <div>No players</div>}
      </div>
    </div>
  );
}

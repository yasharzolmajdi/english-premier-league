import { useState, useCallback, useEffect } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

import Autocomplete from "@components/Autocomplete";
import Input from "@components/Input";
import notEmpty from "@helpers/notEmpty";
import { allCountries } from "./__generated__/allCountries";
import { allClubs } from "./__generated__/allClubs";
import {
  filterPlayers,
  filterPlayersVariables,
  filterPlayers_queryPlayer,
} from "./__generated__/filterPlayers";

export const ALL_COUNTRIES_QUERY = gql`
  query allCountries {
    queryCountry {
      id
      name
    }
  }
`;

export const ALL_CLUBS_QUERY = gql`
  query allClubs {
    queryClub {
      id
      name
    }
  }
`;

export const FILTER_PLAYERS_QUERY = gql`
  query filterPlayers(
    $filter: PlayerFilter
    $countryID: [ID!]
    $clubID: [ID!]
  ) {
    queryPlayer(filter: $filter) @cascade {
      id
      name
      position
      country(filter: { id: $countryID }) {
        name
      }
      club(filter: { id: $clubID }) {
        name
      }
    }
  }
`;

export interface FilterForm {
  countryId: string;
  clubId: string;
  playerName: string;
}

export const FILTER_FORM_DEFAULT: FilterForm = {
  countryId: "",
  clubId: "",
  playerName: "",
};

export interface PlayerFilterProps<T> {
  allPlayers: T[];
  onFilter: (filteredPlayers?: filterPlayers_queryPlayer[]) => void;
  onLoading?: (isLoading: boolean) => void;
}

export default function PlayerFilter<T>({
  onFilter,
  allPlayers,
  onLoading,
}: PlayerFilterProps<T>) {
  const [filter, setFilter] = useState<FilterForm>(FILTER_FORM_DEFAULT);
  const [submitted, setSubmitted] = useState(false);
  const [companySearch, setCompanySearch] = useState("");
  const [clubSearch, setClubSearch] = useState("");

  const {
    loading: loadingCountries,
    error: errCountries,
    data: dataCountries,
  } = useQuery<allCountries>(ALL_COUNTRIES_QUERY);
  const {
    loading: loadingClubs,
    error: errClubs,
    data: dataClubs,
  } = useQuery<allClubs>(ALL_CLUBS_QUERY);
  const [
    getFilteredPlayers,
    { loading: filterLoading, data: filteredPlayers, error: filterError },
  ] = useLazyQuery<filterPlayers, filterPlayersVariables>(
    FILTER_PLAYERS_QUERY,
    {
      onCompleted: (data) => {
        if (data.queryPlayer === null) {
          onFilter([]);
          return;
        }

        const queryPlayer = data.queryPlayer.filter(notEmpty);
        onFilter(queryPlayer);
      },
    }
  );

  const onFilterUpdate = useCallback(
    (field: keyof FilterForm, value?: string) => {
      setFilter((state) => ({ ...state, [field]: value }));
    },
    []
  );

  const search = useCallback(() => {
    let variables: filterPlayersVariables = {};

    if (filter.countryId) {
      variables.countryID = [filter.countryId];
    }

    if (filter.clubId) {
      variables.clubID = [filter.clubId];
    }

    if (filter.playerName) {
      variables.filter = {
        name: {
          anyoftext: filter.playerName,
        },
      };
    }

    getFilteredPlayers({
      variables: { ...variables },
    });
  }, [getFilteredPlayers, filter]);

  const clearFilter = useCallback(() => {
    setFilter(FILTER_FORM_DEFAULT);
    setSubmitted(false);
    onFilter(undefined);
    setCompanySearch("");
    setClubSearch("");
  }, []);

  useEffect(() => onLoading && onLoading(filterLoading), [
    onLoading,
    filterLoading,
  ]);

  if (errCountries || errClubs || filterError) {
    return <div>Error!</div>;
  }

  if (loadingCountries || loadingClubs) {
    return <div>Loading...</div>;
  }

  if (!dataCountries?.queryCountry || !dataClubs?.queryClub) {
    return <div>No data</div>;
  }

  const queryCountry = dataCountries.queryCountry.filter(notEmpty);
  const queryClub = dataClubs.queryClub.filter(notEmpty);

  return (
    <div>
      <form
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
          search();
        }}
      >
        <Autocomplete
          id="countries"
          placeholder="Country"
          options={queryCountry}
          optionLabel="name"
          onSelect={(option) => onFilterUpdate("countryId", option?.id)}
          search={companySearch}
          onSearchChange={setCompanySearch}
        />
        <Autocomplete
          id="clubs"
          placeholder="Club"
          options={queryClub}
          optionLabel="name"
          onSelect={(option) => onFilterUpdate("clubId", option?.id)}
          search={clubSearch}
          onSearchChange={setClubSearch}
        />
        <Input
          id="playerName"
          placeholder="Player name"
          onChange={(event) => onFilterUpdate("playerName", event.target.value)}
          value={filter.playerName}
        />
        <button
          type="submit"
          className="w-full justify-center inline-flex items-center px-2.5 py-1.5 h-8 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </form>
      {submitted && !filterLoading && (
        <div className="mt-2 text-xs flex space-x-1">
          <div className="text-red-500">
            Showing {filteredPlayers?.queryPlayer?.length} of{" "}
            {allPlayers.length}
          </div>
          <div
            className="text-indigo-600 hover:text-indigo-900"
            onClick={clearFilter}
          >
            Clear search
          </div>
        </div>
      )}
    </div>
  );
}

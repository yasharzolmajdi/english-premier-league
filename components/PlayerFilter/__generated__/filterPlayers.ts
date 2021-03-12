/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlayerFilter, Position } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: filterPlayers
// ====================================================

export interface filterPlayers_queryPlayer_country {
  __typename: "Country";
  name: string;
}

export interface filterPlayers_queryPlayer_club {
  __typename: "Club";
  name: string;
}

export interface filterPlayers_queryPlayer {
  __typename: "Player";
  id: string;
  name: string;
  position: Position | null;
  country: filterPlayers_queryPlayer_country | null;
  club: filterPlayers_queryPlayer_club | null;
}

export interface filterPlayers {
  queryPlayer: (filterPlayers_queryPlayer | null)[] | null;
}

export interface filterPlayersVariables {
  filter?: PlayerFilter | null;
  countryID?: string[] | null;
  clubID?: string[] | null;
}

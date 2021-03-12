/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Position } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: allPlayers
// ====================================================

export interface allPlayers_queryPlayer_country {
  __typename: "Country";
  name: string;
}

export interface allPlayers_queryPlayer_club {
  __typename: "Club";
  name: string;
}

export interface allPlayers_queryPlayer {
  __typename: "Player";
  id: string;
  name: string;
  position: Position | null;
  country: allPlayers_queryPlayer_country | null;
  club: allPlayers_queryPlayer_club | null;
}

export interface allPlayers {
  queryPlayer: (allPlayers_queryPlayer | null)[] | null;
}

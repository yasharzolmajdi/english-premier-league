/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum PlayerHasFilter {
  club = "club",
  country = "country",
  name = "name",
  overall = "overall",
  position = "position",
}

export enum Position {
  CB = "CB",
  CF = "CF",
  CM = "CM",
  DM = "DM",
  GK = "GK",
  LB = "LB",
  LM = "LM",
  RB = "RB",
  RM = "RM",
  ST = "ST",
}

export interface PlayerFilter {
  id?: string[] | null;
  name?: StringFullTextFilter | null;
  position?: Position_hash | null;
  has?: PlayerHasFilter | null;
  and?: (PlayerFilter | null)[] | null;
  or?: (PlayerFilter | null)[] | null;
  not?: PlayerFilter | null;
}

export interface Position_hash {
  eq?: Position | null;
  in?: (Position | null)[] | null;
}

export interface StringFullTextFilter {
  alloftext?: string | null;
  anyoftext?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================

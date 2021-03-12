/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allClubs
// ====================================================

export interface allClubs_queryClub {
  __typename: "Club";
  id: string;
  name: string;
}

export interface allClubs {
  queryClub: (allClubs_queryClub | null)[] | null;
}

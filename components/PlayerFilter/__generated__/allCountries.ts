/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allCountries
// ====================================================

export interface allCountries_queryCountry {
  __typename: "Country";
  id: string;
  name: string;
}

export interface allCountries {
  queryCountry: (allCountries_queryCountry | null)[] | null;
}

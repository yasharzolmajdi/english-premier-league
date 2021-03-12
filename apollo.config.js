module.exports = {
  client: {
    excludes: [],
    addTypename: true,
    includes: ["./**/*.tsx"],
    service: {
      name: "api",
      url: "https://decisive-pot.us-west-2.aws.cloud.dgraph.io/graphql",
    },
  },
};

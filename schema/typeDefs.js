import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String! # should not allow null in response 
  }

  type Ratings {
    user_id: ID!
    rating: String!
  }

  type Query {
    getUsers: [User],
    getUser (id: ID!): User,
    getUserRatings(userId: ID!)  :[Ratings]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(id: ID!, name: String!, email: String!): User
  }
`;

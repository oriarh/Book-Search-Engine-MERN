import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getUser {
    User {
      _id: ID
      username: String
      email: String
      bookcount: Int
      savedBooks: [Book]
    }
  }
  `;


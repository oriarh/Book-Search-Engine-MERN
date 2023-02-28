import { gql } from '@apollo/client';

export const GET_ME = gql`
query getUser {
  me {
    _id
    bookcount
    email
    savedBooks {
      title
      link
      image
      description
      bookId
      authors
    }
    username
  }
}
  `;


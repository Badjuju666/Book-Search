import gql from 'graphql-tag';


export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      urFavBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;


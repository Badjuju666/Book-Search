import gql from 'graphql-tag';

export const SEE_ME = gql`
{
  me {
      _id
      username
      email
      bookCount
      urFavBooks {
        # _id
        bookId
        authors
        image
        link
        title
        description
    }
  }
`;


import gql from 'graphql-tag';

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!) {
  addUser(username: $username, password: $password, email: $email) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const FAV_BOOK = gql`
mutation favBook($bookData: BookInfo!) {
  favBook(bookData: $bookData)
    {
      _id
      username
      email
      bookCount
      urFavBooks{
          # _id
          bookId
          authors
          image
          link
          title
          description
      }
    }
  }
`;

export const DUMP_BOOK = gql`
mutation dumpBook($bookId: ID!) {
    dumpBook(bookId: $bookId) {
            _id
            username
            email
            bookCount
            urFavBooks{
                # _id
                bookId
                authors
                image
                link
                title
                description
            }
        }
}
`;
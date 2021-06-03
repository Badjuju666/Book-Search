import gql from 'graphql-tag';

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!) {
  addUser(username: $username, password: $password, email: $email) {
    
    user {
      _id
      username
      email
      bookCount
      urFavBooks{
        authors
        bookId
        image
        link
        title
        description
      }
    }
    token
  }
}
`;

export const FAV_BOOK = gql`
mutation favBook($input: savedBook!) {
  favBook (input: $input)
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
mutation dumpBook($bookId: String!) {
    dumpBook(bookId:$bookId) {
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
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
        user {
        _id
        username
        email
        bookCount
        urFavBooks {
            _id
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
  mutation saveBook($description: String!) {
    saveBook(description: $description) {
      _id
      bookId
      authors
      description
      title
      image
      link
      bookCount
      urFavBooks {
          _id
      }
      
    }
  }
`;

export const DUMP_BOOK = gql`
mutation dumpBook($bookId: String!) {
    dumpBook(bookId:$bookId) {
        bookId
    }
}
`;
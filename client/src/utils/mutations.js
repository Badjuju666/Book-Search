import gql from 'graphql-tag';


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
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
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation savedBook( $bookData: bookInput! ) {
    savedBook(bookData: $bookData) {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }

  }

`
;


export const REMOVE_BOOK = gql`
  mutation removedBook( $bookId: ID! ) {
      removedBook(bookId: $bookId) {
        _id
        username
        email
        savedBook {
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
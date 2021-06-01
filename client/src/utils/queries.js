import gql from 'graphql-tag';

export const GET_ME = gql`

{
    me {
        _id
        username
        email
        bookCount
        books {
            _id
            authors
            bookIdimage
            link
            title
            description
        }
    }
}
`;

export const QEURY_BOOKS = gql`
 query books($authors: String, $description: String!, $bookId: String, $image: String, $link: String) {
    books(authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link) {
        _id
        author
        bookId
        image
        link
        title
        description
    }
  }
`;

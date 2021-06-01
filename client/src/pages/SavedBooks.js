import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/react-hooks';
import Auth from '../utils/auth';
import { dumpBookId } from '../utils/localStorage';
import { DUMP_BOOK } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

const FavoriteBooks = () => {
  // const [userData, setUserData] = useState({});
  const { loading, data } = useQuery(QUERY_ME);
  // eslint-disable-next-line
  const [dumpBook, { error }] = useMutation(DUMP_BOOK);

  const userData = data?.me || {};

  
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // eslint-disable-next-line
      const { data } = await dumpBook({
        variables: { bookId },
      });

      dumpBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  }; 

  
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.urFavBooks.length
            ? `Viewing ${userData.urFavBooks.length} saved ${userData.urFavBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.urFavBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default FavoriteBooks;

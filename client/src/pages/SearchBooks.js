import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchGoogleBooks } from '../utils/API';
import { useMutation } from '@apollo/react-hooks';
import { SAVE_BOOK } from '../utils/mutations';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

const SearchBooks = () => {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  // create state to hold call to action message
  const [message, setMessage] = useState('Search for a book to begin')
  // saveBook Mutation
  const [saveBook, { error }] = useMutation(SAVE_BOOK);

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        setMessage('No books found. Try another search')
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      let uniqueItems = [];
      let ids = []

      for (let i = 0; i < items.length; i++) {
        if (!ids.includes(items[i].id)) {
          uniqueItems.push(items[i]);
        }
        
        ids.push(items[i].id);
      }

      if (!uniqueItems) {
        setMessage('No books found. Try another search')
        setSearchedBooks([]);
      } else {
        const bookData = uniqueItems.map(({ id, volumeInfo, saleInfo, accessInfo }) => ({
          bookId: id,
          authors: volumeInfo.authors || ['No author to display'],
          title: volumeInfo.title || '',
          description: volumeInfo.description || `published: ${volumeInfo.publishedDate}, ${volumeInfo.publisher}. Tags: ${volumeInfo.categories ? volumeInfo.categories : 'none'}.` || '',
          image: volumeInfo.imageLinks?.thumbnail || '',
          link: saleInfo.buyLink || accessInfo.webReaderLink
        }));

        setSearchedBooks(bookData);
        setSearchInput('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (bookId) => {
  
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveBook({
        variables: {
          input: { ...bookToSave }
        }
      });

      if (error) {
        throw new Error('something went wrong!');
      }

  
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : message}
        </h2>
        <CardColumns>
          {searchedBooks && searchedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title><a target="_blank" rel="noreferrer" href={book.link}>{book.title}</a></Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(book.bookId)}>
                      {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                        ? 'Already saved!'
                        : 'Save this Book!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchBooks;

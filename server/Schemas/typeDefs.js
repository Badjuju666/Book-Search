const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Auth {
        token: ID!
        user: User
    }
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        urFavBooks: [Book]
    }
    type Query {
        me: User
    }
    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    input bookInfo {
        author: [String]
        description: String
        title: String
        bookId: String
        image: String
        link: String
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: bookInfo): User
        dumpBook(bookId: String!): User
    }
`;

module.exports = typeDefs;
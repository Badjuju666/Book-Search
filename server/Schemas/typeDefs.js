const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Auth {
        token: ID!
        user: User
    }
    type User {
        _id: ID!
        username: String!
        email: String
        bookCount: Int
        urFavBooks: [Book]
    }
    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String!
        image: String
        link: String
    }
    input BookInfo {
        author: [String]
        description: String
        title: String
        bookId: String
        image: String
        link: String
    }
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        favBook(input: BookInfo): User
        dumpBook(bookId: String!): User
    }
`;

module.exports = typeDefs;
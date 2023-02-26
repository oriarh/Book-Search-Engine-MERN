const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    
    type User {
        _id: ID
        username: String
        email: String
        bookcount: Int
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    input saveBookData {
        authors: [String]
        description: String
        title: String
        bookId: Int
        image: String
        link: String
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookId: String, authors: [String], description: String, title: String, image: String, link: String): User
        removeBook(bookId: String): User
    }
`;

module.exports = typeDefs;
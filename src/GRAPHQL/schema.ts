import { gql } from "apollo-server";

export const typeDefs = gql`

type User {
    _id: ID!
    email: String!
    contacts: [Contact!]!
}

type Contact {
    _id: ID!
    name: String!
    lastname: String!
    telefono: String!
    Country: String!
    timeCountry: String!
}

type Query {
    me: User

    getContacts(page: Int, size: Int): [Contact!]!
    getContact(id: ID!): Contact
}

type Mutation {
    register: (email: String!, password: String!): String!
    login (email: String!, password: String!): String!

    addContact(name: String!, lastname: String!, telefono: String!): Contact!
    updateContact(_id: ID!, name: String, lastname: String, telefono: String): Contact!
    deleteContact(_id: ID!): Boolean!
}

`;
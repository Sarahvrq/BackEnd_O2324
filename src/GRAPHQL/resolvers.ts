import { ObjectId } from "mongodb";
import { getDB } from "../DB/mongo"
import { IResolvers } from "@graphql-tools/utils";
import { signToken } from "../auth";
import { USER_COLLECTION } from "../utils";
import { CONTACTS_COLLECTION } from "../utils";
import { createContact, FindOneContact, getContacts } from "../COLLECTIONS/Contacts";
import { createUserAKAregister, validateUserAKAlogin } from "../COLLECTIONS/Users";

export const resolvers: IResolvers = {

    Query: {
        me: async (_,__,{user})=>{
            if(!user) throw new Error ("Login necesario");
            return {_id: user._id.toString(), ...user}
        },

        getContacts: async(_,{page,size})=>{
            return await getContacts(page,size);
        },

        getContact: async(_,{id})=>{
            return await FindOneContact(id);
        }
    },

    Mutation: {
        register: async(_,{email, password})=>{
            const UserId = await createUserAKAregister(email, password);
            return signToken(UserId);
        },

        login: async(_, {email, password})=>{
            const user = await validateUserAKAlogin(email,password);
            if(!user) throw new Error ("ERROR: Credenciales Incorrectos");
            return signToken(user._id.toString())
        },

        addContact: async(_,{name, lastname, telefono, country}, {user})=>{
            if(!user) throw new Error ("ERROR: Necesitas estar logeado para crear contacto");
            return await createContact(name, lastname, telefono, country);
        },

        updateContact: async(_,{name, lastname, telefono, country}, {user})=>{
             if(!user) throw new Error ("ERROR: Necesitas estar logeado para update contacto");
            return await 
        },

        deleteContact: async()=>{

        }
    },

    User: {

    }
};
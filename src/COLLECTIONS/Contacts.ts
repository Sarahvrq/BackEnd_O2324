import { getDB } from "../DB/mongo"
import bcrypt from "bcryptjs" //importante para encriptar (y no desenctriptar)
import { CONTACTS_COLLECTION } from "../utils";
//import { getYPorID } from "./Y"; //para usar funciones de otra coleccion
import { ObjectId } from "mongodb";

export const getContacts = async (page?: number, size?: number) => {
    const db = getDB();
        page = page || 1; //es lo mismo que decir const new page = page || 1, pero evitamos declarar nuevas variables
        size = size || 10; 

    const result = await db.collection(CONTACTS_COLLECTION).find().skip((page-1)*size).limit(size).toArray();

    return result;

};

export const FindOneContact = async (user_id: ObjectId) => {
    const db = getDB();
    const contacto = await db.collection(CONTACTS_COLLECTION).findOne({_id: new ObjectId(user_id)});
    if(!contacto) throw new Error ("Contacto no existe");

    return contacto;
};

export const VerificarTelefBD = async (telefono: string) => {
    const db = getDB();
    const result = await db.collection(CONTACTS_COLLECTION).find({telefono});
    if(result) throw new Error ("Contacto con ese telefono ya existe");

    return result;
};

export const createContact = async (name: string, lastname: string, telefono: string, country: string) => {
    const db = getDB();
    const verificar = await VerificarTelefBD(telefono);
    const result = await db.collection(CONTACTS_COLLECTION).insertOne({name, lastname, telefono, country});
    
    const newContact = await FindOneContact(result.insertedId);
    if(newContact)
        
    return newContact;
};

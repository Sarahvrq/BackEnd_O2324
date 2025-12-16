import { ObjectId } from "mongodb"

export type Contacts = {

    _id: ObjectId;
    name: String;
    lastname: String;
    telefono: String;
    country: String;
    
};
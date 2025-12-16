import { getDB } from "../DB/mongo"
import bcrypt from "bcryptjs" //importante para encriptar (y no desenctriptar)
import { USER_COLLECTION } from "../utils";
//import { getYPorID } from "./Y"; //para usar funciones de otra coleccion
import { Db, ObjectId } from "mongodb";

export const createUserAKAregister = async (email: string, password: string) => {
    const db = getDB();
    const passEncrypt = await bcrypt.hash(password, 10);
    const result = await db.collection(USER_COLLECTION).insertOne({email, passwordL: passEncrypt});

    return result.insertedId.toString();
};

export const validateUserAKAlogin = async (email: string, password: string) => {
    const db = getDB();
    const user = await db.collection(USER_COLLECTION).findOne({email});
    if(!user) throw new Error ("ERROR: User with that email does not exist");

    const passVerif = await bcrypt.compare(password, user.password);
    if (!passVerif) throw new Error ("ERROR: User password incorrect");

    return user;

};

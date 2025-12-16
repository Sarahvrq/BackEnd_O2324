import { getDB } from "../DB/mongo"
import bcrypt from "bcryptjs" //importante para encriptar (y no desenctriptar)
import { CONTACTS_COLLECTION } from "../utils";
//import { getYPorID } from "./Y"; //para usar funciones de otra coleccion
import { ObjectId } from "mongodb";
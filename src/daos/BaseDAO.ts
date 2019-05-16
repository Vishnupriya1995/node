import { Repository, ObjectLiteral } from "typeorm";
import Products from "../entities/Products"

export abstract class BaseDAO<T> extends Repository<T>{ 
    
    abstract getRepository():Repository<T>;
    
}
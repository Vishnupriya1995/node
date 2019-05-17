import { BaseDAO } from "./BaseDAO";
import User from "../entities/User";
import { getRepository } from "typeorm";

export default class UserDAO extends BaseDAO<User>{

    getRepository(){
        return getRepository(User);
    }

}
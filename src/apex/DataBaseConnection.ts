import { createConnection, Connection } from "typeorm";
import { log } from "../logger/logger";
import path from "path";
import Products  from "../entities/Products"


export  default class ConnectToDB{
    
    public static local:any={
        name: "default",
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "local",
        logging: true,
        synchronize: false,
        entities: [path.dirname(__dirname)+"/entities/**/*{.ts,.js}"]
    };

     
    
}
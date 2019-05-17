import UserDAO from "../daos/UserDAO";
import User from "../entities/User";
import bcryptjs from "bcryptjs";
import {log} from "../logger/logger"
import { JwtUtil } from "../utils/Jwt";

export  default class Authservice{
    private userDao:UserDAO;
    public sessionInfo: any;
    constructor(){
        this.userDao=new UserDAO();
    }

    createUser(userdata:any){  
        userdata.password=bcryptjs.hashSync(userdata.password,10)
        let res=this.userDao.getRepository().create(userdata);        
        log.info(res)
        return this.userDao.getRepository().save(res); 
    }

    async signin(data:any){
        let userAuthInfo= await this.getUser(data);
        return this.autenticateUser(userAuthInfo);
    }

    async getUser(data:any){
        let queryString={username:data.username};
        let user:User=await this.userDao.getRepository().findOne(queryString);        
        if (user == null) {
            return Promise.reject({ message: "Invalid Credientials" });
        } else {
            let passcompare=bcryptjs.compareSync(data.password,user.password)            
            return {userdetails:user,autentication:passcompare};
        }
    }
    async autenticateUser(userAuthInfo:any){
        let responsedata:any={};
        if(userAuthInfo.autentication && userAuthInfo.userdetails.status==="active"){
            responsedata["access_token"]=await JwtUtil.EncodeJWT({ identity:  userAuthInfo.userdetails });
            log.info("Access Token Generated .............................")
            return responsedata;        
        }else{
            return Promise.reject("Invalid Credentials")
        }
    }

}
import { Router,Request,Response } from "express";
import bcryptjs from "bcryptjs";

export default class AuthController{
    
    private router:any=Router();

    getRouter(){
        this.router.post("/signup", (req:Request,res:Response)=>{
            let bodyJson=req.body;
            let hashed=bcryptjs.hashSync(bodyJson.password,12);
            let pass=bcryptjs.compareSync(bodyJson.password,hashed)            
            console.log(hashed);
            console.log(pass);
            return res.send("sign up");
        });
        return this.router;
    }

}
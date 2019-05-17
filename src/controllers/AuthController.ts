import { Router,Request,Response } from "express";
import bcryptjs from "bcryptjs";
import {check,validationResult} from "express-validator/check"
import Authservice from "../services/AuthService";

export default class AuthController{

    private router:any;
    private authservice:Authservice;
    constructor(){
        this.router=Router();
        this.authservice=new Authservice();
    }

    getRouter(){
        this.router.post("/signup", this.validation() ,(req:Request,res:Response)=>{        
            let errors=validationResult(req);
            if(errors.array().length>0){
                return res.send(errors.array())
            };
            console.log("==============")
            let result=this.authservice.createUser(req.body);
            return res.send(result);
        });
        this.router.post("/signin",async (request:Request,response:Response)=>{
            let reqData: any = request.body;
            let sessionInfo: any = {};
            let result: any = null;
            if (reqData) {
                this.authservice.sessionInfo = sessionInfo;
                result = await this.authservice.signin(reqData);
            } else {
                result = { message: "Invalid Data" };
            }
            return response.send(result)
        })
        return this.router;
    }
    validation():any{
        return [ check('username', 'Your user is not valid').not().isEmpty(),
                 check('password', 'Your password is not valid').not().isEmpty().isLength({min:6,max:10}),
                 check('email',"not valid email").not().isEmpty().isEmail()                                
                ];        
    }
    
}
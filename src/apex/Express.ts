import express, { response } from 'express';
import AppRouter from "./Router";
import { json } from "body-parser";
import expressValidator from "express-validator"
import {log} from "../logger/logger"
import { JwtUtil } from '../utils/Jwt';


export default class Express{
    public expressobj:any;
    public router:any;

    constructor(){
        this.expressobj=express();  
        this.expressobj.use(json()); 
        this.expressobj.use(expressValidator())
        this.getRouting();     
        this.chunkDataHandle();   
    }
    async getRouting(){
           
        let appRouteObj=new AppRouter();
        let appRoute=await appRouteObj.getRouter();
        let paths=appRouteObj.getAllPaths();
        this.expressobj.use("", appRoute );
        this.expressobj.get("/",async function(req:any,res:any){
            let string ="welcom <br/>";
            for(let pathIndex in paths){
                string +="<br/><a href="+paths[pathIndex]+">"+paths[pathIndex]+"</a>";
            }
            res.send(string)
        }); 
    }
    private chunkDataHandle(){
        this.expressobj.all("*",(req:express.Request,res:express.Response,next:any)=>{
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
            res.setHeader("Access-Control-Allow-Headers", "accept, Content-Type, Authorization");
            if (req.headers["content-type"] && req.headers["content-type"].indexOf("application/x-www-form-urlencoded") > -1) {
                this.parsePost(req, (data: any) => {
                    if (data && data != "") {
                        req.body = data;
                    }
                    this.addSessionInfo(req);
                    next();
                });
            } else {
                this.addSessionInfo(req);
               next(); 
            }
        })
    }

    private parsePost(req: express.Request, callback: any) {
        var data = "";
        req.on("data", chunk => {
            data += chunk;
        });
        req.on("end", () => {
            if (data != "") {
                data = JSON.parse(data);
            }
            callback(data);
        });
    }

    private addSessionInfo = (req: any) => {
        console.log("header--------------->",req.headers["authorization"])
        let sessionInfo = JwtUtil.DecodeJWT(req.headers["authorization"]);
        log.info("-----------------------------------------------------");
        log.info("sessionInfo: ");
        log.info(sessionInfo);
        log.info("-----------------------------------------------------");
        if (!req.body) {
            req.body = {};
        }
        if (sessionInfo) {
            req.body.sessionInfo = sessionInfo.identity;
        }
        console.log("========================>",req.body.sessionInfo)
    };

}
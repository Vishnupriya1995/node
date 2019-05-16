import express, { response } from 'express';
import AppRouter from "./Router";
import { json } from "body-parser";


export default class Express{
    public expressobj:any;
    public router:any;

    constructor(){
        this.expressobj=express();  
        this.expressobj.use(json()); 
        this.getRouting();        
    }
    async getRouting(){
           
        let appRouteObj=new AppRouter();
        let appRoute=await appRouteObj.getRouter();
        //console.log(appRoute)
        let paths=appRouteObj.getAllPaths();
        //console.log(paths)
        this.expressobj.use("", appRoute );
        this.expressobj.get("/",async function(req:any,res:any){
            let string ="welcom <br/>";
            for(let pathIndex in paths){
                string +="<br/><a href="+paths[pathIndex]+">"+paths[pathIndex]+"</a>";
            }
            res.send(string)
        }); 
    }

}
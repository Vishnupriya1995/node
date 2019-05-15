import { Router } from "express";

export default class MainController{
    private router:any =Router();
    getRouter():Router{
        this.router.get("/",function(req:any,res:any){
            console.log("GET IN MAIN")
            res.send("You Are At Main root");
        });
        
        this.router.get("/one",function(req:any,res:any){
            console.log("main get");
            res.send("main get")
        })

        return this.router;
    }
}
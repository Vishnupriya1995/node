import Router from "express" ;
import * as fs from "fs"; 
import MainController from "../controllers/MainController";

 export default class AppRouter{
     private router :any;
     private routes:any;
     private allPaths:string[]=[];
     constructor(){
        this.router=Router();
     }
     async getRouter() {
        this.routes=fs.readdirSync(`${__dirname}/../controllers`);        
        let route: any;
        for (route of this.routes) {
            route = route.slice(0, -3);
            let path = `/${route.replace("Controller", "").toLowerCase()}`;
            let action = `${__dirname}/../controllers/${route}`;
            var ns = await import(action); 
            this.router.use(path, new ns.default().getRouter());
            this.allPaths.push(path);
        }
        
        return this.router;
    }
    getAllPaths():string[]{
        return this.allPaths;
    }

 }
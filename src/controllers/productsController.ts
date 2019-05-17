import { Router,Request,Response } from "express";
import ProductService from "../services/ProductService";
import NodeCacheService from "../apex/NodeCache"
import { UserAccess } from "../utils/UserAccess";

export default class ProductsController{
    private router:any =Router();    
    private productsService:ProductService;
   // private cahce:NodeCacheService;
   
    constructor(){
        this.productsService=new ProductService();
    }
    getRouter():Router{
        this.router.get("/",async (request:Request,response:Response)=>{  
            let url=request.originalUrl;
            let re=await NodeCacheService.get(url);
            this.productsService.sessionInfo=request.body.sessionInfo;            
            if(re==undefined){
                let access=UserAccess.validate(this.productsService.sessionInfo,"Products","Read");
                let all:any;
                if(access){
                    all=await this.productsService.getAllProducts();
                }else{
                    throw this.productsService.sessionInfo ? this.productsService.sessionInfo : { message: "Please Enter The Token" }
                }                
                NodeCacheService.set(url,all);
                re=all;
            }else{
                console.log("cahed data");                
            }                   
            return response.send(re);
        });
        this.router.get("/findbyid",async (request:Request,response:Response)=>{             
            let filterObj=request.query.id;
            this.productsService.sessionInfo=request.body.sessionInfo;
            let access=UserAccess.validate(this.productsService.sessionInfo,"Products","Read");
            let result:any;
            if(access){
                result=await this.productsService.getProductById(filterObj);
            }else{
                throw this.productsService.sessionInfo ? this.productsService.sessionInfo : { message: "Please Enter The Token" }
            }
            
            return response.send(result);
        });
        this.router.get("/orderbyid",async (request:Request,response:Response)=>{
            let result=await this.productsService.getProductsOrderById();            
            return response.send(result)
        });             

        return this.router;
    }
}
import { Router,Request,Response } from "express";
import ProductService from "../services/ProductService";
import NodeCacheService from "../apex/NodeCache"

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
            if(re==undefined){
                let all=await this.productsService.getAllProducts();
                NodeCacheService.set(url,all);
                re=all;
            }else{
                console.log("cahed data");                
            }
            
            return response.send(re);
        });
        this.router.get("/findbyid",async (request:Request,response:Response)=>{
            console.log("",request.originalUrl)   
            let filterObj=request.query.id;console.log(request.query)
            let result=await this.productsService.getProductById(filterObj);
            return response.send(result);
        });
        this.router.get("/orderbyid",async (request:Request,response:Response)=>{
            let result=await this.productsService.getProductsOrderById();            
            return response.send(result)
        });             

        return this.router;
    }
}
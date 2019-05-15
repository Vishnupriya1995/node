import { getRepository,Repository } from "typeorm";
import  Products from "../entities/Products"


export  class  ProductsDAO{
    private dao:Repository<Products>;

    constructor() {
       this.dao = getRepository(Products);
    }
    async findAll(){
        let result= this.dao
        .createQueryBuilder("products")
        .innerJoinAndSelect("products.canImages", "canImageIDS")
        .orderBy("products.id")    
        .getMany();
        return result;
    }
    async findByOne(filter:any){        
        return await this.dao.findOne(filter);      
    }
    async findByOrder(){
       return await this.dao.createQueryBuilder("Products")
       .select("Products")
       .orderBy("Products.id")
       .take(10)
       .getMany();
    }

    getDAO():Repository<Products>{
        return this.dao;
    }


}
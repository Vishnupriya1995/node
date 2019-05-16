import { BaseDAO } from "./BaseDAO";
import Products from "../entities/Products";
import { getRepository } from "typeorm";

export default class ProductsDAO extends BaseDAO<Products>{
    
    getRepository(){
        return getRepository(Products);
    }

    async findAll(){
        let result= this.getRepository()
        .createQueryBuilder("products")
        .innerJoinAndSelect("products.canImages", "canImageIDS")
        .orderBy("products.id")    
        .getMany();
        return result;
    }

    async findByOrder(){
        return await this.getRepository()
        .createQueryBuilder("Products")
        .select("Products")
        .orderBy("Products.id")
        .take(10)
        .getMany();
     }
}
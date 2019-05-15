import {ProductsDAO} from "../daos/ProductDAO";
import { log } from "../logger/logger";

export default class ProductService{
    private productDAO :ProductsDAO;
    constructor(){
        this.productDAO=new ProductsDAO();
    }

    async getAllProducts(){
        let result=await this.productDAO.findAll();
        return result;
    }
    async getProductById(filter:any){        
        return await this.productDAO.findByOne(filter);
    }
    async getProductsOrderById(){
        return await this.productDAO.findByOrder();
    }
}
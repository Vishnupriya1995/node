import ProductsDAO from "../daos/ProductsDAO";
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
        
        return await this.productDAO.getRepository().findOne(filter);
    }
    async getProductsOrderById(){
        return await this.productDAO.findByOrder();
    }
}
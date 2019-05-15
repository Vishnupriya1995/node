import NodeCache from "node-cache";

export default class NodeCacheService{
   // private cacheServie:NodeCacheService=new NodeCacheService();
   private static nodeCache=new NodeCache({ checkperiod: 30000, useClones: false });
    
    static async get(url:any){
        let res=this.nodeCache.get(url);        
        return res;
    }

    static set(url:any,result:any){
        //console.log("serviece---------------------",this.nodeCache.get)
        this.nodeCache.set(url,result);
       // console.log(this.get(url)) 
    }
}
import NodeCache from "node-cache";

export default class NodeCacheService{
      
   private static nodeCache=new NodeCache({ checkperiod: 0, useClones: false });
    
    static async get(url:any){
        let res=this.nodeCache.get(url);        
        return res;
    }

    static set(url:any,result:any){        
        this.nodeCache.set(url,result);      
    }
}
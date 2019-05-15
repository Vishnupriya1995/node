import Express from './apex/Express';
import {log} from "./logger/logger";
import ConnectToDB from './apex/DataBaseConnection';
import { createConnection } from 'typeorm';




(async function(){   
    let conn=await createConnection(ConnectToDB.local);
    if(conn.isConnected){
        let obj=new Express();
        let app=obj.expressobj;
        app.listen(8080,function(){   
            console.log("*******************************************************************");
            log.info("logger started");
            console.log("\t\tlistening on http://localhst:8080")
        });
    }

})();


process.on("uncaughtException", function(err) {
    console.log("Caught exception: " + err);
});


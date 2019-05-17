import{log} from "../logger/logger"

export class UserAccess{
    public static validate(data: any, component: String, access: String){
        log.info(data);
        if (data) {
            if (data.name && data.message && data.name.lowercase().indexOf("error") > -1) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
}
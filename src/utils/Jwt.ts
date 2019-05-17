import jwt from "jsonwebtoken";

export class JwtUtil{

    public static DecodeJWT(token: any){
        if (token) {
            try {
                token = token.replace("Bearer ", "").replace("Bearer ", "");
                return jwt.verify(token, "SwanInfo");
            } catch (err) {
                return err;
            }
        } else {
            return null;
        }

    }
    public static EncodeJWT(data: any) {
        return jwt.sign(data, "SwanInfo");
    }
}
import {  ISignUser, IUser } from "../CTX/types";
import BaseHttpService from "./base-http.service";

export default class AuthService extends BaseHttpService{
    async signin(existingUser:ISignUser) {
        const {email, password}=existingUser;
        const result = await this.post(`auth/signin`, { email, password });
        if (result) {
          const accessToken = result.data.accessToken;
          this.saveToken(accessToken);
        }
        return result;
      }
    
      async signup(newUser:ISignUser) {
        return await this.post(`auth/signup`, { ...newUser });
      }
      async signInToken() {
        const res = await this.get(`auth/signInToken`);
        if (res && res.status === 200) {
          return res.data;
        } else {
          console.log(res)
        }
      }
    
      async signout() {
        this.removeToken();
      }
}
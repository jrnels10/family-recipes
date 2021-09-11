import axios from "axios";
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
        return result.status;
      }
    
      async signup(newUser:ISignUser) {
        return await this.post(`auth/signup`, { ...newUser });
      }
      async signInToken() {
       return await this.get(`auth/signInToken`);
      // const res= await axios.get('http://192.168.0.187:5000/');
      }
    
      async signout() {
        this.removeToken();
      }
}
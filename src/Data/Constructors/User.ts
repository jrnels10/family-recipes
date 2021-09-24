import AuthService from '../API/auth.service';
import { IUser } from '../CTX/types';

export class User {
    private _api: any;
    private _accessToken: string | undefined;
    private password?: string;
    public email: string;
    public validated: boolean = false;
    public firstName?: string;
    public lastName?: string;
    public isLoggedin: boolean = false;
    constructor(props: any) {
        this._api = new AuthService({ history: props.history, errorHandler: props.errorHandler })
        this.email = props.email;
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.password = props.password;
    }

    async signUp(setUser: any) {
        if (this.email && this.password) {
            const res = await this._api.signup(this);
            if (res.status === 201) {
                setUser(this);
                return true
            }
        }
        return false;
    };

    async checkToken(setUser: any) {
        const res = await this._api.signInToken();
        if (res.status === 200) {
            Object.assign(this, res.data);
            this.validated = true;
            this.isLoggedin = true;
        } else {
            this.validated = true;
        }
        return setUser(this);
    }
    async signIn() {
        await this._api.signin({ ...this });
        this.password=undefined;
        this.isLoggedin = true;
        this.validated = true;
        return true;
    };
    signOut() {
        this.isLoggedin = false;
        this._api.signout();
        return this.validated = true;
    }
};
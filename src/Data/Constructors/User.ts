import AuthService from '../API/auth.service';

export class User {
    private _api: any;
    private _accessToken: string | undefined;
    private password?: string;
    public email: string;
    public firstName?: string;
    public lastName?: string;
    public isLoggedin: boolean;
    constructor(props: any) {
        this._api = new AuthService({ history: props.history, errorHandler: props.errorHandler })
        this.email = props.email;
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.password = props.password;
        this.isLoggedin = props.isLoggedin;
    }

    async signUp() {
        const res = await this._api.signup(this);
    };
    async checkToken(setUser: any) {
        const res = await this._api.signInToken();
        Object.assign(this, res);
        this.isLoggedin = true;
        setUser(this);
        return this;
    }
    async signIn() {
        const res = await this._api.signin({ ...this });
        debugger
        this.isLoggedin = true;
    };
    signOut() {
        this._api.signout();
    }
};
import axios from 'axios';
import { HTTP } from '@ionic-native/http';
import { isPlatform } from '@ionic/react';

interface ILogin {
    email: string,
    password: string
}

export default class BaseHttpService {
    BASE_URL = `http://192.168.0.195:5000`;//process.env.REACT_APP_API;
    _accessToken = null;
    history?: any;
    errorHandler?: any;
    base: any;
    constructor(props: { history: any; errorHandler: any; }) {
        this.base = isPlatform('ios') ? HTTP : axios;
        this.history = props.history;
        this.errorHandler = props.errorHandler;
        // this.connectionValidate()
    }

async connectionValidate(){
    const res = await axios.get('http://192.168.0.191:5000');
    console.log(res.data)
    // debugger
    return res
}

    iosHeaders = () => {
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.loadToken()
        }
    }
    async get(endpoint: any, options = {}) {
        Object.assign(options, this._getCommonOptions());
        // if (isPlatform('ios')) {
        //     try {
        //         const res = await this.base.get(`${this.BASE_URL}/${endpoint}`, {}, this.iosHeaders());
        //         res.data = JSON.parse(res.data)
        //         return res;
        //     } catch (error: any) {
        //         debugger
        //         // error.error = JSON.parse(error.error);
        //         this._handleIOSError(error);
        //     }
        // } else {
        return axios.get(`${this.BASE_URL}/${endpoint}`, { ...options })
            .catch((error: {} | undefined) => this._handleHttpError(error));
        // }
    }

    async post(endpoint: any, data: {}, options = {}) {
        Object.assign(options, this._getCommonOptions());
        return axios.post(`${this.BASE_URL}/${endpoint}`, data, options)
            .catch((error: {} | undefined) => this._handleHttpError(error));

    }

    async delete(endpoint: any, options = {}) {
        Object.assign(options, this._getCommonOptions());
        return axios.delete(`${this.BASE_URL}/${endpoint}`, options)
            .catch((error: {} | undefined) => this._handleHttpError(error));
    }

    async patch(endpoint = '', data = {}, options = {}) {
        Object.assign(options, this._getCommonOptions());
        return axios.patch(`${this.BASE_URL}/${endpoint}`, data, options)
            .catch((error: {} | undefined) => this._handleHttpError(error));
    }

    _handleIOSError(error: any) {
        if (error.status !== 401) {
            throw error;
        } else {
            this._handle401();
            if (this.errorHandler) {
                this.errorHandler(true);
            }
            throw error;
        }
    }
    _handleHttpError(error: any) {
        // debugger
        const { statusCode } = error.response.data;
        if (statusCode !== 401) {
            throw error;
        } else {
            this._handle401();
            if (this.errorHandler) {
                this.errorHandler(true);
            }
            return error.response.data
        }
    }

    _handle401() {
        // this.history.push('/login');
    }

    _getCommonOptions() {
        const token = this.loadToken();

        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }

    get accessToken() {
        return this._accessToken ? this._accessToken : this.loadToken();
    }

    saveToken(accessToken: string) {
        //this._accessToken = accessToken;
        return localStorage.setItem('accessToken', accessToken);
    }

    loadToken() {
        const token = localStorage.getItem('accessToken');
        // this._accessToken = token;
        return token;
    }

    removeToken() {
        localStorage.removeItem('accessToken');
    }
}

function err(err: any, arg1: (any: any) => void) {
    throw new Error('Function not implemented.');
}


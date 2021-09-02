import axios from 'axios';


export default class BaseHttpService {
    BASE_URL = 'http://localhost:5000';//process.env.REACT_APP_API;
    _accessToken = null;
    history?: any;
    errorHandler?: any;
    constructor(props: { history: any; errorHandler: any; }) {
        this.history = props.history;
        this.errorHandler = props.errorHandler;
    }

    async get(endpoint: any, options = {}) {
        Object.assign(options, this._getCommonOptions());
        try {
            return axios.get(`${this.BASE_URL}/${endpoint}`, options);
        } catch (error: any|undefined) {
            this._handleHttpError(error)
        }
    }

    async post(endpoint: any, data = {}, options = {}) {
        let commonHeaders = { ...this._getCommonOptions().headers }
        // let head = { headers: { ...options.headers, ...commonHeaders } }
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

    _handleHttpError(error: any) {
        const { statusCode } = error.response.data;
        if (statusCode !== 401) {
            throw error;
        } else {
            this._handle401();
            if (this.errorHandler) {
                this.errorHandler(true);
            }
            throw error;
        }
    }

    _handle401() {
        this.history.push('/login');
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

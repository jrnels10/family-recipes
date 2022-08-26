import { Auth0ContextInterface } from "@auth0/auth0-react";
import axios from "axios";



export default class BaseHttpService {
  _accessToken: undefined | null | string | void;
  history: any;
  errorHandler: any;
  cancelTokenSource: any;
  auth0: Auth0ContextInterface;
  BASE_URL = 'http://localhost:8000';

  constructor(props?: any) {
    this.history = props.history;
    this.auth0 = props.auth0;
    this.errorHandler = props.errorHandler;
  }

  cancelRequest() {
    if (this.cancelTokenSource) {
      this.cancelTokenSource.cancel("Operation canceled by the user.");
    }
    this.cancelTokenSource = axios.CancelToken.source();
  }

  async get(url: string, options = {}) {
    this.cancelTokenSource = axios.CancelToken.source();
    Object.assign(options, await this._getCommonOptions());
    return axios.get(`${url}`, options).catch((error) => this._handleHttpError(error));
  }

  async post(url: string, data = {}, options = {}) {
    this.cancelTokenSource = axios.CancelToken.source();
    Object.assign(options, await this._getCommonOptions());
    return axios.post(`${url}`, data, options).catch((error) => this._handleHttpError(error));
  }

  async delete(url: string, options = {}) {
    Object.assign(options, await this._getCommonOptions());
    return axios.delete(`${url}`, options).catch((error) => this._handleHttpError(error));
  }

  async patch(url: string, data = {}, options = {}) {
    Object.assign(options, await this._getCommonOptions());
    return axios.patch(`${url}`, data, options).catch((error) => this._handleHttpError(error));
  }

  _handleHttpError(error: any) {
    const { statusCode } = error.response.data;

    if (statusCode !== 401) {
      throw error;
    } else {
      this._handle401();
      throw error;
    }
  }

  _handle401() {
    this.history.push("/signin");
  }

  async _getCommonOptions() {
    const token = await this.getToken();
console.log(token)
    return {
      cancelToken: this.cancelTokenSource.token,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    };
  }

  async getToken() {
    let _accessToken = this._accessToken;

    if (!_accessToken) {
      _accessToken = await this.auth0
        .getAccessTokenSilently()
        .catch(() => this.auth0.loginWithRedirect());
    }
    return _accessToken;
  }

}


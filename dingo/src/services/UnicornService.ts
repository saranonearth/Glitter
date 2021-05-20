import axios, { AxiosInstance } from 'axios';

import { UNICORN_SERVICE } from "../config"

class _UnicornService {
    public readonly _instance: AxiosInstance;


    public constructor(baseURL: string) {
        this._instance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 10000
        })

        this._initializeRequestInterceptor();
        this._initializeResponseInterceptor();
    }
    private _initializeResponseInterceptor() {
        this._instance.interceptors.request.use((config) => {
            config.headers['x-auth-token'] = localStorage.getItem('x-glitter');
            return config;
        })
    }

    private _initializeRequestInterceptor() {
        this._instance.interceptors.request.use(
            this._handleResponse,
            this._handleError
        )
    }

    private _handleResponse = (response: any) => response

    private _handleError = (error: any) => {
        // Handle error push toast messages

        console.log("ERROR FROM UNICORN SERVICE", error)

        return Promise.reject(error);
    }
}


export const UnicornService = new _UnicornService(UNICORN_SERVICE)._instance;
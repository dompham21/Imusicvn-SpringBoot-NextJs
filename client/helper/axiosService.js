import axios from 'axios';


class AxiosService {
    constructor() {
        const instance = axios.create();
        instance.interceptors.response.use(this.handleSuccess, this.handleError);

        instance.interceptors.request.use(
            (config) => {
              const token = localStorage.getItem('accessToken');
              if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
              }
              return config;
            },
            (error) => {
              return Promise.reject(error);
            }
        );
        this.instance = instance;

    }

    handleSuccess(response) {
        return response;
    }

    handleError(error) {
        const originalConfig = error.config;
        const refreshToken = localStorage.getItem('refreshToken');

        if (originalConfig.url !== "/api/token/" && error.response 
            && error.response.status === 401 
            && !originalConfig._retry && refreshToken)  
        {
            originalConfig._retry = true;
            
            try {
                this.instance.post("/auth/refreshtoken", {
                    refreshToken: refreshToken,
                })
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        
                        localStorage.setItem("accessToken", res.data.accesstoken);
                        originalConfig.headers.Authorization = `Bearer ${res.data.accesstoken}`;
                        return axios(originalConfig);
                    }
                  
                })
                .catch((err) => {
                    if(err.response.data.error === "Please Login or Register") { // refresh token has expries
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");

                    }
                })
            } 
            catch (_error) {
                return Promise.reject((_error.response && _error.response.data) || 'Something went wrong');
            }
        }
        return Promise.reject((error.response && error.response.data) || 'Something went wrong');

        

    }

    get(url, params) {
        return this.instance.get(url,params);
    }

    post(url, body, config) {
        return this.instance.post(url, body, config);
    }
    
    put(url, body) {
        return this.instance.put(url, body);
    }
    
    delete(url) {
        return this.instance.delete(url);
    }
}


export default new AxiosService();
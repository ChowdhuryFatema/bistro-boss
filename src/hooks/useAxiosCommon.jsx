import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosCommon = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const useAxiosCommon = () => {

    const navigate = useNavigate();
    const {logOutUser} = useAuth();

    axiosCommon.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`
        console.log('request stopped by interceptors');
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    })

    axiosCommon.interceptors.response.use(function(response){
        return response;
    }, async (error) => {
        const status = error.response.status;
        console.log('status error in the interceptor', status);
        if(status === 401 || status === 403){
            await logOutUser();
            navigate('/login')
        }
        return Promise.reject(error)
    })


    return axiosCommon;
};

export default useAxiosCommon;
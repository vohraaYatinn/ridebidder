
import { useState, useEffect } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { tokenJson } from "../redux/reducers/functionalities.reducer";
// import { updateToken } from '../redux/reducers/functionalities.reducer';

import { useNavigate } from "react-router-dom";


const useAxios = () => {
    // const dispatch = useDispatch();
    const router = useNavigate();

    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 
    const [controller, setController] = useState();

  
  
    const axiosFetch = async (configObj) => {

        const {
            axiosInstance,
            method,
            url,
            requestConfig = {}
        } = configObj;
        try {

            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                axiosInstance.defaults.headers['Authorization'] = `Bearer ${storedToken}`;
            }
            setLoading(true);
            const ctrl = new AbortController();
            setController(ctrl);
            const res = await axiosInstance[method.toLowerCase()](url, {
                ...requestConfig
            });
            setResponse(res?.data);
        } catch (err) {
            setError(err);
            if (err?.response?.status === 401) {
               localStorage.clear()
            }
            if (err?.response?.status === 404) {
                localStorage.clear()

            }
            if (err?.response?.status === 403) {
                localStorage.clear()

                router.push("/login")
            }
            else{
                setError(err);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const check = controller && controller.abort()
        return () => check;
    }, [controller]);

    return [response, error, loading, axiosFetch, setError];
}

export default useAxios
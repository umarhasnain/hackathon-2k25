import apiClient from ".";
import toast from "react-hot-toast";



const getReq = async (path) => {
    try {
        const response = await apiClient.get(path)
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

const postReq = async (path , data , form) => {
    try {
        const response = await apiClient.post(path , data ,form)
        if (response?.data.message) {
            toast.success(response?.data.message)            
        }
        return response?.data;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        if (error.message === 'timeout of 9000ms exceeded') {
            toast.error("Slow or no internet connection")            
        }
        toast.error(error?.message);
    }
}

const deletReq = async (path) => {
    try {
        const response = await apiClient.delete(path)
        toast.success(response?.data.message)
        return response?.data.data ;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        toast.error(error?.message)
    }
}

const putReq = async (path , data) => {
    try {
        const response = await apiClient.put(path , data)
        toast.success(response?.data.message)
        return response?.data.data;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        toast.error(error?.message)
    }
}


export { getReq , postReq , deletReq , putReq };
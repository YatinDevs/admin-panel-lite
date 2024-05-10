import axiosInstance from "./axiosInstance";
export const getcustomersListings = async ()=>{
    try {
        const response = await axiosInstance.get(`/users`)
        // console.log (response);
        return response.data;
        
    } catch (error) {
        console.error("error featching users details",error)
    }
}
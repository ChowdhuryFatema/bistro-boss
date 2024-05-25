import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";
import useAuth from "./useAuth";


const useAdmin = () => {

    const axiosCommon = useAxiosCommon();
    const {user} = useAuth();

    const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            const res = await axiosCommon.get(`/users/admin/${user.email}`)
            return res.data.admin;
        }
    }) 
    return [isAdmin, isAdminLoading]
};

export default useAdmin;
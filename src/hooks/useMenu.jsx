import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useMenu = () => {
    const axiosPublic = useAxiosPublic();

    const {data: menu = [], refetch, isLoading} = useQuery({
        queryKey: ['menu'],
        queryFn: async() => {
            const res = await axiosPublic.get('/menu')
            return res.data;
        }
    })

    return [menu, refetch, isLoading];

};

export default useMenu;
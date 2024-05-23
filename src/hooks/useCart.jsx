import { useQuery } from '@tanstack/react-query'
import useAxiosCommon from './useAxiosCommon';
import useAuth from './useAuth';

const useCart = () => {
    // tanStack query 
    const axiosCommon = useAxiosCommon()
    const {user} = useAuth();

    const { data: carts = [], isLoading, refetch } = useQuery({
        queryKey: ['carts', user?.email ],
        queryFn: async () =>{
            const res = await axiosCommon.get(`/carts?email=${user?.email}`)
            return res.data;
        } 

      })
      
      return [carts, isLoading, refetch]
};

export default useCart;
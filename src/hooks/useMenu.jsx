
import { useEffect, useState } from "react";
import useAxiosCommon from "./useAxiosCommon";


const useMenu = () => {
    const axiosCommon = useAxiosCommon();

    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosCommon('/menu')
            .then(data => {
                
                setMenu(data.data);
                setLoading(false)
            })
    }, [])


    return [menu, loading]
};

export default useMenu;
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";


const AdminRoute = ({children}) => {

    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    if(loading || isAdminLoading){
        return <LoadingSpinner></LoadingSpinner>;
    }

    if(user && isAdmin){
        return children;
    }

    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default AdminRoute;
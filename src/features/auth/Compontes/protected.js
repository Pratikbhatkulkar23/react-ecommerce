import { useSelector } from "react-redux/es/hooks/useSelector";
import { Navigate } from "react-router-dom";
import {selectLoggedInUser} from "../Compontes/authSlice";

function Protected({children}) {
    const user = useSelector(selectLoggedInUser)

    if(!user){
        return<Navigate to='/Login' replace={true}></Navigate>
    }
    return children;
}

export default Protected;
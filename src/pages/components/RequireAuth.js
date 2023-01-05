import { Navigate, useLocation } from "react-router-dom";
import supabase from "../../supabase";

// Returns true if user is authenticated and false if not
export function IsAuthed() {
    // State passed from LoginTab.js navigate call can contain session info
    const {state} = useLocation();
    const { data } = async () => {return await supabase.auth.getSession()};
    return !(!data && !state)
}

export default function RequireAuth({children}) {
    // Returns the component inside of this, (see App.js) or redirects to login
    return IsAuthed() ? children : <Navigate to="/login" replace />
}
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";

function RequireAuth({ children }) {
    const [user, loading] = useAuthState(auth);
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);
    let location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }

    if (!user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user?.providerData[0]?.providerId === "password" && !user?.emailVerified) {
        return <div className="text-center my-5">
            <h2 className="my-5">Please Verify Email {user.email}</h2>
            <Button
                onClick={async () => {
                    await sendEmailVerification();
                    toast.success('Sent email');
                }}
                variant="primary">Send Verification Email</Button>
            <ToastContainer />
        </div>
    }

    return children;
}
export default RequireAuth;
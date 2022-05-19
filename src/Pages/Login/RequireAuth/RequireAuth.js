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
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user?.providerData[0]?.providerId === "password" && !user?.emailVerified) {
        return <div className="text-center my-5">
            <h2 className="my-5">Please Verify Email {user.email} and refresh the page</h2>
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
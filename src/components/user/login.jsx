import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '../post/AuthContext.jsx';

const Login = () => {
    const { setUser } = useAuth();

    const handleGoogleLogin = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;


            setUser({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
            });

            alert('Login successful!');
        } catch (error) {
            console.error('Google login error:', error);
            alert('Google login failed. Please try again.');
        }
    };

    return (
        <div className="formBlock">
            <h2>Login</h2>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;

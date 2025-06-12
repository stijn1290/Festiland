// components/user/Login.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db } from "../../config/firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../post/AuthContext.jsx"; // ✅ Consistent import

const Login = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        EmailAdress: '',
        Password: '',
    });

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleManualLogin = async (e) => {
        e.preventDefault();
        try {
            const usersRef = collection(db, 'users');
            const q = query(
                usersRef,
                where('EmailAdress', '==', formData.EmailAdress),
                where('Password', '==', formData.Password)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                setUser(userData);
                alert("Login successful!");
                navigate("/");
            } else {
                alert("Invalid email or password.");
            }
        } catch (error) {
            console.error("Manual login error:", error);
            alert("Login failed. Please try again.");
        }
    };

    const handleGoogleLogin = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const googleUser = result.user;

            setUser({
                uid: googleUser.uid,
                displayName: googleUser.displayName,
                email: googleUser.email,
            });

            navigate("/");
        } catch (error) {
            console.error("Google login error:", error);
            alert("Google login failed. Please try again.");
        }
    };

    return (
        <div className="formBlock">
            <h2>Login</h2>
            <form onSubmit={handleManualLogin}>
                <div className="formRow">
                    <label className="inputBar">
                        Email Address
                        <input
                            type="email"
                            name="EmailAdress"
                            value={formData.EmailAdress}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="formRow">
                    <label className="inputBar">
                        Password
                        <input
                            type="password"
                            name="Password"
                            value={formData.Password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
            <hr />
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;
import { useState } from 'react';
import { db } from '../../config/firebase.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../post/AuthContext.jsx';

const Login = () => {
    const [formData, setFormData] = useState({
        EmailAdress: '',
        Password: '',
    });
    const { setUser } = useAuth(); // 👈 Get context setter

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
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
                setUser(userData); // ✅ Set logged-in user
                alert('Login successful!');
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="formBlock">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
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
        </div>
    );
};

export default Login;

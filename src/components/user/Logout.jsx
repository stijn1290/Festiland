// components/user/Logout.jsx
import { useAuth } from "../post/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/Inloggen");
    };

    return (
        <button onClick={handleLogout} className="header-text" style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            Log out
        </button>
    );
};

export default Logout;
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Index from "./components/post/Index.jsx";
import Create from "./components/post/Create.jsx";
import CreateUser from "./components/user/create.jsx";
import Login from "./components/user/login.jsx";

function App() {
    return (
        <Router>
            <header>
                <Link to="/">
                    <img src="/logo.png" alt="Festiland Logo" className="imgSize" />
                </Link>
                <h2>Festiland</h2>
                <nav>
                    <Link className="header-text" to="/">Posts</Link> {" "}
                    <Link className="header-text" to="/maakpost">Maak Post</Link> {" "}
                    <Link className="header-text" to="/Registreren">Registreren</Link> {" "}
                    <Link className="header-text" to="/Inloggen">Inloggen</Link>
                </nav>
            </header>


            <main className="layout">
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/maakpost" element={<Create />} />
                    <Route path="/Registreren" element={<CreateUser />} />
                    <Route path="/Inloggen" element={<Login />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;

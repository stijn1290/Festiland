import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Index from "./components/post/Index.jsx";
import Create from "./components/post/Create.jsx";
import CreateUser from "./components/user/create.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import Logout from "./components/user/Logout.jsx";
import Dashboard from "./components/user/dashboard.jsx";
import Login from "./components/user/login.jsx";
import EditPost from "./components/post/EditPost.jsx";
import Show from "./components/festival/Show.jsx";
import { useAuth } from "./components/post/AuthContext.jsx";
import IndexUser from "./components/user/Index.jsx";
import CreateComplaint from "./components/complaints/Create.jsx";
function App() {
  const { user } = useAuth();

  return (
    <Router>
      <header>
        <Link to="/">
          <img src="/logo.png" alt="Festiland Logo" className="imgSize" />
        </Link>
        <h2>Festiland</h2>
        <nav>
            
          {!user ? (
            <>
              <Link className="header-text" to="/">
                Festivals
              </Link>
              <Link className="header-text" to="/Registreren">
                Registreren
              </Link>
              <Link className="header-text" to="/Inloggen">
                Inloggen
              </Link>
            </>
          ) : (
            <>
              <Link className="header-text" to="/">
                Festivals
              </Link>
              <Link className="header-text" to="/maakpost">
                Maak Post
              </Link>
              <Link className="header-text" to="/maakklacht">Maak Klacht</Link>
              <Link className="header-text" to="/users">Users</Link>
              <Link className="header-text" to="/dashboard">
                Dashboard
              </Link>
              <Logout />
            </>
          )}
          <Link className="header-text" to="/privacybeleid">
            Privacybeleid
          </Link>
        </nav>
      </header>

      <main className="layout">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Index />} />
          <Route path="/:festival/posts" element={<Show />} />
          <Route path="/maakpost" element={<Create />} />
          <Route path="/Registreren" element={<CreateUser />} />
          <Route path="/Inloggen" element={<Login />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/privacybeleid" element={<PrivacyPolicy />} />
          <Route path="/maakklacht" element={<CreateComplaint />} />
                    <Route path="/users" element={<IndexUser />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

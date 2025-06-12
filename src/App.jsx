import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Index from "./components/post/Index.jsx";
import Create from "./components/post/Create.jsx";
import CreateUser from "./components/user/create.jsx";
import Login from "./components/user/login.jsx";
import EditPost from "./components/post/EditPost.jsx";
import Show from "./components/festival/Show.jsx";
import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "./config/firebase.js";
import {useAuth} from "./components/post/AuthContext.jsx";

function App() {
    const [getPostList, setPostList] = useState([]);
    const [getFestivalRanking, setFestivalRanking] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(collection(db, "posts"));
            const filteredPosts = data.docs
                .map((doc) => ({...doc.data(), id: doc.id}))
                .filter((post) => !!post.Festival)
            const uniqueFestivalsMap = new Map();
            filteredPosts.forEach((post) => {
                if (!uniqueFestivalsMap.has(post.Festival)) {
                    uniqueFestivalsMap.set(post.Festival, post);
                }
            })
            const uniquePosts = Array.from(uniqueFestivalsMap.values());
            setPostList(uniquePosts);
        };
        getPosts();
    }, []);
    useEffect(() => {
        const getFestivalRanking = async () => {
            const data = await getDocs(collection(db, "posts"));
            const filteredPosts = data.docs
                .map((doc) => ({...doc.data(), id: doc.id}))
                .filter((post) => !!post.Festival)
            const festivalsRankingMap = new Map();
            filteredPosts.forEach((post) => {
                if (festivalsRankingMap.has(post.Festival)) {
                    festivalsRankingMap.set(post.Festival, festivalsRankingMap.get(post.Festival) + 1);
                } else {
                    festivalsRankingMap.set(post.Festival, 1);
                }
            })
            const festivalsRanking = Array.from(festivalsRankingMap.entries())
                .sort((a, b) => b[1] - a[1]);
            setFestivalRanking(festivalsRanking);
        }
        getFestivalRanking();
    }, [])
    return (
        <Router>
            <header>
                <Link to="/">
                    <img src="/logo.png" alt="Festiland Logo" className="imgSize"/>
                </Link>
                <h2>Festiland</h2>
                <nav>
                    {getPostList.map(post => (
                        <Link
                            className="header-text"
                            to={`/${post.Festival}/posts`}
                            key={post.id}
                        >
                            {post.Festival}
                        </Link>
                    ))}
                    <Link className="header-text" to="/maakpost">Maak Post</Link>{" "}
                    {!user ? (
                        <>
                            <Link className="header-text" to="/">
                                Posts
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
                                Posts
                            </Link>
                            <Link className="header-text" to="/maakpost">
                                Maak Post
                            </Link>
                            <Link className="header-text" to="/logout">Logout</Link>

                        </>
                    )}
                </nav>
            </header>

            <main className="layout">
                <Routes>
                    <Route path="/" element={<Index/>}/>
                    {getPostList.map(post => (
                        <Route
                            path={`/${post.Festival}/posts`}
                            element={<Show festival={post.Festival} ranking={getFestivalRanking}/>}
                            key={post.id}
                        />
                    ))}
                    <Route path="/maakpost" element={<Create/>}/>
                    <Route path="/Registreren" element={<CreateUser/>}/>
                    <Route path="/Inloggen" element={<Login/>}/>
                    <Route path="/edit/:id" element={<EditPost/>}/>
                </Routes>
            </main>
        </Router>
    );
}

export default App;


import './App.css';
import Index from "./components/post/Index.jsx";
import Create from "./components/post/Create.jsx";
import CreateUser from "./components/user/create.jsx";
function App() {

    return (
        <>
            <header>
                <a href="/">
                    <img src="/logo.png" alt="Festiland Logo" className="imgSize"/>
                </a>
                <h2>Posts</h2>
            </header>

            <main className="layout">
                <Index></Index>
                <Create></Create>
                <CreateUser></Create>
            </main>
        </>

    );
}

export default App;


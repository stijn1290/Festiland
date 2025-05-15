import './App.css'
import {useEffect, useState} from "react";
import { collection, getDocs } from "firebase/firestore";
import {db} from './config/firebase.js';

function App() {
    const [getPostList, setPostList] = useState([]);
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(collection(db, "posts"));
            setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getPosts();
    }, []);
    return (
        <>
            <h2>Posts</h2>
            {getPostList.map(post =>{
                return(
                    <>
                        <div>
                            <h2>{post.festival}  {post.user}</h2>
                        </div>
                        <h2><span>Title: </span>{post.title}</h2>
                        <h2><span>Description: </span>{post.description}</h2>
                        <h1>Kipsate</h1>
                    </>
                )
            })}
        </>
    )
}

export default App

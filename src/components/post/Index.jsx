import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../../config/firebase.js';
import { useAuth } from './AuthContext.jsx';
import { useNavigate } from 'react-router-dom'; // ✅ IMPORT THIS

function Index() {
    const [getPostList, setPostList] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate(); // ✅ INITIALIZE

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(collection(db, "posts"));
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getPosts();
    }, []);

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
        setPostList((prevPosts) => prevPosts.filter((post) => post.id !== id));
    };

    const updatePost = async (id, updatedData) => {
        const postDoc = doc(db, "posts", id);
        try {
            await updateDoc(postDoc, updatedData);
            setPostList((prev) =>
                prev.map((post) =>
                    post.id === id ? { ...post, ...updatedData } : post
                )
            );
            alert("Post updated successfully!");
        } catch (error) {
            console.error("Error updating post:", error);
            alert("Failed to update post.");
        }
    };

    return (
        <>
            {getPostList.map(post => (
                <div className="block" key={post.id}>
                    <div className="firstRow">
                        <h2>{post.Festival}</h2>
                        {!post.User?.private && <h2>{post.User?.name}</h2>}
                    </div>
                    <h2><span>Title: </span>{post.title}</h2>
                    <h2><span>Description: </span>{post.description}</h2>

                    {user && (
                        <>
                            <button onClick={() => deletePost(post.id)}>Delete</button>
                            <button onClick={() => navigate(`/edit/${post.id}`)}>Edit</button>
                        </>
                    )}
                </div>
            ))}
        </>
    );
}

export default Index;

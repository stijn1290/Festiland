import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import { useAuth } from './AuthContext.jsx';

function Create() {
    const [getFestival, setFestival] = useState("");
    const [getUser, setUser] = useState("");
    const [getDescription, setDescription] = useState("");
    const [getTitle, setTitle] = useState("");

    const { user } = useAuth();

    const createPost = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "posts"), {
                Festival: getFestival,
                User: user?.Name || getUser,
                description: getDescription,
                title: getTitle,
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    if (!user) {
        return <p>Please log in to create a post.</p>;
    }

    return (
        <form className="formBlock" onSubmit={createPost}>
            <h2>New Post</h2>
            <div className="formRow">
                <label htmlFor="title">Titel:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="inputBar"
                    value={getTitle}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="formRow">
                <label htmlFor="festival">Festival:</label>
                <input
                    type="text"
                    id="festival"
                    name="festival"
                    className="inputBar"
                    value={getFestival}
                    onChange={(e) => setFestival(e.target.value)}
                />
            </div>
            <div className="formRow">
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    className="inputBar"
                    value={getDescription}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="formRow">
                <input type="submit" value="Create" className="submitBar" />
            </div>
        </form>
    );
}

export default Create;

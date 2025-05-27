import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase.js';

function Index() {
    const [getPostList, setPostList] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(collection(db, "posts"));
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getPosts();
    }, []);

    // Render star rating visually (no logic, just 3/5 for now)
    const renderStars = (count = 3) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} style={{ color: i <= count ? 'gold' : '#ccc', fontSize: '1.2rem' }}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <>
            {getPostList.map(post => (
                <div className="block" key={post.id}>
                    <div className="firstRow">
                        <h2>{post.Festival}</h2>
                        <h2>{post.User}</h2>
                    </div>
                    <h2><span>Title: </span>{post.title}</h2>
                    <h2><span>Description: </span>{post.description}</h2>
                    <div className="starRating">
                        {renderStars(3)} {/* 👈 show 3 stars filled */}
                    </div>
                </div>
            ))}
        </>
    );
}

export default Index;

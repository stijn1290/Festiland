import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../config/firebase.js";

function Show(props) {
    const [getPostList, setPostList] = useState([]);
    const festivalName = props.festival;
    const ranking = props.ranking;
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(collection(db, "posts"));
            const filteredPosts = data.docs
                .map((doc) => ({...doc.data(), id: doc.id}))
                .filter((post) => post.Festival === festivalName);
            setPostList(filteredPosts);
        };
        getPosts();
    }, [festivalName]);
    return (
        <>
            <div className="firstRow">
                <h2>{festivalName}</h2>
                {(() => {
                    const index = ranking.findIndex(([festival]) => festival === festivalName);
                    if (index !== -1) {
                        const [festival, count] = ranking[index];
                        return (
                            <div className="block" key={festival}>
                                <h2>Festival Ranking: <strong>#{index + 1}</strong></h2>
                            </div>
                        );
                    } else {
                        return <div className="block">Festival not ranked</div>;
                    }
                })()}
            </div>
            {getPostList.map(post => (
                <div className="block" key={post.id}>
                    <div className="firstRow">
                        <h2>{post.Festival}</h2>
                        {!post.User?.private && <h2>{post.User?.name}</h2>}
                    </div>
                    <h2><span>Title: </span>{post.title}</h2>
                    <h2><span>Description: </span>{post.description}</h2>
                </div>
            ))}
        </>
    )
}

export default Show
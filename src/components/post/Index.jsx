import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../config/firebase.js';
import { useAuth } from '../post/authcontext'; 
import { Link } from "react-router-dom";

function Index() {
  const [getPostList, setPostList] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const { user } = useAuth();

  // Fetch all posts
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      const posts = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setPostList(posts);
    };
    getPosts();
  }, []);

  // Fetch blocked users for the logged-in user
  useEffect(() => {
    if (!user) return;

    const getBlockedUsers = async () => {
      const q = query(
        collection(db, "blocked_user"),
        where("auth_user", "==", user.Name)  // adjust property name if needed
      );
      const snapshot = await getDocs(q);
      const blocked = snapshot.docs.map(doc => doc.data().blocked_user);
      setBlockedUsers(blocked);
    };

    getBlockedUsers();
  }, [user]);

  const filteredPosts = getPostList.filter(
    post => !blockedUsers.includes(post.user?.Name)
  );

  const uniqueFestivals = Array.from(
    new Set(filteredPosts.map(post => post.Festival))
  );

  return (
    <>
      <div className="layoutGrid">
        {uniqueFestivals.map(festival => {
          const postForFestival = filteredPosts.find(p => p.Festival === festival);

          return (
            <div className="block" key={festival} id={festival}>
              <div className="firstRow" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>
                  <Link to={`/${festival}/posts`} id="clickFestival">{festival}</Link>
                </h2>
              </div>
              <h2>Klik op de titel om te navigeren</h2>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Index;

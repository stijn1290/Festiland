import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebase.js";
import { useAuth } from "../post/AuthContext.jsx";

function Index() {
  const { user: authUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!authUser) return;

    // Fetch all users except current logged in user
    const fetchUsers = async () => {
      const data = await getDocs(collection(db, "users"));
      const filteredUsers = data.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((u) => u.Name !== authUser.Name);
      setUsers(filteredUsers);
    };

    fetchUsers();
  }, [authUser]);

  useEffect(() => {
    if (!authUser) return;

    // Realtime listener for blocked users by this authUser
    const q = query(
      collection(db, "blocked_user"),
      where("auth_user", "==", authUser.Name)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const blocked = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlockedUsers(blocked);
    });

    return () => unsubscribe();
  }, [authUser]);

  if (!authUser) {
    return <p>Please login to see the active users!</p>;
  }

  // Check if a user is blocked by authUser
  const isUserBlocked = (userName) =>
    blockedUsers.some((b) => b.blocked_user === userName);

  // Toggle block/unblock user
  const toggleBlockUser = async (userName) => {
    // Check if blocked
    const blockedEntry = blockedUsers.find((b) => b.blocked_user === userName);

    if (blockedEntry) {
      // Unblock = delete the blocked_user doc
      await deleteDoc(doc(db, "blocked_user", blockedEntry.id));
    } else {
      // Block = add new doc
      await addDoc(collection(db, "blocked_user"), {
        auth_user: authUser.Name,
        blocked_user: userName,
      });
    }
  };

  // Filter users by search input
  const filteredUsers = users.filter((u) =>
    u.Name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        id="userSearch"
        placeholder="Search user"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="block">
        <h2>Problemen of ongemakken met een gebruiker?</h2>
      </div>
      {filteredUsers.map((user) => {
        const blocked = isUserBlocked(user.Name);

        return (
          <div
            key={user.id}
            className="block"
            style={{ opacity: blocked ? 0.5 : 1 }}
          >
            <h2>
              <b>User:</b> {user.Name}{" "}
              {blocked && <span style={{ color: "red" }}>(Blocked)</span>}
            </h2>
            <div className="firstRow">
              <button
                className="submitBar"
                onClick={() => toggleBlockUser(user.Name)}
              >
                {blocked ? "Deblokkeer gebruiker" : "Blokkeer gebruiker"}
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Index;

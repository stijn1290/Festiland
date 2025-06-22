import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import { useAuth } from "../post/AuthContext.jsx";
import { useNavigate, useParams } from "react-router-dom";

function Show(props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { festival } = useParams();
  const festivalName = decodeURIComponent(festival);

  const ranking = props.ranking || [];

  const [getPostList, setPostList] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [blockedUsers, setBlockedUsers] = useState([]);

  // Fetch posts of this festival
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      const filteredPosts = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((post) => post.Festival === festivalName);
      setPostList(filteredPosts);
    };
    getPosts();
  }, [festivalName]);

  // Fetch blocked users for logged-in user
  useEffect(() => {
    if (!user) return;

    const fetchBlockedUsers = async () => {
      const q = query(
        collection(db, "blocked_user"),
        where("auth_user", "==", user.Name) // Make sure user.Name is correct property!
      );
      const snapshot = await getDocs(q);
      const blocked = snapshot.docs.map((doc) => doc.data().blocked_user);
      setBlockedUsers(blocked);
    };

    fetchBlockedUsers();
  }, [user]);

  const handleStarClick = async (postId, rating) => {
    const postDoc = doc(db, "posts", postId);
    try {
      await updateDoc(postDoc, { rating });
      setSelectedRatings((prev) => ({ ...prev, [postId]: rating }));
      setPostList((prev) =>
        prev.map((post) => (post.id === postId ? { ...post, rating } : post))
      );
      alert("Rating submitted!");
    } catch (error) {
      console.error("Failed to submit rating", error);
      alert("Failed to submit rating.");
    }
  };

  const renderStars = (post) => {
    const currentRating = selectedRatings[post.id] ?? post.rating ?? 0;
    return (
      <div style={{ display: "flex", gap: "4px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            id={`star-${star}`}
            onClick={() => handleStarClick(post.id, star)}
            style={{
              cursor: "pointer",
              color: star <= currentRating ? "gold" : "gray",
              fontSize: "24px",
              userSelect: "none",
            }}
            aria-label={`${star} star`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handleAddComment = async (postId) => {
    const postDoc = doc(db, "posts", postId);
    const newComment = {
      userId: user?.uid,
      name: user?.Name || "Anonymous",
      text: commentInputs[postId]?.trim(),
      timestamp: new Date(),
    };

    if (!newComment.text) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      const currentPost = getPostList.find((post) => post.id === postId);
      const currentComments = currentPost?.comments || [];

      const updatedComments = [...currentComments, newComment];

      await updateDoc(postDoc, { comments: updatedComments });

      setPostList((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, comments: updatedComments } : post
        )
      );

      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));

      alert("Comment added!");
    } catch (error) {
      console.error("Failed to add comment", error);
      alert("Failed to add comment.");
    }
  };

  const deletePost = async (postId) => {
    alert(`Delete function not implemented. Post ID: ${postId}`);
  };

  // Check if the post's user is blocked by current logged in user
  const isPostFromBlockedUser = (postUserName) => {
    if (!postUserName) return false;
    return blockedUsers.some(
      (blockedUser) =>
        blockedUser.trim().toLowerCase() === postUserName.trim().toLowerCase()
    );
  };

  return (
    <>
      <div className="firstRow" style={{ justifyContent: "space-between" }}>
        <h2>{festivalName}</h2>

        {ranking && Array.isArray(ranking) ? (
          (() => {
            const index = ranking.findIndex(
              ([festival]) => festival === festivalName
            );
            if (index !== -1) {
              const [festival] = ranking[index];
              return (
                <div className="block" key={festival}>
                  <h2>
                    Festival Ranking: <strong>#{index + 1}</strong>
                  </h2>
                </div>
              );
            } else {
              return <div className="block">Festival not ranked</div>;
            }
          })()
        ) : (
          <div className="block">Ranking data not available</div>
        )}
      </div>

      {getPostList.map((post) => {
        const blocked = isPostFromBlockedUser(post.user?.Name);

        return (
          <div className="block" key={post.id} id={`post-${post.title}`} >
            <div className="firstRow" style={{ justifyContent: "space-between" }}>
              <h2>{post.Festival}</h2>
              {user && (
                <div>
                  <button
                    style={{ marginRight: 8 }}
                    onClick={() => deletePost(post.id)}
                  >
                    Delete
                  </button>
                  <button onClick={() => navigate(`/edit/${post.id}`)}>Edit</button>
                </div>
              )}
            </div>

            {blocked ? (
              <h2>Deze post is van iemand die je hebt geblockt</h2>
            ) : post.user?.private ? (
              <h2>Post is private</h2>
            ) : (
              <>
                <h2>
                  <span>Gebruiker: {post.user?.Name || "Unknown"}</span>
                </h2>
                <h2>
                  <span>Title: </span>
                  {post.title}
                </h2>
                <h2>
                  <span>Description: </span>
                  {post.description}
                </h2>

                <div>
                  <span>Rate this post: </span>
                  {renderStars(post)}
                </div>

                <div style={{ marginTop: "12px" }}>
                  <h3>Reacties:</h3>
                  {(post.comments || []).length === 0 ? (
                    <p>No comments yet.</p>
                  ) : (
                    post.comments.map((comment, idx) => (
                      <div key={idx} style={{ marginBottom: "8px" }}>
                        <strong>{comment.name}:</strong> {comment.text}
                      </div>
                    ))
                  )}
                </div>

                {user ? (
                  <div style={{ marginTop: "8px" }}>
                    <input
                      type="text"
                      placeholder="Add a comment"
                      value={commentInputs[post.id] || ""}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      style={{ marginRight: "8px", width: "60%" }}
                    />
                    <button onClick={() => handleAddComment(post.id)}>Reageer</button>
                  </div>
                ) : (
                  <p>Please log in to comment.</p>
                )}
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

export default Show;

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import { useAuth } from './AuthContext.jsx';

function Create() {
  const [getFestival, setFestival] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getTitle, setTitle] = useState("");

  const { user } = useAuth();

  const createPost = async (e) => {
    e.preventDefault();

    if (!getFestival || !getTitle || !getDescription) {
      alert("Please fill in all fields.");
      return;
    }

    if (!user) {
      alert("User is not properly logged in.");
      console.error("Invalid user object:", user);
      return;
    }

  try {
  await addDoc(collection(db, "posts"), {
    Festival: getFestival,
    title: getTitle,
    description: getDescription,
    user: {
      uid: user.uid || "manual_" + (user.EmailAdress || "unknown"),
      name: user.displayName || user.name || user.Name || user.EmailAdress || "Anonymous",
      private: user.private ?? false,
    },
    timestamp: new Date(),
  });

  alert("Post created!");
  setFestival("");
  setTitle("");
  setDescription("");
} catch (error) {
  console.error("Error adding document: ", error);
  alert("Failed to create post.");
}
  };

  if (!user) {
    return <p>Please log in to create a post.</p>;
  }

  return (
    <form className="formBlock" onSubmit={createPost}>
      <div className="formRow">
        <label htmlFor="festival">Festival:</label>
        <select
          id="festival"
          name="festival"
          className="inputBar"
          value={getFestival}
          onChange={(e) => setFestival(e.target.value)}
        >
          <option value="">-- Kies een festival --</option>
          <option value="Defqon.1">Defqon.1 (26-29 juni, Biddinghuizen)</option>
          <option value="Qlimax">Qlimax (november, Arnhem)</option>
          <option value="Decibel Outdoor">Decibel Outdoor (augustus, Hilvarenbeek)</option>
          <option value="Intents Festival">Intents Festival (30 mei - 1 juni, Oisterwijk)</option>
          <option value="Rebirth Festival">Rebirth Festival (april, Haaren)</option>
          <option value="Dominator">Dominator (18-19 juli, Eersel)</option>
          <option value="Masters of Hardcore">Masters of Hardcore (29 maart, 's-Hertogenbosch)</option>
          <option value="Hard Bass">Hard Bass (februari, Arnhem)</option>
          <option value="Harmony of Hardcore">Harmony of Hardcore (7 juni, Erp)</option>
          <option value="Hardfest">Hardfest (19 april, Enschede)</option>
          <option value="7th Sunday Festival">7th Sunday Festival (8 juni, Erp)</option>
          <option value="Dreamfields">Dreamfields (5 juli, Lathum)</option>
          <option value="Wish Outdoor">Wish Outdoor (4 juli, Beek en Donk)</option>
          <option value="Freshtival">Freshtival (6 juni, Enschede)</option>
          <option value="Shock Festival">Shock Festival (6 juni, Leek)</option>
          <option value="Outlands Festival">Outlands Festival (20 juni, Vierlingsbeek)</option>
          <option value="ZomerZon Festival">ZomerZon Festival (21 juni, Uden)</option>
          <option value="Vroeger Was Alles Beter">Vroeger Was Alles Beter (12 juli, Rosmalen)</option>
          <option value="Glorification Festival">Glorification Festival (14 juni, 's-Heer-Hendrikskinderen)</option>
          <option value="Verkes Outdoor">Verkes Outdoor (18 juli, Meterik)</option>
          <option value="Forbidden Island">Forbidden Island (6-11 juli, Zrce Beach, Kroatië)</option>
          <option value="Reverze">Reverze (1-2 maart, Antwerpen)</option>
          <option value="AIRBEAT ONE Festival">AIRBEAT ONE Festival (9-13 juli, Duitsland)</option>
          <option value="Electric Love Festival">Electric Love Festival (3 juli, Oostenrijk)</option>
          <option value="Syndicate Festival">Syndicate Festival (oktober, Dortmund)</option>
          <option value="Harder Force Open Air">Harder Force Open Air (23-25 mei, Heide, Duitsland)</option>
          <option value="NEXUS Festival">NEXUS Festival (14 juni, Madrid)</option>
          <option value="So W'Happy Festival">So W'Happy Festival (11 juli, Rongy, België)</option>
          <option value="Ultra Europe">Ultra Europe (11-13 juli, Split, Kroatië)</option>
          <option value="Medusa Festival">Medusa Festival (7-10 augustus, Cullera, Spanje)</option>
          <option value="Nature One">Nature One (31 juli - 3 augustus, Duitsland)</option>
          <option value="SonneMondSterne Festival">SonneMondSterne Festival (8-10 augustus, Duitsland)</option>
          <option value="M'era Luna">M'era Luna (9-10 augustus, Duitsland)</option>
          <option value="Parookaville">Parookaville (18-20 juli, Weeze)</option>
          <option value="Deichbrand Festival">Deichbrand Festival (17-20 juli, Cuxhaven)</option>
          <option value="Fusion Festival">Fusion Festival (25-29 juni, Duitsland)</option>
          <option value="Southside Festival">Southside Festival (20-22 juni, Duitsland)</option>
          <option value="Hurricane Festival">Hurricane Festival (20-22 juni, Duitsland)</option>
          <option value="Rock am Ring">Rock am Ring (6-8 juni, Nürburgring)</option>
          <option value="Rock im Park">Rock im Park (6-8 juni, Nürnberg)</option>
          <option value="Splash! Festival">Splash! Festival (3-5 juli, Duitsland)</option>
          <option value="Ikarus Festival">Ikarus Festival (6-9 juni, Memmingerberg, Duitsland)</option>
          <option value="World Club Dome - Moon Edition">World Club Dome - Moon Edition (6 juni, Frankfurt)</option>
          <option value="Hardstyle DNA">Hardstyle DNA (22 april, Lillestrøm, Noorwegen)</option>
          <option value="Real Hardstyle Norway">Real Hardstyle Norway (5 juli, Lørenskog, Noorwegen)</option>
          <option value="Forbidden Island x Dropzone">Forbidden Island x Dropzone (6 juli, Novalja, Kroatië)</option>
          <option value="So W'Happy 2025">So W'Happy 2025 (11 juli, Rongy, België)</option>
          <option value="Vroeger Was Alles Beter - Classics City">Vroeger Was Alles Beter - Classics City (12 juli, Rosmalen)</option>
          <option value="Verkes Outdoor - Nuclear Noise">Verkes Outdoor - Nuclear Noise (18 juli, Meterik)</option>
        </select>
      </div>

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

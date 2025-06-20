import {useState} from "react";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../config/firebase.js";
import {useAuth} from "../post/AuthContext.jsx";

function Create()
{
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        complaint_user: user.Name,
        message: '',
        to_user: '',
    })
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'complaints'), formData);
        alert('Complaint added successfully!');
        setFormData({
            complaint_user: user.Name,
            message: '',
            to_user: '',
        });
    };
    return(
        <>
            <form className="formBlock" onSubmit={handleSubmit}>
                <h2>Dien klacht in</h2>
                <div className="formRow">
                    <label htmlFor="message">Bericht:</label>
                    <input
                        type="text"
                        id="message"
                        name="message"
                        className="inputBar"
                        value={formData.message}
                        onChange={handleChange}
                    />
                </div>
                <div className="formRow">
                    <label htmlFor="to_user">About user:</label>
                    <input
                        type="text"
                        id="to_user"
                        name="to_user"
                        className="inputBar"
                        value={formData.to_user}
                        onChange={handleChange}
                    />
                </div>
                <div className="formRow">
                    <input type="submit" value="Create" className="submitBar" />
                </div>
            </form>
        </>
    )
}
export default Create;
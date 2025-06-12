import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.js';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Festival: '',
        title: '',
        User: { name: '' }
    });

    useEffect(() => {
        const fetchPost = async () => {
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setFormData(docSnap.data());
            } else {
                alert('Post not found');
                navigate('/');
            }
        };
        fetchPost();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setFormData((prev) => ({
                ...prev,
                User: { ...prev.User, name: value }
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, "posts", id), formData);
            alert('Post updated!');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Update failed.');
        }
    };

    return (
        <div className="formBlock">
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Festival:
                    <input
                        type="text"
                        name="Festival"
                        value={formData.Festival}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.User?.name || ''}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => navigate('/')}>Cancel</button>
            </form>
        </div>
    );
};

export default EditPost;

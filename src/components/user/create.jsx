import { useState } from 'react';
import { db } from '../../config/firebase.js';
import { collection, addDoc } from 'firebase/firestore';

const AddDoc = () => {
    const [formData, setFormData] = useState({
        EmailAdress: '',
        Name: '',
        Password: '',
        private: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'users'), formData);
        alert('User added successfully!');
        setFormData({
            EmailAdress: '',
            Name: '',
            Password: '',
            private: false,
        });
    };

    return (
        <>
            <div className="formBlock">
                <form onSubmit={handleSubmit}>
                    <h2>Create an Account</h2>
                    <div className="formRow">
                        <label className="inputBar">
                            Email Address
                            <input
                                type="email"
                                name="EmailAdress"
                                id="email"
                                value={formData.EmailAdress}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div className="formRow">
                        <label className="inputBar">
                            Name
                            <input
                                type="text"
                                id="name"
                                name="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>

                    <div className="formRow">
                        <label className="inputBar">
                            Password
                            <input
                                type="password"
                                id="password"
                                name="Password"
                                value={formData.Password}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>

                    <div className="formRow">
                        <label className="inputBar">
                            <input
                                type="checkbox"
                                id="privacy"
                                name="private"
                                checked={formData.private}
                                onChange={handleChange}
                            />
                            Make account private
                        </label>
                    </div>


                    <button type="submit" id="submit">Continue</button>
                </form>
            </div>



        </>
    );
};

export default AddDoc;
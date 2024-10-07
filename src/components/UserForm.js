import React, { useState, useEffect } from 'react';
import { createUser, updateUser, fetchUsers } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', email: '', phone: '', username: '', address: { street: '', city: '' }, company: { name: '' }, website: '' });
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            const getUser = async () => {
                const response = await fetchUsers();
                const foundUser = response.data.find(u => u.id === Number(id));
                if (foundUser) {
                    setUser(foundUser);
                }
            };
            getUser();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [key, subkey] = name.split('.');
            setUser({ ...user, [key]: { ...user[key], [subkey]: value } });
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                console.log('Sending to API:', user);
                const response = await updateUser(user);
                console.log('Response from API:', response.data);
            } else {
                await createUser(user);
            }
            navigate('/');
        } catch (error) {
            console.error("There was an error!", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" required minLength={3} />
            <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
            <input type="text" name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" required />
            <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username" required readOnly />
            <input type="text" name="address.street" value={user.address?.street || ''} onChange={handleChange} placeholder="Street" required />
            <input type="text" name="address.city" value={user.address?.city || ''} onChange={handleChange} placeholder="City" required />
            <input type="text" name="company.name" value={user.company?.name || ''} onChange={handleChange} placeholder="Company Name" />
            <input type="text" name="website" value={user.website} onChange={handleChange} placeholder="Website" />
            <button type="submit">{isEditMode ? 'Update' : 'Create'} User</button>
        </form>
    );
};

export default UserForm;

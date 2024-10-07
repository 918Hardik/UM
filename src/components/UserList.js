import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const getUsers = async () => {
        const response = await fetchUsers();
        setUsers(response.data);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleDelete = async (id) => {
        await deleteUser(id);
        getUsers();
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td className="table-buttons">
                            <button onClick={() => handleEdit(user.id)}>Edit</button>
                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserList;

import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async () => {
    return await axios.get(API_URL);
};

export const createUser = async (user) => {
    return await axios.post(API_URL, user);
};

export const updateUser = async (user) => {
    return await axios.put(`${API_URL}/${user.id}`, user);
};

export const deleteUser = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};

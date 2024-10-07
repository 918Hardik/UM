import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserListPage from './pages/UserListPage';
import UserFormPage from './pages/UserFormPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<UserListPage />} />
                <Route path="/create" element={<UserFormPage />} />
                <Route path="/edit/:id" element={<UserFormPage />} />
            </Routes>
        </Router>
    );
}

export default App;

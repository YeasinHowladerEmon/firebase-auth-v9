import React, { useContext, useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { Link , useHistory} from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import { useAuth } from './useAuth'
const Dashboard = () => {
    const [error, setError] = useState()
    const { currentUser } = useContext(AuthContext)
    const {user, logOut} = useAuth()
    const history = useHistory()
     const handleLogOut = async () => {
        setError("")
        try{
            await logOut()
            history.push("/login")
        }catch{
            setError("failed to log out")
        }
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email: </strong> {user.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button onClick={handleLogOut}>
                    Log Out</Button>
            </div>
        </>
    );
};

export default Dashboard; <h1>Dashboard</h1>
import { useContext, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import { useAuth } from './useAuth'
const ForgetPassword = () => {
    const { register, handleSubmit} = useForm();
    const { currentUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(false)
    // const history = useHistory()
    const { resetPassword } = useAuth();
    
    const onSubmit = async data => {
        const { email } = data
        console.log(data);
        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(email)
            alert("Check your for further instructions")
            setMessage("Check your for further instructions")
        } catch {
            alert("Failed to reset password")
            setError("Failed to reset password")
        }
    };
    // console.log({user});
    console.log({ currentUser });
    return (

        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group id="email">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="email" {...register("email")} placeholder="Email" />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 btn btn-primary mt-2" type="submit">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login?</Link>
                    </div>
                </Card.Body>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </Card>
        </>
    );
};

export default ForgetPassword;
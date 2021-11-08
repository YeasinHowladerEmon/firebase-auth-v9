import { useContext, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import { useAuth } from './useAuth'
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { currentUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    // initializeAppFream();
    const { googleSignIn, user, login } = useAuth();
    const handleGoogle = () => {
        googleSignIn()
    }
    const onSubmit = async data => {
        const { email, password } = data
        console.log(data);
        try {
            setLoading(true)
            await login(email, password)
            history.push("/")
        } catch {
            alert("failed to Login")
        }
    };
    // console.log({user});
    console.log({ currentUser });
    return (

        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group id="email">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="email" {...register("email")} placeholder="Email" />
                        </Form.Group>
                        <Form.Group id="Password">
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control type="password" {...register("password", {
                                required: "You must specify a password",
                                minLength: {
                                    value: 6,
                                    message: "Password must have at least 8 characters"
                                }
                            })}
                                placeholder="Password"
                            />
                            {errors.password && <p>{errors.password.message}</p>}
                        </Form.Group>
                        <Button disabled={loading} className="w-100 btn btn-primary mt-2" type="submit">submit</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forget-password">Forget Password?</Link>
                    </div>
                </Card.Body>
                <Button disabled={loading} className="w-100 btn btn-danger mt-2" onClick={handleGoogle}>google</Button>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </Card>
        </>
    );
};

export default Login;
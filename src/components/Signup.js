import { useContext, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import {useAuth} from './useAuth'
const Signup = () => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const {currentUser} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    // initializeAppFream();
    const { googleSignIn, signup, user } = useAuth();
    const handleGoogle = () => {
        googleSignIn()
    }
    const onSubmit = async data => {
        const {email, password} = data
        console.log(data);
        try{
            setLoading(true)
            await signup(email, password)
            history.push("/")
        }catch{
            alert("failed to create an account")
        }
    };
    // console.log({user});
    console.log({currentUser});
    return (

        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
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
                        </Form.Group>
                        <Form.Group id="Confirm Password">
                            <Form.Label>
                                Confirm Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                {...register("confirm_password", {
                                    validate: (value) => {
                                        if (value === getValues('password')) { return true } else { return <span>Password fields don't match</span> }
                                    },
                                    required: "password required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must have at least 6 characters"
                                    }
                                })}
                                placeholder="Confirm Password"
                                required />
                            {errors.confirm_password && <p>{errors.confirm_password.message}</p>}
                        </Form.Group>
                        <Button disabled={loading} className="w-100 btn btn-primary mt-2" type="submit">submit</Button>
                    </Form>
                </Card.Body>
                        <Button disabled={loading} className="w-100 btn btn-danger mt-2" onClick={handleGoogle}>google</Button>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </Card>
        </>
    );
};

export default Signup;

import { useContext, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import { useAuth } from './useAuth'
const ProfileUpdate = () => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const { currentUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    // initializeAppFream();
    const { user, updateProfileEmail, updateProfilePassword } = useAuth();

    const onSubmit = async data => {
        const { email, password } = data
        console.log(data);

        // const promises = []
        setLoading(true)
        try {
            if (email !== user.email) {
               await updateProfileEmail(email)
            }
            if (password) {
                await updateProfilePassword(password)
            }
            history.push('/')
        } catch {
            console.log("error");

        }
        // Promise.all(promises)
        //     .then(() => {
        //         history.push("/")
        //     })
        //     .catch(() => {
        //         console.log("failed to update account");
        //     })
        //     .finally(() => {
        //         setLoading(false)
        //     })
    };

    return (

        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {currentUser?.email}
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group id="email">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="email" {...register("email")} placeholder="Email" defaultValue={user.email} />
                        </Form.Group>
                        <Form.Group id="Password">
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control type="password" {...register("password")}
                                placeholder="Leave blank to keep the same"
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
                                    minLength: {
                                        value: 6,
                                        message: "Password must have at least 6 characters"
                                    }
                                })}
                                placeholder="Leave blank to keep the same" />
                            {errors.confirm_password && <p>{errors.confirm_password.message}</p>}
                        </Form.Group>
                        <Button disabled={loading} className="w-100 btn btn-primary mt-2" type="submit">Update </Button>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center mt-2">
                    <Link to="/">Cancel</Link>
                </div>
            </Card>
        </>
    );
};

export default ProfileUpdate;
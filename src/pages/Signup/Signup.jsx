import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import '../Auth/Auth.css';

function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);

            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            await signup(email, password);
            navigate('/');

        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <>
            <form className="auth-form" onSubmit={handleSubmit}>

            <h1>Sign Up</h1>

            {error && <p className="auth-error">{error}</p>}

            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

            <div className="password-field">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
            </div>

            <div className="password-field">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    {showConfirmPassword ? "Hide" : "Show"}
                </button>
            </div>
                            
            <button type="submit" disabled={loading}>{loading ? 'Creating Account...' : 'Sign Up'}</button>

            <p className="auth-switch">
                Already have an account?{" "}
                <Link to={'/login'}>Sign in</Link>
            </p>

            </form>
        </>
    )
}

export default Signup;
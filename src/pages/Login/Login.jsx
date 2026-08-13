import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import '../Auth/Auth.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/');

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }

    }

    return (
        <>
            <form className="auth-form" onSubmit={handleSubmit}>

                <h1>Sign In</h1>

                {error && <p className="auth-error">{error}</p>}

                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <div className="password-field">
                    <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</button>

                <p className="auth-switch">Don't have an account?{" "}
                    <Link to={'/signup'}>Sign up</Link>
                </p>
            </form>
        </>
    )
}

export default Login;
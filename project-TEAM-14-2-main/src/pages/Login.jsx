import { Link } from "react-router";
function Login(){
    return(
        <div className="login">
            <div className="login-form">
                <form className="form">

                    <span className="input-span">
                        <label htmlFor="email" className="label">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            id="email"
                        />
                    </span>

                    <span className="input-span">
                        <label htmlFor="password" className="label">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            id="password"
                        />
                    </span>

                    <span className="span">
                        <a href="#">Forgot password?</a>
                    </span>

                    <input
                        className="submit"
                        type="submit"
                        value="Log in"
                    />

                    <span className="span">
                        Don't have an account?
                        <Link className="navbar-brand" to="/signup">Signup</Link>
                    </span>

                </form>
            </div>

            <footer>
                <p>&copy; 2026 SoundShelf</p>
            </footer>
        </div>
    )
}

export default Login;
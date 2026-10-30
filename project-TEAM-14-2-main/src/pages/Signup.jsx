function Signup(){
    return(
        <div className="signup">
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

                    <input
                        className="submit"
                        type="submit"
                        value="Sign Up"
                    />

                </form>
            </div>

            <footer>
                <p>&copy; 2026 SoundShelf</p>
            </footer>
        </div>
    )
}

export default Signup;
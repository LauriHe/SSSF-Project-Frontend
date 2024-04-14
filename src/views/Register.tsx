import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Register() {
	const [focusEmail, setFocusEmail] = useState(false);
	const [focusUsername, setFocusUsername] = useState(false);
	const [focusPassword, setFocusPassword] = useState(false);
	const [focusPasswordRepeat, setFocusPasswordRepeat] = useState(false);

	const navigate = useNavigate();
	return (
		<div id="login-container">
			<div id="login-box">
				<h1 id="login-box-title">SSSF Project</h1>
				<form id="login-form">
					<div className="login-form-group">
						<input
							type="email"
							id="login-email"
							className="login-input"
							name="email"
							onFocus={() => setFocusEmail(true)}
							onBlur={() => setFocusEmail(false)}
						/>
						{!focusEmail && <span className="help-block">Email</span>}
					</div>
					<div className="login-form-group">
						<input
							type="text"
							id="login-username"
							className="login-input"
							name="username"
							onFocus={() => setFocusUsername(true)}
							onBlur={() => setFocusUsername(false)}
						/>
						{!focusUsername && (
							<span className="help-block">Username</span>
						)}
					</div>
					<div className="login-form-group">
						<input
							type="password"
							id="login-password"
							className="login-input"
							name="password"
							onFocus={() => setFocusPassword(true)}
							onBlur={() => setFocusPassword(false)}
						/>
						{!focusPassword && (
							<span className="help-block">Password</span>
						)}
					</div>
					<div className="login-form-group">
						<input
							type="password"
							id="login-password-repeat"
							className="login-input"
							name="password-repeat"
							onFocus={() => setFocusPasswordRepeat(true)}
							onBlur={() => setFocusPasswordRepeat(false)}
						/>
						{!focusPasswordRepeat && (
							<span className="help-block">Repeat password</span>
						)}
					</div>
					<div className="w-[15em]">
						<p className="login-link" onClick={() => navigate("/")}>
							{"Already have an account? Login here."}
						</p>
					</div>
					<button
						id="login-button"
						type="submit"
						onClick={() => navigate("/home")}
					>
						Register
					</button>
				</form>
			</div>
		</div>
	);
}

export default Register;

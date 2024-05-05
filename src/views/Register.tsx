import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {doGraphQLFetch} from "../utils/fetch";
import {postUser} from "../utils/queries";
import {RegisterInput, RegisterResponse} from "../types/APITypes";

function Register() {
	const [focusEmail, setFocusEmail] = useState(false);
	const [focusUsername, setFocusUsername] = useState(false);
	const [focusPassword, setFocusPassword] = useState(false);
	const [focusPasswordRepeat, setFocusPasswordRepeat] = useState(false);

	const navigate = useNavigate();
	const initValues: RegisterInput = {
		email: "",
		user_name: "",
		password: "",
		password_repeat: "",
	};
	const [inputs, setInputs] = useState(initValues);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.persist && event.persist();
		setInputs((inputs) => {
			return {
				...inputs,
				[event.target.name]: event.target.value,
			};
		});
	};

	const comparePasswords = () => {
		if (inputs.password !== inputs.password_repeat) {
			setInputs((inputs) => {
				return {
					...inputs,
					password: "",
					password_repeat: "",
				};
			});
			alert("Passwords do not match.");
			return false;
		}
		return true;
	};

	const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!comparePasswords()) return;

		try {
			const response: RegisterResponse = await doGraphQLFetch(postUser, {
				user: {
					email: inputs.email,
					user_name: inputs.user_name,
					password: inputs.password,
				},
			});

			if (response.register.user) {
				navigate("/");
			} else {
				alert(response.register.message);
				setInputs(() => {
					return {
						email: "",
						user_name: "",
						password: "",
						password_repeat: "",
					};
				});
			}
		} catch (error) {
			alert("Invalid credentials");
		}
	};

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
							value={inputs.email}
							onFocus={() => setFocusEmail(true)}
							onBlur={() => {
								if (inputs.email === "") setFocusEmail(false);
							}}
							onChange={handleInputChange}
						/>
						{!focusEmail && <span className="help-block">Email</span>}
					</div>
					<div className="login-form-group">
						<input
							type="text"
							id="login-user-name"
							className="login-input"
							name="user_name"
							value={inputs.user_name}
							onFocus={() => setFocusUsername(true)}
							onBlur={() => {
								if (inputs.user_name === "") setFocusUsername(false);
							}}
							onChange={handleInputChange}
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
							value={inputs.password}
							onFocus={() => setFocusPassword(true)}
							onBlur={() => {
								if (inputs.password === "") setFocusPassword(false);
							}}
							onChange={handleInputChange}
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
							name="password_repeat"
							value={inputs.password_repeat}
							onFocus={() => setFocusPasswordRepeat(true)}
							onBlur={() => {
								if (inputs.password_repeat === "")
									setFocusPasswordRepeat(false);
							}}
							onChange={handleInputChange}
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
					<button id="login-button" type="submit" onClick={handleSubmit}>
						Register
					</button>
				</form>
			</div>
		</div>
	);
}

export default Register;

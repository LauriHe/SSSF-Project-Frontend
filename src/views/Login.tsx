import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ErrorMessage, LoginInput, LoginResponse} from "../types/APITypes";
import {doGraphQLFetch} from "../utils/fetch";
import {loginUser} from "../utils/queries";

function Login() {
	const [focusUserName, setFocusUserName] = useState(false);
	const [focusPassword, setFocusPassword] = useState(false);

	const navigate = useNavigate();
	const initValues: LoginInput = {
		user_name: "",
		password: "",
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

	const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const response: LoginResponse | ErrorMessage = await doGraphQLFetch(
			loginUser,
			{
				credentials: inputs,
			},
		);

		try {
			if ("errors" in response) {
				throw new Error(response.errors.message);
			}
			sessionStorage.setItem("token", response.login.token);
			navigate("/home");
		} catch (err) {
			alert("Invalid credentials");
			setInputs(() => {
				return {
					user_name: "",
					password: "",
				};
			});
		}
	};

	return (
		<div id="login-container">
			<div id="login-box">
				<h1 id="login-box-title">SSSF Project</h1>
				<form id="login-form">
					<div className="login-form-group">
						<input
							type="user_name"
							id="login-user_name"
							className="login-input"
							name="user_name"
							onFocus={() => setFocusUserName(true)}
							onBlur={() => {
								if (inputs.user_name === "") setFocusUserName(false);
							}}
							onChange={handleInputChange}
						/>
						{!focusUserName && (
							<span className="help-block">User Name</span>
						)}
					</div>
					<div className="login-form-group">
						<input
							type="password"
							id="login-password"
							className="login-input"
							name="password"
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
					<div className="w-[15em]">
						<p
							className="login-link"
							onClick={() => navigate("/register")}
						>
							{"Don't have an account? Register here."}
						</p>
					</div>
					<button id="login-button" type="submit" onClick={handleSubmit}>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;

import {FormEvent, useEffect, useState} from "react";
import {
	ModifyUserResponse,
	RegisterInput,
	UploadResponse,
} from "../types/APITypes";
import {doGraphQLFetch, doUploadFetch} from "../utils/fetch";
import {checkToken, deleteUser, putUser} from "../utils/queries";
import {useNavigate} from "react-router-dom";

function Settings() {
	const initValues: RegisterInput = {
		email: "",
		user_name: "",
		password: "",
		password_repeat: "",
	};
	const [inputs, setInputs] = useState(initValues);
	const [image, setImage] = useState<File | null>(null);
	const [token, setToken] = useState<string>("");
	const [profilePic, setProfilePic] = useState<string>("");

	const navigate = useNavigate();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.persist && event.persist();
		setInputs((inputs) => {
			return {
				...inputs,
				[event.target.name]: event.target.value,
			};
		});
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.persist();
		if (event.target.files && event.target.files.length > 0) {
			setImage(event.target.files[0]);
		}
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

	const validateInputs = () => {
		const validatedInputs: {
			email?: string;
			user_name?: string;
			password?: string;
			filename?: string;
		} = {};

		const validationResults = [];

		if (inputs.email !== "") {
			const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
			if (emailRegex.test(inputs.email)) {
				validatedInputs.email = inputs.email;
			} else {
				validationResults.push("Invalid email");
			}
		}

		if (inputs.user_name !== "") {
			if (inputs.user_name.length >= 2 && inputs.user_name.length <= 100) {
				validatedInputs.user_name = inputs.user_name;
			} else {
				validationResults.push(
					"Username must be between 2 and 100 characters",
				);
			}
		}

		if (inputs.password !== "") {
			if (inputs.password === inputs.password_repeat) {
				if (inputs.password.length >= 6 && inputs.password.length <= 100) {
					validatedInputs.password = inputs.password;
				} else {
					validationResults.push(
						"Password must be between 6 and 100 characters",
					);
				}
			} else {
				validationResults.push("Passwords do not match");
			}
		}

		if (validationResults.length > 0) {
			alert(validationResults.join("\n"));
		} else {
			return validatedInputs;
		}
	};

	const doUpload = async () => {
		try {
			const token = sessionStorage.getItem("token");
			if (!token) {
				alert("You must be logged in");
				navigate("/");
				return;
			}

			const user = validateInputs();
			if (!user) {
				return;
			}

			if (image) {
				const imageResponse: UploadResponse = await doUploadFetch(
					image,
					token,
				);
				console.log(imageResponse);
				if (imageResponse.filename) {
					user.filename = imageResponse.filename;
				}
			}

			const response: ModifyUserResponse = await doGraphQLFetch(
				putUser,
				{
					user,
				},
				token,
			);

			if (response.updateUser) {
				alert("User updated successfully");
			} else {
				throw new Error("Error updating user");
			}
			setInputs(() => {
				return {
					user_name: response.updateUser.user.user_name,
					email: response.updateUser.user.email,
					password: "",
					password_repeat: "",
				};
			});
		} catch (error) {
			alert("Error updating user");
			setInputs(() => {
				return {
					...inputs,
					password: "",
					password_repeat: "",
				};
			});
		}
	};

	const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!comparePasswords()) return;
		doUpload();
	};

	const setInitValues = async () => {
		try {
			const token = sessionStorage.getItem("token");
			const response = await doGraphQLFetch(checkToken, {token: token});

			setInputs({
				email: response.checkToken.user.email,
				user_name: response.checkToken.user.user_name,
				password: "",
				password_repeat: "",
			});

			const fileUrl = import.meta.env.VITE_FILE_URL as string;
			const pictureUrl = fileUrl + "/" + response.checkToken.user.filename;
			setProfilePic(pictureUrl);
		} catch (error) {
			console.log("Cannot get user info");
		}
	};

	const deleteAccount = async () => {
		try {
			if (!confirm("Are you sure you want to delete your account?")) return;
			const response = await doGraphQLFetch(deleteUser, {}, token);
			alert(response.deleteUser);
			sessionStorage.removeItem("token");
			navigate("/");
		} catch (error) {
			alert("Error deleting user");
		}
	};

	useEffect(() => {
		const token = sessionStorage.getItem("token");
		if (token) {
			setToken(token);
			setInitValues();
		} else {
			navigate("/");
		}
	}, []);

	return (
		<div id="account-container">
			<div id="profile-container">
				<div>
					<h2>{inputs.user_name}</h2>
					<h3>{inputs.email}</h3>
				</div>
				<img src={profilePic} alt="Profile picture" />
			</div>
			<div id="settings-container">
				<h1 className="text-3xl font-bold self-start">
					Modify Personal Info
				</h1>
				<form id="settings-form">
					<div className="settings-form-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={inputs.email}
							onChange={handleInputChange}
						/>
					</div>
					<div className="settings-form-group">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							name="user_name"
							value={inputs.user_name}
							onChange={handleInputChange}
						/>
					</div>
					<div className="settings-form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							value={inputs.password}
							onChange={handleInputChange}
						/>
					</div>
					<div className="settings-form-group">
						<label htmlFor="repeat-password">Repeat Password</label>
						<input
							type="password"
							id="repeat-password"
							name="password_repeat"
							value={inputs.password_repeat}
							onChange={handleInputChange}
						/>
					</div>
					<div className="settings-form-group">
						<label htmlFor="profile-picture">Profile Picture</label>
						<input
							type="file"
							accept="image/*"
							id="profile-picture"
							name="profile_picture"
							onChange={handleFileChange}
						/>
					</div>
					<button
						id="save-settings-button"
						type="submit"
						onClick={handleSubmit}
					>
						Save Changes
					</button>
				</form>
				<button id="delete-account-button" onClick={deleteAccount}>
					Delete Account
				</button>
			</div>
		</div>
	);
}

export default Settings;

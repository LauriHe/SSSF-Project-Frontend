import {FormEvent, useEffect, useState} from "react";
import {
	ModifyUserResponse,
	RegisterInput,
	UploadResponse,
} from "../types/APITypes";
import {doGraphQLFetch, doUploadFetch} from "../utils/fetch";
import {checkToken, putUser} from "../utils/queries";
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

	const doUpload = async () => {
		const token = sessionStorage.getItem("token");
		if (!token) {
			alert("You must be logged in");
			navigate("/");
			return;
		}

		let imageFilename = "";

		if (image) {
			const imageResponse: UploadResponse = await doUploadFetch(
				image,
				token,
			);
			console.log(imageResponse);
			if (imageResponse.filename) {
				imageFilename = imageResponse.filename;
			}
		}

		const response: ModifyUserResponse = await doGraphQLFetch(
			putUser,
			{
				user: {
					email: inputs.email,
					user_name: inputs.user_name,
					password: inputs.password,
					filename: imageFilename,
				},
			},
			token,
		);

		if (response.updateUser.user) {
			alert("User updated successfully");
			setInputs(() => {
				return {
					user_name: response.updateUser.user.user_name,
					email: response.updateUser.user.email,
					password: "",
					password_repeat: "",
				};
			});
		} else {
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
		const token = sessionStorage.getItem("token");
		const response = await doGraphQLFetch(checkToken, {token: token});
		if (response.checkToken.user) {
			setInputs({
				email: response.checkToken.user.email,
				user_name: response.checkToken.user.user_name,
				password: "",
				password_repeat: "",
			});
		}
	};

	useEffect(() => {
		setInitValues();
	}, []);

	return (
		<div id="settings-container">
			<form id="settings-form">
				<h1>Modify Personal Info</h1>
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
		</div>
	);
}

export default Settings;

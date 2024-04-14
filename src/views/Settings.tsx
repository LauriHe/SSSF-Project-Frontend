function Settings() {
	return (
		<div id="settings-container">
			<div id="settings-form">
				<h1>Modify Personal Info</h1>
				<div className="settings-form-group">
					<label htmlFor="username">Username</label>
					<input type="text" id="username" />
				</div>
				<div className="settings-form-group">
					<label htmlFor="email">Email</label>
					<input type="email" id="email" />
				</div>
				<div className="settings-form-group">
					<label htmlFor="password">Password</label>
					<input type="password" id="password" />
				</div>
				<div className="settings-form-group">
					<label htmlFor="repeat-password">Repeat Password</label>
					<input type="password" id="repeat-password" />
				</div>
				<button id="save-settings-button">Save Changes</button>
			</div>
		</div>
	);
}

export default Settings;

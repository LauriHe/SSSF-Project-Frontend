import {ReactNode, createContext, useState} from "react";
import PropTypes from "prop-types";

const LayoutContext = createContext<{
	refreshProfilePic: boolean;
	setRefreshProfilePic: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

type LayoutProviderProps = {
	children: ReactNode;
};

const LayoutProvider = ({children}: LayoutProviderProps) => {
	const [refreshProfilePic, setRefreshProfilePic] = useState(false);
	return (
		<LayoutContext.Provider value={{refreshProfilePic, setRefreshProfilePic}}>
			{children}
		</LayoutContext.Provider>
	);
};

LayoutProvider.propTypes = {
	children: PropTypes.node,
};

export {LayoutContext, LayoutProvider};

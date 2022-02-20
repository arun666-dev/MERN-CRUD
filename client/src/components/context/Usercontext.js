import { createContext, useState } from "react";

export const User = createContext();

export const UserContext = ({ children }) => {
	const [data, setData] = useState();
	return (
		<>
			<User.Provider value={{ data, setData }}>{{ children }}</User.Provider>
		</>
	);
};

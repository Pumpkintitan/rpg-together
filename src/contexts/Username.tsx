
import React from "react";

export const UsernameContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>] | null>(null);

export const useUsername = () => {
    let val = React.useContext(UsernameContext)
    if (val == null) {
        throw new Error("Cannot use useUsername outside of UsernameContext")
    }
    
    return val;
}
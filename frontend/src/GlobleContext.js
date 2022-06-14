import { createContext, useState } from "react";

export const Context = createContext(null);

const GlobleContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassowrd] = useState();

  return (
    <Context.Provider
      value={{
        currentUser,
        setCurrentUser,
        success,
        setSuccess,
        error,
        setError,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassowrd,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default GlobleContext;

import styled from "styled-components";
import { useContext } from "react";
import { Context } from "./GlobleContext";
import { Link } from "react-router-dom";
import { SiYourtraveldottv } from "react-icons/si";

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(Context);

  // to signout
  const handleSignOut = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <Div>
      {/* // if the user is signed in show the sign out button if not show the rest */}
      {currentUser ? (
        <Button1 onClick={handleSignOut}>sign Out</Button1>
      ) : (
        <Divebuttons>
          <Link to="/signin">
            <Button2>Sign In</Button2>
          </Link>

          <Link to="/:signup">
            <Button3>Sign Up</Button3>
          </Link>
        </Divebuttons>
      )}

      <>
        {currentUser && (
          <Acont>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <H2>
                {" "}
                <SiYourtraveldottv />
              </H2>
              <H1>Travler:</H1>
            </Link>
            {currentUser}
          </Acont>
        )}
      </>
    </Div>
  );
};

const Div = styled.div`
  margin: 5px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;
const Button1 = styled.button`
  border: none;
  border-radius: 6px;
  color: white;
  background-color: brown;
  padding: 5px;
  margin: 5px;
  width: 100px;
  cursor: pointer;
`;
const Button2 = styled.button`
  border: none;
  border-radius: 6px;
  color: white;
  background-color: slateblue;
  padding: 5px;
  margin: 5px;
  width: 100px;
  cursor: pointer;
`;
const Button3 = styled.button`
  border: none;
  border-radius: 6px;
  color: white;
  background-color: green;
  padding: 5px;
  margin: 5px;
  width: 100px;
  cursor: pointer;
`;
const Divebuttons = styled.div`
  top: 0;
  right: 0;
`;

const H1 = styled.h1`
  color: blue;
  border: none;
  border-radius: 10px;
  font-size: 30px;
  height: 30px;
  display: flex;
  align-items: center;
`;
const Acont = styled.p`
  background-color: whitesmoke;
  color: yellowgreen;
  font-size: 25px;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 5px;
  font-weight: bolder;
`;
const H2 = styled.h2`
  color: blue;
  padding: 5px;
  font-size: 30px;
  display: flex;
  align-items: center;
`;
export default Header;

import styled from "styled-components";
import { SiYourtraveldottv } from "react-icons/si";
import { FaSadTear } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./GlobleContext";

const Signin = () => {
  const navigate = useNavigate();
  const {
    setCurrentUser,
    error,
    setError,
    name,
    setName,
    password,
    setPassowrd,
  } = useContext(Context);


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/signIn", {
      body: JSON.stringify({
        name,
        password,
      }),
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("user", res.data.name);
        setCurrentUser(res.data.name);
        setError(false);
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <>
      <Img src="254361.webp" />
      <Container>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo>
            <SiYourtraveldottv />
            Travel
          </Logo>
        </Link>

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="username"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => setPassowrd(e.target.value)}
          />
          <Button>
            <P>Sign In</P>
          </Button>
          {error && (
            <Span>
              <H2>Please try again! </H2>
              <P2>
                <FaSadTear />
              </P2>
            </Span>
          )}
        </form>
      </Container>
    </>
  );
};

export default Signin;

const Img = styled.img`
  width: 100vw;
  height: 100vh;
`;
const Container = styled.div`
  width: 300px;
  height: 200px;
  padding: 20px;
  border-radius: 10px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: whitesmoke;
  flex-direction: column;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-image: url("254361.webp");
`;
const Logo = styled.div`
  color: slateblue;
  font-size: 30px;
  display: flex;
  align-items: center;
  margin-top: -15px;
  font-weight: bolder;
`;
const Input = styled.input`
  margin-bottom: 20px;
  width: 295px;
  border-radius: 10px;
  padding: 5px;
`;
const Button = styled.button`
  width: 200px;
  border: none;
  padding: 10px;
  border-radius: 10px;
  margin-left: 50px;
  color: slateblue;
  background-color: lavender;
  cursor: pointer;
`;
const P = styled.p`
  font-weight: bolder;
  font-family: "Courier New", Courier, monospace;
`;
const H2 = styled.h2`
  color: red;
  font-size: 12px;
  margin-left: 90px;
  display: flex;
  align-items: center;
`;
const Span = styled.span`
  display: flex;
  align-items: center;
`;
const P2 = styled.p`
  padding: 5px;
`;

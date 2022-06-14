import styled from "styled-components";
import { SiYourtraveldottv } from "react-icons/si";
import { FaSadTear } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "./GlobleContext";
import { useContext } from "react";

const Signup = () => {
  const navigate = useNavigate();

  const {
    error,
    setError,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassowrd,
  } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/createUser", {
      body: JSON.stringify({
        name,
        email,
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
      if(res.status === 403){
        return setError(true)

      }
        navigate("/signin");
        setError(false);
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
            required
            type="text"
            placeholder="username"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            required
            type="email"
            placeholder="email@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            required
            type="password"
            placeholder="password"
            onChange={(e) => setPassowrd(e.target.value)}
          />
          <Button>
            <P>Sign Up</P>
          </Button>
          {error && (
            <Span>
              <H2>Please try again!</H2>
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
export default Signup;

const Img = styled.img`
  width: 100vw;
  height: 100vh;
`;
const Container = styled.div`
  width: 300px;
  height: 280px;
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
  margin-bottom: 30px;
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
// const H1 = styled.h1`
//   color: green;
//   font-size: 12px;
//   margin-left: 90px;
// `;
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

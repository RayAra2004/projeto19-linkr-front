import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiAuth from "../Services/apiAuth";
import ResetStyle from "../Styles/ResetStyle";
import useAuth from "../Contexts/UseAuth";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);

    apiAuth
      .login(form)
      .then((response) => {
        setIsLoading(false);
        login(response.data.token, response.data.user);
        navigate("/timeline");
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.message);
      });
  }

  return (
    <>
      <ResetStyle />
      <Container>
        <Banner>
          <div className="txt">
            <h1>linkr</h1>
            <p>save, share and discover the best links on the web</p>
          </div>
        </Banner>

        <FormContainer onSubmit={handleLogin}>
          <input
            data-test="email"
            name="email"
            type="email"
            placeholder="e-mail"
            required
            disabled={isLoading}
            value={form.email}
            onChange={handleForm}
          />
          <input
            data-test="password"
            name="password"
            type="password"
            placeholder="password"
            disabled={isLoading}
            value={form.password}
            onChange={handleForm}
            required
          />
          <button type="submit" disabled={isLoading} data-test="login-btn">
            Log In
          </button>

          <SignupLink
            to="/sign-up"
            style={{ paddingLeft: 13, textDecoration: "none" }}
          >
            <p data-test="sign-up-link">First time? Create an account!</p>
          </SignupLink>
        </FormContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  backgorund-color:  #333333;

 
@media(max-width: 375px ) {
  flex-direction: column;
  align-items: center;

 
}

  
`;

const Banner = styled.h1`
  width: 905px;
  height: 1024px;
  background-color: #151515;
  font-family: "passion one";
  font-weight: 700;
  color: #ffff;
  font-size: 106px;

  .txt {
    margin-top: 301px;
    margin-left: 144px;
  }

  p {
    width: 442px;
    height: 128px;
    font-size: 43px;
  }

@media(max-width: 375px) {
  height: 200px;

  p {
    width: 230px;
    height: 75px;
    font-size: 25px;
   line-height: 34px;


  }

  .txt {
    margin-top: 10px;
 margin-left: 330px;
  }
  

}
 
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 1024px;

  input {
    margin-bottom: 10px;
    padding-left: 10px;
    width: 400px;
    font-family: "passion one";
    height: 65px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-size: 19px;
  }

  button {
    padding: 8px 16px;
    background: #1877f2;
    border-radius: 6px;
    width: 429px;
    height: 65px;
    border: none;
    font-family: "passion one";
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    color: white;
    cursor: pointer;
  }

  @media(max-width: 375px) {
    height: 600px;
    
  
    input {
   
      width: 330px;
      height: 55px;
      border: 1px solid #D5D5D5;
      border-radius: 5px;
      font-size: 19px;
        }

        button {
          width: 330px;
          height: 55px; 
        }
  }
  
`;

const SignupLink = styled(Link)`
  color: #ffff;
  font-family: "passion one";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  text-decoration: none;
  margin-top: 15px;
`;

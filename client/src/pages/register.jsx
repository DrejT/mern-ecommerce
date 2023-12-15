import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <>
      <RegisterForm />
    </>
  );
}

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submiting, setSubmiting] = useState(false);

  function handleRegisterSubmit(){
    setSubmiting(true);
  }

  return (
    <>
      <div className="container" style={{ marginTop: "7rem" }}>
        <div className="row text-center justify-content-center ">
          <div
            className="col-md-4 p-4 border border-dark rounded-4"
            style={{ backgroundColor: "#f9f9f9" }}
          >
            <h3>Sign Up</h3>
            <div className="row">
              <form action="" onSubmit={handleRegisterSubmit}>
                <div className="col mt-4">
                  <label htmlFor="username" className="text-start">
                    Username
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="helloworld"
                      // value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="col mt-4">
                  <label htmlFor="email" className="text-start">
                    E-mail
                    <input
                      type="text"
                      className="form-control"
                      placeholder="example@mail.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="col mt-4">
                  <label htmlFor="password" className="text-start">
                    Password
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <Link to="/login">Already registered?</Link>
                </div>
                <button type="submit" className="btn btn-primary my-2" disabled={submiting}>
                  Primary
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



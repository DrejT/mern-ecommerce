import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <LoginForm />
    </>
  );
}

function LoginForm() {
  return (
    <>
      <div className="container" style={{ marginTop: "7rem" }}>
        <div className="row text-center justify-content-center">
          <div
            className="col-md-4 p-4 border border-dark rounded-4"
            style={{ backgroundColor: "#f9f9f9" }}
          >
            <h3>Login</h3>
            <div className="row row-cols-1">
              <form action="">
                <div className="col">
                  <label htmlFor="username" className="text-start">
                    Username
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="helloworld"
                    />
                  </label>
                </div>
                <div className="col">
                  <label htmlFor="password" className="text-start">
                    Password
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                    />
                  </label>
                </div>
                <div>
                  <Link to="/register">Don't have an account?</Link>
                </div>
                <button type="submit" className="btn btn-primary my-2">
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

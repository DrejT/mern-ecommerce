import "./App.css";
import AppRoutes from "./utils/routes";
import { AuthProvider } from "./utils/authcontext";

function App() {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  );
}

export default App;

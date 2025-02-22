import { ToastContainer } from "react-toastify";
import Rotas from "./routes";
import AuthProvider from "./context/authContexts";

function App() {
  return (
    <AuthProvider>
      <div>
        <Rotas />
        <ToastContainer
          autoClose={5000}
        />
      </div>
    </AuthProvider>
  );
}

export default App;

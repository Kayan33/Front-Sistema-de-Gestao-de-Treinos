import { ToastContainer } from "react-toastify";
import Rotas from "./routes";
import AuthProvider from "./context/authContexts";

function App() {
  return (
    <AuthProvider>
      <Rotas/>
      <ToastContainer
          autoClose={5000}
        />
    </AuthProvider>
  );
}

export default App;

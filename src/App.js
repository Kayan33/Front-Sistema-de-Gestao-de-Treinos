import { ToastContainer } from "react-toastify";
import Rotas from "./routes";

function App() {
  return (
    <div>
      <Rotas/>
      <ToastContainer
          autoClose={5000}
        />
    </div>
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import AppRoutes from "@/routes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

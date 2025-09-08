import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { AuthProvider } from "./Context/AuthContext";
function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <main className="min-h-screen max-w-screen-5xl mx-auto font-primary">
          <Outlet />
        </main>
        <Footer />̥
      </AuthProvider>
    </>
  );
}

export default App;

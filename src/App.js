import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

function App() {
  if (false) return <Navigate to="/login" />;

  return (
    <div style={{ display: "flex" }}>
      <div className="sidebar" id="sidebar">
        <Sidebar />
      </div>
      <div style={{ flexGrow: 1 }}>
        <Header />
        <main className="main" id="detail">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;

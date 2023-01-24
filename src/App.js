import { Outlet, Navigate } from "react-router-dom";

function App() {
  if (true) return <Navigate to="/login" />;

  return (
    <div>
      <div className="sidebar" id="sidebar">
        <></>
      </div>
      <main className="main" id="detail">
        <Outlet />
      </main>
    </div>
  );
}

export default App;

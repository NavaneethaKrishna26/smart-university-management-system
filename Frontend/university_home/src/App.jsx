import React from "react";
import AppRouter from "./routes/AppRouter";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;

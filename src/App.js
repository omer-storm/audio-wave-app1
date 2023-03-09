import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Record from "./Pages/Record";
import CreateRecording from "./Pages/CreateRecording";
import ViewRecordings from "./Pages/ViewRecordings";
import LandingPage from "./Pages/LandingPage";
import Navbar  from "./Components/Navbar";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <div className="container">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Record" element={<Record />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/create" element={<CreateRecording />} />
        <Route path="/dashboard/view" element={<ViewRecordings />} />
      </Routes>
      </div>
    </Provider>
  );
}

export default App;

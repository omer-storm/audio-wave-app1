import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Record from "./Pages/Record";
import CreateRecording from "./Pages/CreateRecording";
import ViewRecordings from "./Pages/ViewRecordings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Record />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/create" element={<CreateRecording />} />
        <Route path="/dashboard/view" element={<ViewRecordings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

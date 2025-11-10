
// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import Home from "./pages/Home";
import AllJobs from "./pages/AllJobs";
import AddJob from "./pages/AddJob";
import MyAddedJobs from "./pages/MyAddedJobs";
import MyAcceptedTasks from "./pages/MyAcceptedTasks";
import JobDetails from "./pages/JobDetails";
import UpdateJob from "./pages/UpdateJob";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import PrivateRoute from "./components/PrivateRoutes"; 

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/allJobs" element={<AllJobs />} />
              <Route
                path="/addJob"
                element={
                  <PrivateRoute>
                    <AddJob />
                  </PrivateRoute>
                }
              />
              <Route
                path="/myAddedJobs"
                element={
                  <PrivateRoute>
                    <MyAddedJobs />
                  </PrivateRoute>
                }
              />
              <Route
                path="/my-accepted-tasks"
                element={
                  <PrivateRoute>
                    <MyAcceptedTasks />
                  </PrivateRoute>
                }
              />
              <Route
                path="/allJobs/:id"
                element={
                  <PrivateRoute>
                    <JobDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path="/updateJob/:id"
                element={
                  <PrivateRoute>
                    <UpdateJob />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </main>

          <Footer />
        </div>

        <ToastContainer position="top-center" autoClose={2000} />
      </Router>
    </AuthProvider>
  );
};
export default App;

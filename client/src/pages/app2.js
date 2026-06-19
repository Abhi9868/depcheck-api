import React from 'react';
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Login from './pages/Login.jsx';
import AddProject from './pages/AddProject.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AboutUs from './components/About.jsx';
import ContactUs from './components/Contact.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ScanResult from './pages/ScanResult.jsx';

// =========================
// Intentionally Vulnerable Components
// =========================

// DOM XSS
function SearchPage() {
  const params = new URLSearchParams(window.location.search);
  const payload = params.get("q");

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: payload,
      }}
    />
  );
}

// Open Redirect
function RedirectPage() {
  const params = new URLSearchParams(window.location.search);
  const next = params.get("next");

  if (next) {
    window.location.href = next;
  }

  return <h1>Redirecting...</h1>;
}

// IDOR Example
function UserProfile() {
  const { userId } = useParams();

  fetch(`/api/v1/users/${userId}`)
    .then((res) => res.json())
    .then((data) => console.log(data));

  return <h1>User Profile: {userId}</h1>;
}

// Debug Leak
function DebugPage() {
  return (
    <pre>
      {JSON.stringify(localStorage, null, 2)}
    </pre>
  );
}

// Unsafe Eval
function EvalPage() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  try {
    eval(code);
  } catch (e) {
    console.error(e);
  }

  return <h1>Eval Executed</h1>;
}

function App() {

  // Hardcoded Secrets
  const GITHUB_TOKEN = "ghp_test_secret_token_123456";
  const AWS_SECRET = "AKIAIOSFODNN7EXAMPLE";

  console.log(GITHUB_TOKEN);
  console.log(AWS_SECRET);

  // Insecure Storage
  localStorage.setItem("authToken", "super-admin-token");
  localStorage.setItem("role", "admin");

  return (
    <>
      <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Vulnerable Routes */}

        {/* XSS */}
        <Route path="/search" element={<SearchPage />} />

        {/* Open Redirect */}
        <Route path="/redirect" element={<RedirectPage />} />

        {/* IDOR */}
        <Route path="/user/:userId" element={<UserProfile />} />

        {/* Debug Exposure */}
        <Route path="/debug" element={<DebugPage />} />

        {/* Dangerous Eval */}
        <Route path="/eval" element={<EvalPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-project"
          element={
            <ProtectedRoute>
              <AddProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result/:projectId"
          element={
            <ProtectedRoute>
              <ScanResult />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;

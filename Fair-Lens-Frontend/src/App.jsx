// import { Routes, Route } from "react-router-dom";
// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import PatientForm from "./pages/PatientForm";
// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   return (
//     // <div className="w-full h-screen bg-primary text-secondary ">
//     <Routes>
//       <Route path="/" element={<Landing />} />
//       <Route path="/login" element={<Login />} />

//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/predict"
//         element={
//           <ProtectedRoute>
//             <PatientForm />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//     // </div>
//   );
// }

import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import AppShell from './app/AppShell.jsx'
import ProtectedRoute from './app/ProtectedRoute.jsx'
import Dashboard from './pages/app/Dashboard.jsx'
import Patients from './pages/app/Patients.jsx'
import PatientDetails from './pages/app/PatientDetails.jsx'
import NewAssessment from './pages/app/NewAssessment.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="patients/:id" element={<PatientDetails />} />
        <Route path="assessment/new" element={<NewAssessment />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
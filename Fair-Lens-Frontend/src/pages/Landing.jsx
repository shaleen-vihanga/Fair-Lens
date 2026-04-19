// import { useNavigate } from "react-router-dom";
// import { BrainCircuit, ShieldCheck, Database, Stethoscope } from "lucide-react";
// import Navbar from "../components/Navbar";
// // import { setView } from "../store/viewStore";

// export default function Landing() {
//   const navigate = useNavigate();

//   return (
//     // <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
//     //   <h1 className="text-4xl font-bold mb-4 text-blue-600">
//     //     Brain Stroke Prediction
//     //   </h1>
//     //   <p className="mb-6 text-gray-600 max-w-xl text-center">
//     //     A clinical decision-support tool designed for doctors to
//     //     assess stroke risk using patient health indicators.
//     //   </p>
//     //   <button
//     //     onClick={() => navigate("/login")}
//     //     className="bg-blue-600 text-white px-6 py-3 rounded"
//     //   >
//     //     Doctor Login
//     //   </button>
//     // </div>
//     <div className="min-h-screen bg-slate-50">
//       {/* Hero Section */}
//       <Navbar/>
//       <section className="max-w-7xl mx-auto px-6 py-24 text-center">
//         <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold mb-8">
//           <BrainCircuit size={18} />
//           Powered by Reinforcement Learning
//         </div>

//         <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
//           Predict Cerebral Stroke
//           <br />
//           <span className="text-blue-600">
//             With Multi-Agent Intelligence
//           </span>
//         </h1>

//         <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
//           A clinical decision support platform for medical professionals,
//           combining Random Forest ensembles with reinforcement learning
//           correction layers to enhance diagnostic accuracy.
//         </p>

//         <div className="flex flex-col sm:flex-row justify-center gap-4">
//           <button
//             onClick={() => navigate("/register")}
//             className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-semibold shadow-lg
//                        hover:shadow-xl hover:scale-[1.03] transition-all duration-200"
//           >
//             Get Started
//           </button>

//           <button
//             onClick={() => navigate("/whitepaper")}
//             className="bg-white border border-slate-200 text-slate-900 px-10 py-4 rounded-2xl
//                        font-semibold hover:bg-slate-100 transition-colors"
//           >
//             Read Whitepaper
//           </button>
//         </div>

//         {/* Features */}
//         <div className="grid gap-8 md:grid-cols-3 mt-28">
//           {FEATURES.map(({ icon: Icon, title, desc }) => (
//             <div
//               key={title}
//               className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm
//                          hover:shadow-md transition-shadow text-left"
//             >
//               <Icon className="text-blue-600 mb-5" size={34} />
//               <h3 className="text-lg font-bold mb-3 text-slate-900">
//                 {title}
//               </h3>
//               <p className="text-slate-500 text-sm leading-relaxed">
//                 {desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// const FEATURES = [
//   {
//     icon: ShieldCheck,
//     title: "HIPAA Compliant",
//     desc: "Enterprise-grade encryption, role-based access, and secure clinician identity verification.",
//   },
//   {
//     icon: Database,
//     title: "Real-time Analytics",
//     desc: "Instant insight into patient population risk profiles and emerging stroke patterns.",
//   },
//   {
//     icon: Stethoscope,
//     title: "Clinically Verified",
//     desc: "Reinforcement correction layers align predictions with established medical guidelines.",
//   },
// ];

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BrainCircuit, Database, ShieldCheck, Stethoscope } from 'lucide-react'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import Navbar from '../components/Navbar.jsx'

export default function Landing() {
  const nav = useNavigate()

  const features = [
    { icon: ShieldCheck, title: "Secure Clinician Access", desc: "Protected routes and mock identity for doctors (frontend demo)." },
    { icon: Database, title: "Patient Records + History", desc: "LocalStorage-backed patient list and assessment log." },
    { icon: Stethoscope, title: "Clinical-Friendly Workflow", desc: "Assessment form + printable report style UI." },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="relative mx-auto max-w-6xl px-4 py-20 text-center">
        {/* Generative background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="mx-auto mt-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="mx-auto -mt-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-black text-blue-700">
          <BrainCircuit size={18} /> POWERED BY MULTI-STAGE RISK PIPELINE
        </div>

        <h1 className="mt-6 text-5xl font-black text-slate-900 sm:text-6xl">
          Brain Stroke Prediction <br />
          <span className="text-blue-600">for Clinical Screening</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          A modern frontend prototype: doctor login, patient records, and a guided assessment form with
          explainable pipeline output.
        </p>

        <div className="mt-10 flex justify-center gap-3">
          <Button variant="blue" className="px-8 py-4" onClick={() => nav('/auth/register')}>
            Get Started
          </Button>
          <Button variant="soft" className="px-8 py-4" onClick={() => nav('/auth/login')}>
            Doctor Login
          </Button>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <Card key={i} className="p-8 text-left">
              <f.icon className="text-blue-600" size={34} />
              <div className="mt-4 text-lg font-black">{f.title}</div>
              <div className="mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
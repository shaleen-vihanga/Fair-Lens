import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          Doctor Dashboard
        </h2>

        <button
          onClick={() => navigate("/predict")}
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Add Patient & Predict Stroke
        </button>
      </div>
    </>
  );
}
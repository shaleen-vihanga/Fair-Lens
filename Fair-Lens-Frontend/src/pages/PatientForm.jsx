import { useState } from "react";
import Navbar from "../components/Navbar";

export default function PatientForm() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const predictStroke = (e) => {
    e.preventDefault();

    // Mock prediction logic
    const risk =
      form.age > 60 || form.hypertension === "1"
        ? "High Risk"
        : "Low Risk";

    setResult(risk);
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Patient Details
        </h2>

        <form onSubmit={predictStroke} className="grid grid-cols-2 gap-4">
          {[
            "patient_id",
            "gender",
            "age",
            "hypertension",
            "heart_disease",
            "ever_married",
            "work_type",
            "Residence_type",
            "avg_glucose_level",
            "bmi",
            "smoking_status",
          ].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field}
              className="p-2 border rounded"
              onChange={handleChange}
            />
          ))}

          <button className="col-span-2 bg-blue-600 text-white py-2 rounded">
            Predict Stroke Risk
          </button>
        </form>

        {result && (
          <div
            className={`mt-6 p-4 rounded text-white ${
              result === "High Risk"
                ? "bg-red-500"
                : "bg-green-500"
            }`}
          >
            Stroke Risk: <strong>{result}</strong>
          </div>
        )}
      </div>
    </>
  );
}
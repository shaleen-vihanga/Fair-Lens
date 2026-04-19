```jsx
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">StrokePredict</span>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Brain Stroke Prediction System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Advanced AI-powered platform for healthcare professionals to assess and predict stroke risk in patients
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-lg"
          >
            Get Started
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-indigo-600 text-4xl mb-4">🏥</div>
            <h3 className="text-xl font-bold mb-2">For Medical Professionals</h3>
            <p className="text-gray-600">
              Designed specifically for doctors to make informed decisions about patient care
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-indigo-600 text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-bold mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600">
              Advanced machine learning algorithms for accurate stroke risk prediction
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-indigo-600 text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Comprehensive Reports</h3>
            <p className="text-gray-600">
              Detailed analysis based on patient health metrics and history
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
```
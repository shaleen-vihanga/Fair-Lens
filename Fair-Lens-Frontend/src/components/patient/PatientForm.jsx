import { useState } from 'react';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { WORK_TYPES, RESIDENCE_TYPES, SMOKING_STATUS, GENDER_OPTIONS } from '@utils/constants';

const PatientForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    gender: '',
    age: '',
    hypertension: false,
    heart_disease: false,
    ever_married: '',
    work_type: '',
    Residence_type: '',
    avg_glucose_level: '',
    bmi: '',
    smoking_status: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Patient ID"
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          placeholder="Enter patient ID"
          required
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select gender</option>
            {GENDER_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <Input
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter age"
          required
        />

        <Input
          label="Average Glucose Level"
          name="avg_glucose_level"
          type="number"
          step="0.01"
          value={formData.avg_glucose_level}
          onChange={handleChange}
          placeholder="mg/dL"
          required
        />

        <Input
          label="BMI"
          name="bmi"
          type="number"
          step="0.1"
          value={formData.bmi}
          onChange={handleChange}
          placeholder="Body Mass Index"
          required
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Work Type <span className="text-red-500">*</span>
          </label>
          <select
            name="work_type"
            value={formData.work_type}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select work type</option>
            {WORK_TYPES.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Residence Type <span className="text-red-500">*</span>
          </label>
          <select
            name="Residence_type"
            value={formData.Residence_type}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select residence type</option>
            {RESIDENCE_TYPES.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Smoking Status <span className="text-red-500">*</span>
          </label>
          <select
            name="smoking_status"
            value={formData.smoking_status}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select smoking status</option>
            {SMOKING_STATUS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ever Married <span className="text-red-500">*</span>
          </label>
          <select
            name="ever_married"
            value={formData.ever_married}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="flex gap-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="hypertension"
            checked={formData.hypertension}
            onChange={handleChange}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="text-sm font-medium text-gray-700">Hypertension</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="heart_disease"
            checked={formData.heart_disease}
            onChange={handleChange}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="text-sm font-medium text-gray-700">Heart Disease</span>
        </label>
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? 'Analyzing...' : 'Predict Stroke Risk'}
        </Button>
      </div>
    </form>
  );
};

export default PatientForm;
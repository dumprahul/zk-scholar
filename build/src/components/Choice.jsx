import bg from '../assets/select.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Choice() {
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  
  // Hook for navigation
  const navigate = useNavigate();

  // Handle university and course selection
  const handleSubmit = () => {
    console.log('Selected University:', selectedUniversity);
    console.log('Selected Course:', selectedCourse);
    navigate('/connectwallet'); // Navigate to /connectwallet
  };

  // Check if both fields are selected
  const isButtonEnabled = selectedUniversity && selectedCourse;

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 className="text-6xl font-bold text-white text-center mb-8">Select University 🌎</h1>
      
      <div className="mb-12">
        <select
          value={selectedUniversity}
          onChange={(e) => setSelectedUniversity(e.target.value)}
          className="bg-transparent text-white border-2 border-white rounded-lg p-4 w-64"
        >
          <option value="" disabled>Select a University</option>
          <option value="University 1">IIT Madras</option>
          <option value="University 2">Loyola College</option>
          <option value="University 3">IIT Patna</option>
          <option value="University 4">SRM Univeristy</option>
        </select>
      </div>

      <h1 className="text-6xl font-bold text-white text-center mb-8">Select Course 📚</h1>
      
      <div className="mb-12">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="bg-transparent text-white border-2 border-white rounded-lg p-4 w-64"
        >
          <option value="" disabled>Select a Course</option>
          <option value="Course 1">Quantum Computing</option>
          <option value="Course 2">Blockchain Technology</option>
          <option value="Course 3">Cryptography</option>
          <option value="Course 4">Aeronautical Engineering</option>
        </select>
      </div>

      <button 
        onClick={handleSubmit} 
        className={`btn ${isButtonEnabled ? 'btn-primary' : 'btn-disabled'}`} 
        disabled={!isButtonEnabled} // Disable the button if fields are not selected
      >
        Submit
      </button>
    </div>
  );
}

import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

export default function App() {
  const [formData, setFormData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (event) => {
    setFormData(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      let parsedData;
      try {
        parsedData = JSON.parse(formData);
      } catch (parseError) {
        console.error('Invalid JSON:', parseError);
        alert('Please enter valid JSON data');
        return;
      }
      
      const response = await axios.post('http://localhost:5000/bfhl', parsedData);
      setResponseData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOptions(Array.from(event.target.selectedOptions, (option) => option.value));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl opacity-50"></div>
        <div className="relative px-4 py-10 bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold text-center mb-8">Bajaj Finserv Processor</h2>
            <div className="space-y-6">
              <div className="relative">
                <textarea
                  className="w-full h-32 bg-gray-700 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter JSON data"
                  value={formData}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button
                className="w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-lg px-4 py-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1"
                onClick={handleSubmit}
              >
                Process Data
              </button>
            </div>
            {responseData && (
              <div className="mt-8 space-y-6">
                <h3 className="text-2xl font-bold">Results</h3>
                <select
                  className="w-full bg-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  multiple
                  onChange={handleOptionChange}
                >
                  <option value="alphabets">Alphabets</option>
                  <option value="numbers">Numbers</option>
                  <option value="highest_alphabet">Highest Alphabet</option>
                </select>
                <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                  {selectedOptions.includes('alphabets') && (
                    <p>Alphabets: <span className="text-purple-400">{responseData.alphabets.join(', ')}</span></p>
                  )}
                  {selectedOptions.includes('numbers') && (
                    <p>Numbers: <span className="text-pink-400">{responseData.numbers.join(', ')}</span></p>
                  )}
                  {selectedOptions.includes('highest_alphabet') && (
                    <p>Highest Alphabet: <span className="text-red-400">{responseData.highest_alphabet.join(', ')}</span></p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
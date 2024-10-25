'use client'
import React, { useState } from 'react';

export default function EmailPredictor() {
  const [emailText, setEmailText] = useState('');
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: emailText }),
      });

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=600)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="min-h-screen flex flex-col items-center justify-center px-4 text-black"
    >
      <div className="max-w-lg w-full bg-white bg-opacity-90 rounded-lg shadow-lg border-2 border-gray-300 p-10 mb-8 min-h-[450px]">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">Email Content Analyzer</h2>
        <p className="text-gray-700 mb-6 text-center">Paste your email content here to receive a tailored analysis and insights</p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="emailText" className="block text-sm font-medium text-gray-700 mb-2">
              Email Body
            </label>
            <textarea
              id="emailText"
              placeholder="Type the content of your email here"
              required
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none min-h-[120px]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-5 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Analyze
          </button>
        </form>
        {prediction && (
          <div className="mt-8 p-5 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="font-semibold text-lg mb-2 text-blue-800">Analysis Result:</h3>
            <p className="text-blue-900">{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
}

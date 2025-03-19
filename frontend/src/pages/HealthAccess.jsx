import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const HealthAccess = () => {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [consultationScheduled, setConsultationScheduled] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState(null);

  //here
  const [stepCount, setStepCount] = useState("");
    const [heartRate, setHeartRate] = useState("");
    const [sleepHours, setSleepHours] = useState("");
    //here
  const handleScheduleConsultation = () => {
    // Simulate consultation scheduling
    setConsultationScheduled(true);
  };

  //here
  const genAI = new GoogleGenerativeAI(
      "AIzaSyBMHffY3LU_bNvkzXP8ULaJvL6A-oTtCDg"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const  handleRunDiagnostics = async (e) => {
      e.preventDefault();
  
      try {
        const prompt = `
          Patient Information:
          - Name: ${patientName}
          - Age: ${age}
          - Symptoms: ${symptoms}
  
          Health Data:
          - Step Count: "Not provided"
          - Heart Rate: "Not provided"
          - Sleep Hours: "Not provided"
  
          Please give what could be medicine that are given by the medical reports.
        `;
  
        const result = await model.generateContent(prompt);
        setSuggestions(result.response.text());
        console.log(result.response.text());
      } catch (error) {
        console.error("Error generating suggestions:", error);
        setSuggestions("Error generating suggestions. Please try again later.");
      }
    };
  
  //here end
  // const handleRunDiagnostics = () => {
  //   // Simulate AI-powered diagnostics
  //   setDiagnosticResults({
  //     diagnosis: "Mild Respiratory Infection",
  //     recommendedCare: "Rest, hydration, and over-the-counter cold medication",
  //   });

  // };

  return (
    <div className="p-4 mx-auto max-w-3xl text-gray-800">
      <h2 className="text-center text-3xl font-semibold py-6 text-gray-700">
        Community Health Platform
      </h2>

      {/* Patient Information */}
      <div className="mb-6">
        <label className="block font-semibold text-gray-600 mb-2">
          Patient Name:
        </label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter Patient Name"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-gray-600 mb-2">Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter Age"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-gray-600 mb-2">
          Symptoms:
        </label>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="border p-2 rounded w-full"
          rows="4"
          placeholder="Describe symptoms here..."
        ></textarea>
      </div>

      {/* Schedule Consultation */}
      <div className="mb-6">
        <button
          onClick={handleScheduleConsultation}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Schedule Virtual Consultation
        </button>
      </div>

      {/* AI Diagnostics */}
      <div className="mb-6">
        <button
          onClick={handleRunDiagnostics}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Run AI Diagnostics
        </button>
      </div>

      {/* Diagnostic Results */}
      {diagnosticResults && (
        <div className="border rounded-lg p-4 mb-6 shadow-md">
          <h3 className="font-semibold text-lg text-gray-700">
            Diagnostic Results
          </h3>
          <p>
            <strong>Diagnosis:</strong> {diagnosticResults.diagnosis}
          </p>
          <p>
            <strong>Recommended Care:</strong>{" "}
            {diagnosticResults.recommendedCare}
          </p>
        </div>
      )}

      {/* Consultation Confirmation */}
      {consultationScheduled && (
        <div className="border rounded-lg p-4 mb-6 shadow-md">
          <h3 className="font-semibold text-lg text-gray-700">
            Consultation Scheduled
          </h3>
          <p>
            A healthcare provider will contact you shortly for a virtual
            consultation.
          </p>
        </div>
      )}

      {/* Preventive Health Resources */}
      <div className="mt-8 border-t pt-4 text-sm text-gray-600">
        <h3 className="font-semibold text-lg text-gray-700">
          Educational Resources
        </h3>
        <ul className="list-disc pl-5">
          <li>
            <strong>Hygiene Tips:</strong> How to maintain personal hygiene to
            prevent infections
          </li>
          <li>
            <strong>Nutrition Advice:</strong> Key dietary tips for boosting
            immunity
          </li>
          <li>
            <strong>Preventive Care:</strong> Steps to prevent common illnesses
          </li>
        </ul>
      </div>

      {/* CSR Note */}
      <div className="mt-6 text-gray-500 text-xs">
        <p>
          As part of our B.Tech minor project's commitment to social responsibility,
          HealthAccess helps underserved communities connect with healthcare
          providers and access essential resources.
        </p>
      </div>
    </div>
  );
};

export default HealthAccess;

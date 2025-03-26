import React, { useState } from "react";

const OpenAIAssistant = () => {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [stepCount, setStepCount] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuggestions("");

    const requestData = {
      patientName,
      age,
      symptoms,
      stepCount: stepCount || null,
      heartRate: heartRate || null,
      sleepHours: sleepHours || null,
    };

    try {
      const response = await fetch("https://minnor-project.onrender.com/api/chat/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuggestions(data.answer);
      } else {
        setError("Failed to fetch suggestions. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h2 className="text-2xl font-bold text-gray-700">Virtual Nursing Assistant</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mt-6 flex flex-col gap-4"
      >
        <label className="text-gray-600 font-medium">Patient Name:</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <label className="text-gray-600 font-medium">Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <label className="text-gray-600 font-medium">Symptoms:</label>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="border p-2 rounded"
          rows="4"
          required
        />

        <label className="text-gray-600 font-medium">Daily Step Count:</label>
        <input
          type="number"
          value={stepCount}
          onChange={(e) => setStepCount(e.target.value)}
          className="border p-2 rounded"
        />

        <label className="text-gray-600 font-medium">Heart Rate (bpm):</label>
        <input
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          className="border p-2 rounded"
        />

        <label className="text-gray-600 font-medium">Sleep Duration (hours):</label>
        <input
          type="number"
          value={sleepHours}
          onChange={(e) => setSleepHours(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Fetching Suggestions..." : "Get Suggestions"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {suggestions && (
        <div className="mt-6 p-4 bg-gray-100 border rounded">
          <h3 className="font-semibold text-lg text-gray-700">
            Suggested Prescription & Cure:
          </h3>
          <pre className="text-gray-600 whitespace-pre-wrap">{suggestions}</pre>
        </div>
      )}
    </div>
  );
};

export default OpenAIAssistant;
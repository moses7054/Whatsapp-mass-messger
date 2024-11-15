"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState(`Write Message Here`);

  const [phoneNumbers, setPhoneNumbers] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [remainingCount, setRemainingCount] = useState(phoneNumbers.length);

  const createWhatsAppLink = (message, phoneNumber) => {
    const baseUrl = "https://api.whatsapp.com/send/?phone=";
    const encodedMessage = encodeURIComponent(message);
    return `${baseUrl}${phoneNumber}&text=${encodedMessage}`;
  };

  const handleSendMessage = () => {
    if (currentIndex < phoneNumbers.length) {
      const link = createWhatsAppLink(message, phoneNumbers[currentIndex]);
      window.open(link, "_blank");
      setCurrentIndex(currentIndex + 1);
      setRemainingCount(phoneNumbers.length - (currentIndex + 1));
    } else {
      alert("All messages have been sent!");
      setCurrentIndex(0);
      setRemainingCount(phoneNumbers.length);
    }
  };

  const handleAddPhoneNumber = () => {
    if (newPhoneNumber && !phoneNumbers.includes(newPhoneNumber)) {
      setPhoneNumbers([...phoneNumbers, newPhoneNumber]);
      setNewPhoneNumber("");
      setRemainingCount((prev) => prev + 1);
    }
  };

  const handleRemovePhoneNumber = (index) => {
    const newPhoneNumbers = phoneNumbers.filter((_, idx) => idx !== index);
    setPhoneNumbers(newPhoneNumbers);
    if (currentIndex > index) {
      setCurrentIndex(currentIndex - 1);
    }
    setRemainingCount(newPhoneNumbers.length - currentIndex);
  };

  const handleBulkPhoneNumbers = (e) => {
    const numbers = e.target.value
      .split("\n")
      .map((num) => num.trim())
      .filter((num) => num);
    if (numbers.length > 0) {
      setPhoneNumbers(numbers);
      setRemainingCount(numbers.length);
      setCurrentIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            WhatsApp Message Sender
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Remaining: {remainingCount} messages
          </p>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Message Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Message Template
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[200px] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Bulk Phone Numbers Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Bulk Add Phone Numbers (one per line)
            </label>
            <textarea
              onChange={handleBulkPhoneNumbers}
              placeholder="Enter phone numbers, one per line"
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Single Phone Number Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Add Single Phone Number
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newPhoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
                placeholder="Enter phone number with country code"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={handleAddPhoneNumber}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
          </div>

          {/* Phone Numbers List */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Phone Numbers ({phoneNumbers.length})
            </label>
            <div className="border border-gray-200 rounded-md">
              <div className="h-48 overflow-y-auto p-4">
                {phoneNumbers.map((phone, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-2 ${
                      index < currentIndex ? "bg-gray-100" : "bg-white"
                    } border-b`}
                  >
                    <span
                      className={
                        index < currentIndex ? "line-through text-gray-500" : ""
                      }
                    >
                      {phone}
                    </span>
                    <button
                      onClick={() => handleRemovePhoneNumber(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium"
          >
            Send Next Message ({currentIndex + 1}/{phoneNumbers.length})
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react'

const HelpAndSupport = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Help & Support</h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions (FAQs)</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-gray-700">How do I list a property on the site?</li>
            <li className="text-gray-700">How can I contact an agent?</li>
            <li className="text-gray-700">What are the fees for using the platform?</li>
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-2">For any inquiries, please reach out to us:</p>
          <p className="text-gray-700 mb-4">
            Email: <a href="mailto:support@realestatesite.com" className="text-blue-600">support@realestatesite.com</a>
          </p>
          <p className="text-gray-700">
            Phone: <a href="tel:+1234567890" className="text-blue-600">+91 9996565000</a>
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Support Hours</h2>
          <p className="text-gray-700">
            Our support team is available from Monday to Friday, 9:00 AM to 5:00 PM (EST).
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport
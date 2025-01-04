import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle form submission logic (e.g., sending data to your backend or email)
    setIsSubmitted(true);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold text-center mb-4">Contact Us</h2>

      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            Send Message
          </button>
        </form>

        {isSubmitted && (
          <div className="mt-4 text-center text-green-600">
            <p>Thank you for reaching out! We'll get back to you soon.</p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <h3 className="font-semibold text-lg">Other Ways to Contact Us:</h3>
        <p>📞 Phone: +1 123 456 7890</p>
        <p>✉️ Email: news247.ac.in</p>
      </div>
    </div>
  );
};

export default ContactUs;

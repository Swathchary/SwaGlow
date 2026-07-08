import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* Left Section */}
        <div className="bg-indigo-600 text-white p-10">
          <h1 className="text-4xl font-bold mb-4">
            Contact Us
          </h1>

          <p className="text-indigo-100 mb-8">
            Have questions or need help? Our team is here to assist you.
          </p>

          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-lg">
                📍 Address
              </h3>
              <p className="text-indigo-100">
                Hyderabad, India
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                📧 Email
              </h3>
              <p className="text-indigo-100">
                support@swaglow.com
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                📞 Phone
              </h3>
              <p className="text-indigo-100">
                +91 98899XXXXX
              </p>
            </div>
          </div>
        </div>


        {/* Form Section */}
        <div className="p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Send a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Send Message
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;
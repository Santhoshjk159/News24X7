import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Brand Section */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold text-red-500">News 24X7</h2>
          <p className="text-sm mt-2 text-gray-400">
            Stay informed, stay ahead – your window to the world
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-red-500"
          >
            <i className="fab fa-facebook-f text-2xl"></i> {/* FontAwesome Icon */}
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-red-500"
          >
            <i className="fab fa-twitter text-2xl"></i> {/* FontAwesome Icon */}
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-red-500"
          >
            <i className="fab fa-instagram text-2xl"></i> {/* FontAwesome Icon */}
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-red-500"
          >
            <i className="fab fa-linkedin-in text-2xl"></i> {/* FontAwesome Icon */}
          </a>
        </div>
      </div>

      <div className="text-center mt-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} News 24X7. All rights reserved.
      </div>
    </footer>
  );
}

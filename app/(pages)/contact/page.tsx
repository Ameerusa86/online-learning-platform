"use client";

import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCode,
  FaServer,
  FaDatabase,
} from "react-icons/fa";

const ContactMe: React.FC = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Get in Touch
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Contact Me</h2>
            <form action="#" method="POST">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 p-3 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 p-3 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Your Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  className="mt-1 p-3 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold text-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Skills & Expertise Section */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-semibold mb-4">
                Skills & Expertise
              </h2>
              <p className="text-lg">
                Here are some of the skills and technologies I specialize in.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Skill icon={<FaCode />} label="Frontend Development" />
              <Skill icon={<FaServer />} label="Backend Development" />
              <Skill icon={<FaDatabase />} label="Database Management" />
              <Skill icon={<FaGithub />} label="Version Control (Git)" />
            </div>

            <div className="flex justify-center lg:justify-start space-x-4 mt-8">
              <SocialLink
                href="https://github.com/Ameerusa86"
                icon={<FaGithub />}
                label="GitHub"
              />
              <SocialLink
                href="https://www.linkedin.com/in/ameer86/"
                icon={<FaLinkedin />}
                label="LinkedIn"
              />
              <SocialLink
                href="mailto:ameer@example.com"
                icon={<FaEnvelope />}
                label="Email"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-transform transform hover:-translate-y-1"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-lg">{label}</span>
    </a>
  );
};

const Skill: React.FC<{ icon: React.ReactNode; label: string }> = ({
  icon,
  label,
}) => {
  return (
    <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <span className="text-teal-500 text-3xl">{icon}</span>
      <span className="text-lg font-medium">{label}</span>
    </div>
  );
};

export default ContactMe;

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FaLocationArrow, FaEnvelope } from 'react-icons/fa'; 
import React from 'react';
import { Navbar } from '../components/storefront/Navbar';

const Contact = () => {
  return (
    <><Navbar /><div className="min-h-screen bg-gradient-to-r from-gray-600 via-gray-700 to-gray-900 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">
          Get In Touch With Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="backdrop-blur-lg bg-white/30 shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Info</h2>
            <p className="text-white/80 mb-4">
              Have any questions? Feel free to reach out to us.
            </p>
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <FaLocationArrow className="text-white/90" />
                <div>
                  <h3 className="text-lg font-medium text-white">Address</h3>
                  <p className="text-white/80">Islamabad, Pakistan</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-white/90" />
                <div>
                  <h3 className="text-lg font-medium text-white">Email</h3>
                  <p className="text-white/80">culturalhatti@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="backdrop-blur-lg bg-white/30 shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-white mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="mt-1 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className="mt-1 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white">
                  Message
                </label>
                <Textarea
                  id="message"
                  rows={4}
                  placeholder="Your Message"
                  className="mt-1 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <Button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;

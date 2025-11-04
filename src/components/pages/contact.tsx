"use client";
import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Inquiry = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all required fields.");
      return;
    }
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("📧 Inquiry submitted:", formData);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
      alert("There was an error sending your message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center text-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="sub-heading mb-4">Thank You!</h1>
          <p className="text-lg text-gray-600">
            Your message has been sent successfully. I'll get back to you soon.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-16"
    >
      <div className="grid md:grid-cols-3 gap-16 items-start pt-16 ">
        <motion.h1
          variants={itemVariants}
          className="layered-heading md:col-span-2"
        >
          Great Work Starts
          <br />
          with a Hello
          <span aria-hidden="true">
            Great Work Starts
            <br />
            with a Hello
          </span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-gray-600 pt-4">
          Great design starts with a conversation. Whether you have a project in
          mind or just want to connect, I'd love to hear from you.
        </motion.p>
      </div>

      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit}
        className="mt-29 grid md:grid-cols-3 gap-8"
      >
        <div className="space-y-4">
          <Input
            name="name"
            placeholder="NAME"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-100 h-14 px-4"
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="EMAIL ADDRESS"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-100 h-14 px-4"
            required
          />
          <Input
            name="phone"
            placeholder="PHONE NUMBER"
            value={formData.phone}
            onChange={handleChange}
            className="bg-gray-100 h-14 px-4"
          />
        </div>
        <div className="md:col-span-2 flex flex-col">
          <Textarea
            name="message"
            placeholder="Tell us what's on your mind—big ideas, small details, or anything in between..."
            value={formData.message}
            onChange={handleChange}
            className="bg-gray-100 border-none flex-grow px-4 py-4 min-h-[150px]"
            required
          />
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              className="bg-periwinkle text-white font-bold text-lg px-8 py-6 rounded-full hover:bg-opacity-90 flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="mr-2 h-5 w-5" />
              )}
              SEND
            </Button>
          </div>
        </div>
      </motion.form>

      <motion.div
        variants={itemVariants}
        className="mt-24 pt-12 border-t border-[var(--border)] grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-sm"
      >
        <div>
          <h4 className="text-gray-400 mb-2">CONTACT ME</h4>
          <p className="font-semibold">hello@mattedigital.com</p>
        </div>
        <div>
          <h4 className="text-gray-400 mb-2">LOCATION</h4>
          <p className="font-semibold">Based in Planet Earth</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

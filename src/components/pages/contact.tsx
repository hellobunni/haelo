"use client";
import { Calendar, Loader2, Mail, Send } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { PopupButton } from "react-calendly";
import { toast } from "sonner";
import HeroSection from "@/components/blocks/HeroSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import contentData from "@/lib/data/content.json";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  const { contact } = contentData;

  // Set root element for Calendly popup (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Use document.body as the root for the popup portal
      setRootElement(document.body);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Sending request to /api/contact");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast.success("Message sent successfully!");
      setSubmitted(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "There was an error sending your message. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <HeroSection
        variant="standard"
        badge={contact.hero.badge}
        title={contact.hero.title}
        description={contact.hero.description}
        maxWidth="max-w-5xl"
        blobs={[
          {
            position: "top-1/4",
            horizontal: "right-1/4",
            color: "bg-thistle",
            animated: false,
          },
        ]}
      />

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Get Started
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Whether you have a detailed brief or just an idea, responses
                  are typically within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-jordy-blue to-jordy-blue flex items-center justify-center shrink-0 shadow-lg shadow-thistle">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-jordy-blue hover:text-dark-purple transition-colors cursor-pointer"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-jordy-blue to-jordy-blue flex items-center justify-center shrink-0 shadow-lg shadow-thistle">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Book a Call
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Schedule a free 30-minute discovery call
                    </p>
                    {rootElement && (
                      <PopupButton
                        url={contact.calendlyUrl}
                        rootElement={rootElement}
                        text="Schedule a Consultation"
                        className="text-jordy-blue hover:text-dark-purple transition-colors cursor-pointer font-medium"
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl p-12 shadow-xl border border-gray-100 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-16 h-16 bg-jordy-blue rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Thank You!
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      Your message has been sent successfully.
                    </p>
                  </motion.div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-linear-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl border border-gray-100"
                >
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="name"
                          className="text-gray-700 font-medium mb-2 block"
                        >
                          Your Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="border-gray-200 focus:border-jordy-blue focus:ring-jordy-blue"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-gray-700 font-medium mb-2 block"
                        >
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          required
                          className="border-gray-200 focus:border-jordy-blue focus:ring-jordy-blue"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="company"
                          className="text-gray-700 font-medium mb-2 block"
                        >
                          Company
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company"
                          className="border-gray-200 focus:border-jordy-blue focus:ring-jordy-blue"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="budget"
                          className="text-gray-700 font-medium mb-2 block"
                        >
                          Budget Range
                        </Label>
                        <Input
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          placeholder="$10k - $50k"
                          className="border-gray-200 focus:border-jordy-blue focus:ring-jordy-blue"
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="message"
                        className="text-gray-700 font-medium mb-2 block"
                      >
                        Project Details *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Share your vision, goals, and any specific requirements..."
                        required
                        rows={6}
                        className="border-gray-200 focus:border-jordy-blue focus:ring-jordy-blue"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isLoading}
                      className="w-full bg-jordy-blue hover:bg-dark-purple text-white rounded-xl shadow-lg shadow-thistle hover:shadow-xl hover:shadow-wisteria transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

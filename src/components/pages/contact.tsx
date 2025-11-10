"use client";
import { Calendar, Loader2, Mail, MessageCircle, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
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

  const { contact } = contentData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill out all required fields.");
      return;
    }
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("📧 Form submitted:", formData);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
      toast.error(
        "There was an error sending your message. Please try again later.",
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

  if (submitted) {
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
        <div className="min-h-[60vh] flex flex-col justify-center items-center text-center max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-gray-600">
              Your message has been sent successfully. We'll get back to you
              within 24 hours.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

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
          <div className="grid lg:grid-cols-5 gap-12">
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
                  Whether you have a detailed brief or just an idea, we'd love
                  to hear from you. We typically respond within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lavender-floral to-lavender-floral flex items-center justify-center flex-shrink-0 shadow-lg shadow-thistle">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Email Us
                    </h3>
                    <a
                      href="mailto:hello@haelostudios.com"
                      className="text-lavender-floral hover:text-dark-purple transition-colors cursor-pointer"
                    >
                      hello@haelostudios.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lavender-floral to-lavender-floral flex items-center justify-center flex-shrink-0 shadow-lg shadow-thistle">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Book a Call
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Schedule a free 30-minute discovery call
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lavender-floral to-lavender-floral flex items-center justify-center flex-shrink-0 shadow-lg shadow-thistle">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Response Time
                    </h3>
                    <p className="text-gray-600 text-sm">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-lavender-floral" />
                    Initial consultation to discuss your needs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-lavender-floral" />
                    Tailored proposal and timeline
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-lavender-floral" />
                    Transparent pricing and process
                  </li>
                </ul>
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
              <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl border border-gray-100"
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
                        className="border-gray-200 focus:border-lavender-floral focus:ring-lavender-floral"
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
                        className="border-gray-200 focus:border-lavender-floral focus:ring-lavender-floral"
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
                        className="border-gray-200 focus:border-lavender-floral focus:ring-lavender-floral"
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
                        className="border-gray-200 focus:border-lavender-floral focus:ring-lavender-floral"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="message"
                      className="text-gray-700 font-medium mb-2 block"
                    >
                      Tell Us About Your Project *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share your vision, goals, and any specific requirements..."
                      required
                      rows={6}
                      className="border-gray-200 focus:border-lavender-floral focus:ring-lavender-floral"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="w-full bg-lavender-floral hover:bg-dark-purple text-white rounded-xl shadow-lg shadow-thistle hover:shadow-xl hover:shadow-wisteria transition-all duration-300 cursor-pointer"
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

                  <p className="text-sm text-gray-500 text-center">
                    By submitting this form, you agree to our privacy policy and
                    terms of service.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";
import { motion } from "motion/react";
import HeroSection from "@/components/blocks/HeroSection";

export default function Privacy() {
  const lastUpdated = "January 1, 2024";

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <HeroSection
        variant="standard"
        badge={{ text: "Privacy Policy", icon: "Shield" }}
        title={{ line1: "Your Privacy", line2: "Matters" }}
        description="Committed to protecting your privacy and ensuring transparency about how I collect, use, and safeguard your information."
        badgeVariant="blank"
        maxWidth="max-w-5xl"
        blobs={[
          {
            position: "top-1/4",
            horizontal: "left-1/4",
            color: "bg-periwinkle-200",
            animated: true,
          },
          {
            position: "top-1/3",
            horizontal: "right-1/4",
            color: "bg-periwinkle-300",
            animated: true,
            delay: 2000,
          },
        ]}
      />

      {/* Privacy Policy Content */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-500 text-sm mb-12">
              Last updated: {lastUpdated}
            </p>

            <div className="prose prose-lg max-w-none space-y-12">
              {/* Introduction */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  1. Introduction
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Haelo Studios ("we," "our," or "us") is committed to protecting
                  your privacy. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you visit our
                  website or use our services. Please read this privacy policy
                  carefully. If you do not agree with the terms of this privacy
                  policy, please do not access the site.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  2. Information We Collect
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      2.1 Information You Provide
                    </h3>
                    <p>
                      We may collect information that you voluntarily provide to
                      us when you:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Contact us through our website or email</li>
                      <li>Fill out contact forms or request consultations</li>
                      <li>Subscribe to our newsletter or communications</li>
                      <li>Engage with our services or client portal</li>
                    </ul>
                    <p className="mt-2">
                      This information may include your name, email address, phone
                      number, company name, project details, and any other
                      information you choose to provide.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      2.2 Automatically Collected Information
                    </h3>
                    <p>
                      When you visit our website, we may automatically collect
                      certain information about your device, including:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>IP address and location data</li>
                      <li>Browser type and version</li>
                      <li>Operating system</li>
                      <li>Pages you visit and time spent on pages</li>
                      <li>Referring website addresses</li>
                      <li>Device identifiers</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      2.3 Cookies and Tracking Technologies
                    </h3>
                    <p>
                      We use cookies and similar tracking technologies to track
                      activity on our website and store certain information.
                      Cookies are files with a small amount of data which may
                      include an anonymous unique identifier. You can instruct
                      your browser to refuse all cookies or to indicate when a
                      cookie is being sent.
                    </p>
                  </div>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use the information we collect for various purposes,
                  including:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600 leading-relaxed">
                  <li>
                    To provide, maintain, and improve our services and website
                  </li>
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To send you updates, newsletters, and marketing communications (with your consent)</li>
                  <li>To process transactions and manage client relationships</li>
                  <li>To analyze website usage and improve user experience</li>
                  <li>To detect, prevent, and address technical issues</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              {/* Information Sharing */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  4. Information Sharing and Disclosure
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    We do not sell, trade, or rent your personal information to
                    third parties. We may share your information only in the
                    following circumstances:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>
                      <strong>Service Providers:</strong> We may share information
                      with third-party service providers who perform services on
                      our behalf, such as hosting, analytics, email delivery, and
                      payment processing.
                    </li>
                    <li>
                      <strong>Legal Requirements:</strong> We may disclose your
                      information if required to do so by law or in response to
                      valid requests by public authorities.
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> In the event of a
                      merger, acquisition, or sale of assets, your information may
                      be transferred as part of that transaction.
                    </li>
                    <li>
                      <strong>With Your Consent:</strong> We may share your
                      information with your explicit consent for any other purpose.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  5. Data Security
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We implement appropriate technical and organizational security
                  measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                  However, no method of transmission over the Internet or
                  electronic storage is 100% secure. While we strive to use
                  commercially acceptable means to protect your information, we
                  cannot guarantee absolute security.
                </p>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  6. Your Privacy Rights
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Depending on your location, you may have certain rights
                  regarding your personal information, including:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600 leading-relaxed">
                  <li>
                    <strong>Access:</strong> The right to request access to your
                    personal information
                  </li>
                  <li>
                    <strong>Correction:</strong> The right to request correction of
                    inaccurate or incomplete information
                  </li>
                  <li>
                    <strong>Deletion:</strong> The right to request deletion of
                    your personal information
                  </li>
                  <li>
                    <strong>Objection:</strong> The right to object to processing
                    of your personal information
                  </li>
                  <li>
                    <strong>Data Portability:</strong> The right to request
                    transfer of your data to another service
                  </li>
                  <li>
                    <strong>Withdraw Consent:</strong> The right to withdraw
                    consent where we rely on consent to process your information
                  </li>
                </ul>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  To exercise these rights, please contact us using the
                  information provided in the "Contact Us" section below.
                </p>
              </section>

              {/* Third-Party Links */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  7. Third-Party Links
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Our website may contain links to third-party websites or
                  services that are not owned or controlled by Haelo Studios. We
                  are not responsible for the privacy practices of these
                  third-party sites. We encourage you to review the privacy
                  policies of any third-party sites you visit.
                </p>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  8. Children's Privacy
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Our services are not directed to individuals under the age of
                  18. We do not knowingly collect personal information from
                  children. If you become aware that a child has provided us with
                  personal information, please contact us, and we will take steps
                  to delete such information.
                </p>
              </section>

              {/* Changes to Privacy Policy */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  9. Changes to This Privacy Policy
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date. You are advised
                  to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              {/* Contact Us */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  10. Contact Us
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our
                  privacy practices, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 space-y-2 text-gray-600">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:hello@haelostudios.com"
                      className="text-jordy-blue hover:underline"
                    >
                      hello@haelostudios.com
                    </a>
                  </p>
                  <p>
                    <strong>Website:</strong>{" "}
                    <a
                      href="https://haelostudios.com"
                      className="text-jordy-blue hover:underline"
                    >
                      https://haelostudios.com
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


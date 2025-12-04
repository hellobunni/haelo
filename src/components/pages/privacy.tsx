"use client";
import { motion } from "motion/react";
import HeroSection from "@/components/sections/shared/HeroSection";

export default function Privacy() {
  const lastUpdated = "January 1, 2024";

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <HeroSection
        variant="standard"
        badge={{ text: "Privacy Policy", icon: "Shield" }}
        title={{ line1: "Your Privacy", line2: "Matters" }}
        description="Committed to protecting your privacy and ensuring transparency about how information is collected, used, and safeguarded."
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
                  Haelo Studios is committed to protecting your privacy. This
                  Privacy Policy explains how information is collected, used,
                  disclosed, and safeguarded when you visit the website or use
                  the services. Please read this privacy policy carefully. If
                  you do not agree with the terms of this privacy policy, please
                  do not access the site.
                </p>
              </section>

              {/* Information Collected */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  2. Information Collected
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      2.1 Information You Provide
                    </h3>
                    <p>
                      Information may be collected that you voluntarily provide
                      when you:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Contact through the website or email</li>
                      <li>Fill out contact forms or request consultations</li>
                      <li>Subscribe to the newsletter or communications</li>
                      <li>Engage with the services or client portal</li>
                    </ul>
                    <p className="mt-2">
                      This information may include your name, email address,
                      phone number, company name, project details, and any other
                      information you choose to provide.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      2.2 Automatically Collected Information
                    </h3>
                    <p>
                      When you visit the website, certain information may be
                      automatically collected about your device, including:
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
                      Cookies and similar tracking technologies are used to
                      track activity on the website and store certain
                      information. Cookies are files with a small amount of data
                      which may include an anonymous unique identifier. You can
                      instruct your browser to refuse all cookies or to indicate
                      when a cookie is being sent.
                    </p>
                  </div>
                </div>
              </section>

              {/* How Your Information Is Used */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  3. How Your Information Is Used
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The information collected is used for various purposes,
                  including:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600 leading-relaxed">
                  <li>
                    To provide, maintain, and improve the services and website
                  </li>
                  <li>
                    To respond to your inquiries and provide customer support
                  </li>
                  <li>
                    To send you updates, newsletters, and marketing
                    communications (with your consent)
                  </li>
                  <li>
                    To process transactions and manage client relationships
                  </li>
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
                    Personal information is not sold, traded, or rented to third
                    parties. Information may be shared only in the following
                    circumstances:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>
                      <strong>Service Providers:</strong> Information may be
                      shared with third-party service providers who perform
                      services, such as hosting, analytics, email delivery, and
                      payment processing.
                    </li>
                    <li>
                      <strong>Legal Requirements:</strong> Information may be
                      disclosed if required to do so by law or in response to
                      valid requests by public authorities.
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> In the event of a
                      merger, acquisition, or sale of assets, your information
                      may be transferred as part of that transaction.
                    </li>
                    <li>
                      <strong>With Your Consent:</strong> Information may be
                      shared with your explicit consent for any other purpose.
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
                  Appropriate technical and organizational security measures are
                  implemented to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                  However, no method of transmission over the Internet or
                  electronic storage is 100% secure. While commercially
                  acceptable means are used to protect your information,
                  absolute security cannot be guaranteed.
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
                    <strong>Correction:</strong> The right to request correction
                    of inaccurate or incomplete information
                  </li>
                  <li>
                    <strong>Deletion:</strong> The right to request deletion of
                    your personal information
                  </li>
                  <li>
                    <strong>Objection:</strong> The right to object to
                    processing of your personal information
                  </li>
                  <li>
                    <strong>Data Portability:</strong> The right to request
                    transfer of your data to another service
                  </li>
                  <li>
                    <strong>Withdraw Consent:</strong> The right to withdraw
                    consent where consent is relied upon to process your
                    information
                  </li>
                </ul>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  To exercise these rights, please contact using the information
                  provided in the "Contact" section below.
                </p>
              </section>

              {/* Third-Party Links */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  7. Third-Party Links
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  The website may contain links to third-party websites or
                  services that are not owned or controlled by Haelo Studios.
                  The privacy practices of these third-party sites are not the
                  responsibility of Haelo Studios. Reviewing the privacy
                  policies of any third-party sites you visit is encouraged.
                </p>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  8. Children's Privacy
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  The services are not directed to individuals under the age of
                  18. Personal information is not knowingly collected from
                  children. If you become aware that a child has provided
                  personal information, please contact, and steps will be taken
                  to delete such information.
                </p>
              </section>

              {/* Changes to Privacy Policy */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  9. Changes to This Privacy Policy
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  The Privacy Policy may be updated from time to time. You will
                  be notified of any changes by posting the new Privacy Policy
                  on this page and updating the "Last updated" date. You are
                  advised to review this Privacy Policy periodically for any
                  changes.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  10. Contact
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or privacy
                  practices, please contact:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 space-y-2 text-gray-600">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:hello@haelostudios.com"
                      className="text-jordy-blue hover:underline"
                    >
                      hello[at]haelostudios[dot]com
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

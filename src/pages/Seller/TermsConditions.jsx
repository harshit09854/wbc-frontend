import React from "react";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 mb-10 text-center">
          Welcome to{" "}
          <span className="font-semibold">Women Business Circle (WBC)</span>.
          Please read these Terms and Conditions carefully before registering or
          using our platform.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              1. Acceptance of Terms
            </h2>
            <p>
              By creating an account or using any services on the WBC platform,
              you agree to be bound by these Terms and Conditions and our
              Privacy Policy. If you do not agree, please refrain from using the
              platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              2. Purpose of the Platform
            </h2>
            <p>
              Women Business Circle (WBC) is a digital community dedicated to
              supporting and empowering women entrepreneurs by providing tools,
              resources, and opportunities to promote their businesses and
              products.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              3. Member Responsibilities
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide accurate and complete registration details.</li>
              <li>
                Ensure that all products or services listed comply with legal,
                safety, and ethical standards.
              </li>
              <li>
                Maintain respectful and professional communication with
                customers and other members.
              </li>
              <li>
                Avoid any misleading, fraudulent, or inappropriate activities
                that may harm WBC’s reputation or its members.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              4. Product Listings and Sales
            </h2>
            <p>
              Sellers are responsible for the accuracy, quality, and delivery of
              their products. WBC acts only as a connecting platform and does
              not take responsibility for product disputes, payments, or
              delivery delays between buyers and sellers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              5. Payments and Commissions
            </h2>
            <p>
              All transactions processed through WBC must follow our secure
              payment guidelines. Sellers agree that payment settlements may
              take up to 7–10 business days after successful order completion.
              Any commission structures will be clearly communicated and are
              subject to change with prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              6. Intellectual Property
            </h2>
            <p>
              All content, branding, and materials on the WBC platform remain
              the property of Women Business Circle. Members may not copy,
              distribute, or modify platform materials without written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              7. Termination of Account
            </h2>
            <p>
              WBC reserves the right to suspend or terminate accounts that
              violate these Terms, engage in fraudulent activity, or harm the
              integrity of the platform or its community.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              8. Limitation of Liability
            </h2>
            <p>
              WBC shall not be held liable for any direct, indirect, or
              incidental damages resulting from use of the platform or
              interactions between members, buyers, and sellers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              9. Amendments
            </h2>
            <p>
              WBC may update these Terms and Conditions at any time. Members
              will be notified of significant changes through email or on the
              platform. Continued use after updates constitutes acceptance of
              the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              10. Contact Us
            </h2>
            <p>
              For any questions or concerns regarding these Terms and
              Conditions, please contact us at{" "}
              <span className="font-semibold text-blue-600">
                support@womenbusinesscircle.com
              </span>
              .
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-8 text-center">
            © {new Date().getFullYear()} Women Business Circle. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;

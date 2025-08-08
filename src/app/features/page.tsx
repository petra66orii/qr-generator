import React from "react";

const FeaturesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Features</h1>
      <p className="text-lg mb-4">
        Explore the powerful features of our QR Code Generator and Design
        Advisor platform.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <div className="p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">
            AI-Powered QR Code Design
          </h2>
          <p>
            Leverage advanced AI to create visually appealing and functional QR
            codes tailored to your brand.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">
            Customizable Templates
          </h2>
          <p>
            Choose from a variety of templates and customize colors, shapes, and
            patterns to suit your needs.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Real-Time Preview</h2>
          <p>
            Instantly preview your QR code designs to ensure they meet your
            expectations before finalizing.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">
            Mobile-Friendly Interface
          </h2>
          <p>
            Access and use the platform seamlessly on any device, ensuring
            convenience and flexibility.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Secure and Reliable</h2>
          <p>
            Your data is protected with industry-standard security measures,
            ensuring peace of mind.
          </p>
        </div>

        {/* Feature 6 */}
        <div className="p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">
            Integration with Firebase
          </h2>
          <p>
            Enjoy seamless integration with Firebase for authentication,
            database, and hosting solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;

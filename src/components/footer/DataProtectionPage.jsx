import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldIcon, LockIcon, DatabaseIcon, ServerIcon } from "lucide-react";

const DataProtection = () => {
  const protectionMeasures = [
    {
      icon: ShieldIcon,
      title: "Comprehensive Security Framework",
      description:
        "Multi-layered protection strategy to safeguard user data and platform integrity.",
    },
    {
      icon: LockIcon,
      title: "Encryption Protocols",
      description:
        "Advanced encryption for data at rest and in transit using industry-standard algorithms.",
    },
    {
      icon: DatabaseIcon,
      title: "Data Minimization",
      description:
        "Collect and retain only essential information required for platform functionality.",
    },
    {
      icon: ServerIcon,
      title: "Secure Infrastructure",
      description:
        "Hosted on secure, compliant cloud infrastructure with redundant security measures.",
    },
  ];

  const renderListSection = (title, items, isStrong = false) => (
    <section className='mb-8'>
      <h2
        className='text-xl md:text-2xl font-semibold mb-4 
        text-gray-900 dark:text-gray-100'
      >
        {title}
      </h2>
      <ul
        className='list-disc list-outside pl-5 
        marker:text-indigo-600 dark:marker:text-indigo-400'
      >
        {items.map((item, index) => (
          <li key={index} className='mb-2 text-gray-800 dark:text-gray-300'>
            {isStrong && typeof item === "object" ? (
              <>
                <strong>{item.label}:</strong> {item.description}
              </>
            ) : (
              item
            )}
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen bg-gradient-to-br 
        from-blue-50 via-indigo-50 to-purple-50 
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'
    >
      <Navbar />
      <div className='container mx-auto px-4 py-16 md:py-24 max-w-4xl'>
        <h1
          className='text-3xl md:text-4xl font-bold mb-8 
          text-transparent bg-clip-text 
          bg-gradient-to-r from-indigo-600 to-purple-600 
          dark:from-indigo-400 dark:to-purple-400'
        >
          Data Protection
        </h1>

        <div
          className='prose prose-sm sm:prose-base 
          dark:prose-invert 
          prose-headings:text-gray-900 dark:prose-headings:text-gray-100
          prose-p:text-gray-700 dark:prose-p:text-gray-300
          prose-li:text-gray-800 dark:prose-li:text-gray-300'
        >
          <section className='mb-8'>
            <h2
              className='text-xl md:text-2xl font-semibold mb-4 
      text-gray-900 dark:text-gray-100'
            >
              Our Data Protection Commitment
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              We are dedicated to protecting your personal information through
              rigorous security practices and transparent policies.
            </p>
          </section>

          <section className='mb-8'>
            <h2
              className='text-xl md:text-2xl font-semibold mb-4 
      text-gray-900 dark:text-gray-100'
            >
              Key Protection Measures
            </h2>
            <div className='grid md:grid-cols-2 gap-6'>
              {protectionMeasures.map((measure, index) => (
                <div
                  key={index}
                  className='bg-white dark:bg-gray-800 p-6 rounded-xl 
          shadow-md hover:shadow-lg transition-all'
                >
                  <measure.icon
                    className='text-indigo-600 dark:text-indigo-400 mb-4'
                    size={48}
                  />
                  <h3 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white'>
                    {measure.title}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-300'>
                    {measure.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {renderListSection(
            "Data Management Principles",
            [
              {
                label: "Consent",
                description:
                  "Obtain explicit consent before collecting personal data",
              },
              {
                label: "Transparency",
                description: "Clear communication about data usage and storage",
              },
              {
                label: "Purpose Limitation",
                description:
                  "Data collected only for specific, legitimate purposes",
              },
              {
                label: "Data Accuracy",
                description: "Regular updates and correction mechanisms",
              },
              {
                label: "Storage Limitation",
                description: "Data retained only as long as necessary",
              },
            ],
            true
          )}

          {renderListSection("User Data Rights", [
            "Right to access your personal data",
            "Right to request data deletion",
            "Right to data portability",
            "Right to restrict data processing",
            "Right to object to data processing",
          ])}

          <section className='mb-8'>
            <h2 className='text-xl md:text-2xl font-semibold mb-4 dark:text-gray-100'>
              Compliance Standards
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              We adhere to international data protection regulations, including:
            </p>
            {renderListSection("", [
              "General Data Protection Regulation (GDPR)",
              "California Consumer Privacy Act (CCPA)",
              "International Security Standards",
            ])}
          </section>

          <section
            className='mt-12 space-y-2 
            text-gray-600 dark:text-gray-400'
          >
            <p className='text-xs sm:text-sm'>Last Updated: December 2024</p>
            <p className='text-xs sm:text-sm'>
              Contact our Data Protection Officer at
              dataprotection@fundraisinghub.com
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default DataProtection;

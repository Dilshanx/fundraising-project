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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900'
    >
      <Navbar />
      <div className='container mx-auto px-4 py-24 max-w-4xl'>
        <h1 className='text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400'>
          Data Protection
        </h1>
        <div className='prose dark:prose-invert'>
          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>
              Our Data Protection Commitment
            </h2>
            <p>
              We are dedicated to protecting your personal information through
              rigorous security practices and transparent policies.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>
              Key Protection Measures
            </h2>
            <div className='grid md:grid-cols-2 gap-6'>
              {protectionMeasures.map((measure, index) => (
                <div
                  key={index}
                  className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all'
                >
                  <measure.icon
                    className='text-indigo-600 dark:text-indigo-400 mb-4'
                    size={48}
                  />
                  <h3 className='text-xl font-semibold mb-2 dark:text-white'>
                    {measure.title}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-300'>
                    {measure.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>
              Data Management Principles
            </h2>
            <ul>
              <li>
                <strong>Consent:</strong> We obtain explicit consent before
                collecting personal data
              </li>
              <li>
                <strong>Transparency:</strong> Clear communication about data
                usage and storage
              </li>
              <li>
                <strong>Purpose Limitation:</strong> Data collected only for
                specific, legitimate purposes
              </li>
              <li>
                <strong>Data Accuracy:</strong> Regular updates and correction
                mechanisms
              </li>
              <li>
                <strong>Storage Limitation:</strong> Data retained only as long
                as necessary
              </li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>User Data Rights</h2>
            <ul>
              <li>Right to access your personal data</li>
              <li>Right to request data deletion</li>
              <li>Right to data portability</li>
              <li>Right to restrict data processing</li>
              <li>Right to object to data processing</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>
              Compliance Standards
            </h2>
            <p>
              We adhere to international data protection regulations, including:
            </p>
            <ul>
              <li>General Data Protection Regulation (GDPR)</li>
              <li>California Consumer Privacy Act (CCPA)</li>
              <li>International Security Standards</li>
            </ul>
          </section>

          <section className='mt-12'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Last Updated: December 2024
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
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

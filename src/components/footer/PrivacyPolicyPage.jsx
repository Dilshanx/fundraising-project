import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const PrivacyPolicy = () => {
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
          Privacy Policy
        </h1>
        <div className='prose dark:prose-invert'>
          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>
              1. Information We Collect
            </h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul>
              <li>
                Personal identification information (Name, email address, phone
                number)
              </li>
              <li>Financial information for donations and transactions</li>
              <li>Campaign and fundraising related details</li>
              <li>Communication and support interactions</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>
              2. How We Use Your Information
            </h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Process donations and financial transactions</li>
              <li>Communicate about campaigns and platform updates</li>
              <li>Provide customer support</li>
              <li>Improve our platform and services</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>3. Data Protection</h2>
            <p>
              We implement comprehensive security measures to protect your data:
            </p>
            <ul>
              <li>
                Encryption of sensitive personal and financial information
              </li>
              <li>Secure server infrastructure</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Restricted access to personal information</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>4. Data Sharing</h2>
            <p>
              We do not sell or rent your personal information. We may share
              data with:
            </p>
            <ul>
              <li>Service providers necessary for platform operations</li>
              <li>Legal authorities when required by law</li>
              <li>With your explicit consent for specific purposes</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Opt-out of marketing communications</li>
              <li>Lodge a complaint with data protection authorities</li>
            </ul>
          </section>

          <section className='mt-12'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Last Updated: December 2024
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Contact our Data Protection Officer at privacy@fundraisinghub.com
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};
export default PrivacyPolicy;

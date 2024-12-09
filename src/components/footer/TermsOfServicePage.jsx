import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const TermsOfService = () => {
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
          Terms of Service
        </h1>
        <div className='prose dark:prose-invert'>
          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using our platform, you agree to these terms. If
              you do not agree, do not use our services.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>2. User Accounts</h2>
            <ul>
              <li>Users must provide accurate and complete information</li>
              <li>One account per individual is permitted</li>
              <li>
                Users are responsible for maintaining account confidentiality
              </li>
              <li>Accounts cannot be transferred or sold</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>
              3. Campaign Guidelines
            </h2>
            <p>Campaigns must:</p>
            <ul>
              <li>Be legal and ethical</li>
              <li>Not promote hate, violence, or discrimination</li>
              <li>Provide accurate and truthful information</li>
              <li>Comply with local and international laws</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>
              4. Financial Transactions
            </h2>
            <ul>
              <li>All donations are final and non-refundable</li>
              <li>Platform takes a small percentage as service fee</li>
              <li>Funds are transferred to campaign creators periodically</li>
              <li>Transparent financial reporting is mandatory</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>5. User Conduct</h2>
            <p>Users shall not:</p>
            <ul>
              <li>Use the platform for fraudulent activities</li>
              <li>Harass or intimidate other users</li>
              <li>Upload malicious content</li>
              <li>Violate intellectual property rights</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>
              6. Limitation of Liability
            </h2>
            <p>
              Our platform is provided "as is" without warranties. We are not
              liable for:
            </p>
            <ul>
              <li>Campaign outcomes</li>
              <li>User interactions</li>
              <li>External links or resources</li>
              <li>Indirect or consequential damages</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>7. Termination</h2>
            <p>We reserve the right to:</p>
            <ul>
              <li>Suspend or terminate accounts</li>
              <li>Remove campaigns</li>
              <li>Modify or discontinue services</li>
              <li>Refuse service to anyone</li>
            </ul>
          </section>

          <section className='mt-12'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Last Updated: December 2024
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Contact our Legal Team at legal@fundraisinghub.com
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};
export default TermsOfService;

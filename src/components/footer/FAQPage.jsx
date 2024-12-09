import { useState } from "react";
import { motion } from "framer-motion";
import {
  HelpCircleIcon,
  RocketIcon,
  ShieldIcon,
  UsersIcon,
  DollarSignIcon,
  MessageCircleIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("general");

  const faqCategories = [
    {
      id: "general",
      icon: HelpCircleIcon,
      title: "General Questions",
      description: "Common queries about our fundraising platform",
    },
    {
      id: "account",
      icon: UsersIcon,
      title: "Account Management",
      description: "User registration, profiles, and authentication",
    },
    {
      id: "campaigns",
      icon: RocketIcon,
      title: "Campaign Management",
      description: "Creating, managing, and tracking campaigns",
    },
    {
      id: "donations",
      icon: DollarSignIcon,
      title: "Donations & Payments",
      description: "Donation processing and financial details",
    },
    {
      id: "security",
      icon: ShieldIcon,
      title: "Security & Privacy",
      description: "Data protection and compliance measures",
    },
    {
      id: "support",
      icon: MessageCircleIcon,
      title: "Support & Assistance",
      description: "Getting help and resolving issues",
    },
  ];

  const faqContent = {
    general: [
      {
        question: "What is our Crowdsourced Fundraising Platform?",
        answer:
          "A comprehensive web-based solution that enables individuals and organizations to create, manage, and promote fundraising campaigns with ease and effectiveness.",
      },
      {
        question: "Who can use the platform?",
        answer:
          "Anyone can use our platform, including individuals, non-profits, community groups, and social entrepreneurs looking to raise funds for various causes.",
      },
      {
        question: "Is there a fee for using the platform?",
        answer:
          "We offer both free and premium tiers. Basic campaign creation is free, with additional features available in our premium plans.",
      },
    ],
    account: [
      {
        question: "How do I create an account?",
        answer:
          "You can register using email-based authentication or social media login. The process is quick, simple, and takes less than 2 minutes.",
      },
      {
        question: "What authentication methods are supported?",
        answer:
          "We support email registration, Google Sign-In, Facebook Login, and Apple ID for convenient account creation.",
      },
      {
        question: "Can I have multiple user roles?",
        answer:
          "Yes, users can have different roles such as campaign creator, donor, or administrator, with specific access controls for each role.",
      },
    ],
    campaigns: [
      {
        question: "How easy is it to create a fundraising campaign?",
        answer:
          "Our user-friendly campaign wizard guides you through each step, allowing you to set goals, choose deadlines, and customize your campaign's appearance.",
      },
      {
        question: "What types of campaigns can I create?",
        answer:
          "You can create campaigns for various causes including education, healthcare, community development, environmental initiatives, and personal fundraising needs.",
      },
      {
        question: "Can I track my campaign's progress?",
        answer:
          "Absolutely! Our platform provides a dedicated dashboard with real-time tracking, visual progress indicators, and comprehensive analytics.",
      },
    ],
    donations: [
      {
        question: "What payment methods are supported?",
        answer:
          "We support multiple payment gateways including credit/debit cards, PayPal, and other popular digital payment methods.",
      },
      {
        question: "Are donation receipts provided?",
        answer:
          "Donors receive immediate digital receipts after their contribution, ensuring transparency and easy record-keeping.",
      },
      {
        question: "Is there a minimum donation amount?",
        answer:
          "Donation amounts vary, but we encourage contributions of all sizes. Our platform supports micro-donations starting from as little as $1.",
      },
    ],
    security: [
      {
        question: "How secure is my personal and financial information?",
        answer:
          "We implement end-to-end encryption, fraud prevention mechanisms, and regular security audits to protect user data.",
      },
      {
        question: "Do you comply with data protection regulations?",
        answer:
          "Yes, we adhere to GDPR, CCPA, and other international data protection standards to ensure user privacy and data security.",
      },
      {
        question: "How do you prevent fraudulent activities?",
        answer:
          "Our advanced fraud detection system uses AI and machine learning to identify and block suspicious transactions and activities.",
      },
    ],
    support: [
      {
        question: "What support options are available?",
        answer:
          "We offer a comprehensive help center, live chat support, email assistance, and a robust ticketing system for resolving issues.",
      },
      {
        question: "How quickly are support tickets addressed?",
        answer:
          "Our support team aims to respond to tickets within 24 hours, with priority handling for urgent issues.",
      },
      {
        question: "Can I get help with campaign strategy?",
        answer:
          "Yes! We provide AI-driven insights, campaign optimization tips, and resources to help you maximize your fundraising efforts.",
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900'
    >
      <Navbar />

      <div className='container mx-auto px-5 py-24'>
        <h1 className='text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400'>
          Frequently Asked Questions
        </h1>

        {/* Category Selector */}
        <div className='grid md:grid-cols-3 gap-4 mb-12'>
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                flex items-center p-4 rounded-xl transition-all 
                ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }
              `}
            >
              <category.icon
                className={`mr-3 ${
                  activeCategory === category.id
                    ? "text-white"
                    : "text-indigo-600 dark:text-indigo-400"
                }`}
                size={24}
              />
              <div className='text-left'>
                <h3 className='font-semibold'>{category.title}</h3>
                <p className='text-sm opacity-70'>{category.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* FAQ Content */}
        <div className='space-y-4'>
          {faqContent[activeCategory].map((item, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all'
            >
              <h3 className='text-xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400'>
                {item.question}
              </h3>
              <p className='text-gray-700 dark:text-gray-300'>{item.answer}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className='mt-16 text-center'>
          <h2 className='text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400'>
            Still Need Help?
          </h2>
          <p className='text-gray-600 dark:text-gray-300 mb-6'>
            Our support team is ready to assist you with any additional
            questions.
          </p>
          <Link
            to='/help-support'
            className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all'
          >
            Contact Support
          </Link>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default FAQPage;

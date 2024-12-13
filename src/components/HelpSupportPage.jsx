import { useState } from "react";
import {
  HelpCircleIcon,
  BookOpenIcon,
  MessageCircleIcon,
  MailIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "./Navbar";
import Footer from "@/components/Footer";

const HelpSupportPage = () => {
  const [activeTab, setActiveTab] = useState("faq");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");

  const faqCategories = [
    {
      title: "Getting Started",
      questions: [
        {
          question: "How do I create a fundraising campaign?",
          answer:
            'Navigate to the "Create Campaign" page, fill out the details using our campaign wizard, set your goal, and customize your campaign page.',
        },
        {
          question: "What payment methods are supported?",
          answer:
            "We support credit/debit cards, PayPal, and bank transfers. All transactions are secure and encrypted.",
        },
      ],
    },
    {
      title: "Donations",
      questions: [
        {
          question: "Are my donations tax-deductible?",
          answer:
            "Tax deductibility depends on the specific campaign and your local tax laws. We recommend consulting with a tax professional.",
        },
        {
          question: "How do I receive donation receipts?",
          answer:
            "Automated digital receipts are sent immediately after your contribution is processed to the email address associated with your account.",
        },
      ],
    },
  ];

  const submitSupportTicket = (e) => {
    e.preventDefault();
    console.log("Ticket submitted:", {
      subject: ticketSubject,
      description: ticketDescription,
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "faq":
        return (
          <div className='space-y-6'>
            {faqCategories.map((category, index) => (
              <div key={index}>
                <h3 className='text-xl font-semibold mb-4 dark:text-gray-100'>
                  {category.title}
                </h3>
                {category.questions.map((faq, qIndex) => (
                  <Card
                    key={qIndex}
                    className='mb-4 bg-gray-50 dark:bg-gray-700'
                  >
                    <CardHeader>
                      <CardTitle className='dark:text-gray-100'>
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='dark:text-gray-300'>{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        );
      case "ticket":
        return (
          <form onSubmit={submitSupportTicket} className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Support Ticket Subject
              </label>
              <input
                type='text'
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                required
                className='mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-300 dark:text-gray-800 shadow-lg'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Describe Your Issue
              </label>
              <textarea
                rows={4}
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
                required
                className='mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-300 dark:text-gray-800 shadow-lg'
              />
            </div>
            <Button type='submit' variant='default'>
              Submit Support Ticket
            </Button>
          </form>
        );
      case "contact":
        return (
          <div className='space-y-6'>
            <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-4 dark:text-gray-100'>
                Contact Information
              </h3>
              <div className='space-y-4'>
                <div className='flex items-center'>
                  <MailIcon
                    className='mr-4 text-indigo-600 dark:text-indigo-400'
                    size={24}
                  />
                  <div>
                    <p className='font-medium dark:text-gray-100'>
                      Email Support
                    </p>
                    <p className='text-gray-600 dark:text-gray-300'>
                      support@fundraiseplatform.com
                    </p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <MessageCircleIcon
                    className='mr-4 text-indigo-600 dark:text-indigo-400'
                    size={24}
                  />
                  <div>
                    <p className='font-medium dark:text-gray-100'>
                      Live Chat Hours
                    </p>
                    <p className='text-gray-600 dark:text-gray-300'>
                      Mon-Fri, 9 AM - 5 PM EST
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300'>
      <Navbar />
      <div className='container mt-10 mx-auto py-12 px-4'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400'>
            Help & Support Center
          </h1>
          <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            We're here to help you navigate our platform, answer your questions,
            and provide support whenever you need it.
          </p>
        </div>

        <div className='grid md:grid-cols-4 gap-8'>
          <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md'>
            <nav className='space-y-2'>
              <Button
                variant={activeTab === "faq" ? "default" : "ghost"}
                onClick={() => setActiveTab("faq")}
                className='w-full justify-start'
              >
                <BookOpenIcon className='mr-2' size={20} /> FAQs
              </Button>
              <Button
                variant={activeTab === "ticket" ? "default" : "ghost"}
                onClick={() => setActiveTab("ticket")}
                className='w-full justify-start'
              >
                <HelpCircleIcon className='mr-2' size={20} /> Submit Support
                Ticket
              </Button>
              <Button
                variant={activeTab === "contact" ? "default" : "ghost"}
                onClick={() => setActiveTab("contact")}
                className='w-full justify-start'
              >
                <MessageCircleIcon className='mr-2' size={20} /> Contact Us
              </Button>
            </nav>
          </div>

          <div className='md:col-span-3 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md'>
            {renderContent()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HelpSupportPage;

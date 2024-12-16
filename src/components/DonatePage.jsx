import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DollarSignIcon,
  HeartIcon,
  UserIcon,
  MailIcon,
  CreditCardIcon,
  GlobeIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";
import apiConfig from "@/config/apiConfig";

const DonatePage = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Predefined donation amounts
  const donationPresets = [25, 50, 100, 250, 500];

  // Featured Campaigns for Donation
  const featuredCampaigns = [
    {
      id: "global-education",
      title: "Global Education Initiative",
      description:
        "Provide scholarships and learning resources to underprivileged children worldwide",
      goal: "$250,000",
      raised: "$187,500",
      progress: 75,
      icon: GlobeIcon,
    },
    {
      id: "clean-water",
      title: "Clean Water Project",
      description:
        "Bring sustainable safe drinking water to rural communities in developing regions",
      goal: "$500,000",
      raised: "$300,000",
      progress: 60,
      icon: HeartIcon,
    },
    {
      id: "medical-support",
      title: "Medical Support Fund",
      description:
        "Comprehensive medical expense support for individuals without healthcare access",
      goal: "$350,000",
      raised: "$175,000",
      progress: 50,
      icon: HeartIcon,
    },
  ];

  const handleDonationAmountSelect = (amount) => {
    setDonationAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    setDonationAmount(e.target.value);
    setCustomAmount(e.target.value);
  };

  const handleDonation = async () => {
    try {
      // Start loading state
      setIsLoading(true);

      // Prepare the data for submission
      const submitData = {
        donationId: "123254689", // Replace with dynamic data as needed
        amount: donationAmount,
        campaign: selectedCampaign,
      };

      // Make API call to process the donation
      const response = await apiConfig.post("/donate/stripe", submitData);

      console.log(response.url);
      // Automatically redirect the browser to the new URL
      window.location.href = response.data;

      // Show a detailed success toast
      toast.success(`Payment successful! 🎉`, {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#4caf50",
          color: "white",
          padding: "16px",
          borderRadius: "8px",
        },
      });

      console.log("Donation processed successfully:", response.data);
    } catch (error) {
      // Handle different types of errors
      console.error("Donation submission error:", error);

      if (error.response) {
        // Server responded with an error
        setError(
          error.response.data.message || "Failed to process the donation."
        );
      } else if (error.request) {
        // Request made but no response received
        setError("No response from server. Please check your connection.");
      } else {
        // Something else went wrong
        setError(error.message || "An unexpected error occurred.");
      }
    } finally {
      // Stop loading state
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validation
    if (campaignData.title.length < 5) {
      setError("Campaign title must be at least 5 characters long");
      setIsLoading(false);
      return;
    }

    if (parseFloat(campaignData.fundraisingGoal) < 100) {
      setError("Fundraising goal must be at least $100");
      setIsLoading(false);
      return;
    }

    const endDate = new Date(campaignData.endDate);
    const today = new Date();
    if (endDate <= today) {
      setError("Campaign end date must be in the future");
      setIsLoading(false);
      return;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"
    >
      <Navbar />

      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Donation Form Section */}
          <div>
            <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Make a Difference Today
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Your contribution can transform lives. Choose an amount and a
              campaign that resonates with your heart.
            </p>

            {/* Campaign Selection */}
            <div className="mb-6">
              <Label className="block mb-2">Select Campaign</Label>
              <div className="grid md:grid-cols-3 gap-4">
                {featuredCampaigns.map((campaign) => (
                  <button
                    key={campaign.id}
                    onClick={() => setSelectedCampaign(campaign.id)}
                    className={`
                      p-4 rounded-xl border transition-all 
                      ${
                        selectedCampaign === campaign.id
                          ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30"
                          : "border-gray-200 dark:border-gray-700"
                      }
                    `}
                  >
                    <campaign.icon
                      className={`mx-auto mb-2 ${
                        selectedCampaign === campaign.id
                          ? "text-indigo-600"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                      size={36}
                    />
                    <h3
                      className={`text-sm font-semibold ${
                        selectedCampaign === campaign.id
                          ? "text-indigo-800 dark:text-indigo-300"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {campaign.title}
                    </h3>
                  </button>
                ))}
              </div>
            </div>

            {/* Donation Amount Selection */}
            <div className="mb-6">
              <Label className="block mb-2">Donation Amount</Label>
              <div className="flex flex-wrap gap-3 mb-4">
                {donationPresets.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleDonationAmountSelect(amount)}
                    className={`
                      px-4 py-2 rounded-full border transition-all
                      ${
                        donationAmount == amount
                          ? "bg-indigo-600 text-white"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100"
                      }
                    `}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <div className="flex items-center">
                <div className="relative flex-grow">
                  <DollarSignIcon
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <Input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Donor Information */}
            <div className="space-y-4 mb-6">
              <div>
                <Label>Full Name</Label>
                <div className="relative">
                  <UserIcon
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <Input placeholder="Your full name" className="pl-10" />
                </div>
              </div>
              <div>
                <Label>Email Address</Label>
                <div className="relative">
                  <MailIcon
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Donation Button */}
            <Button
              onClick={handleDonation}
              disabled={!donationAmount || !selectedCampaign}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              <CreditCardIcon className="mr-2" /> Donate Now
            </Button>
          </div>

          {/* Campaign Impact Section */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Campaign Highlights
            </h2>
            {featuredCampaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="mb-6 hover:shadow-xl transition-all"
              >
                <CardHeader className="flex flex-row items-center space-x-4">
                  <campaign.icon
                    className="text-indigo-600 dark:text-indigo-400"
                    size={36}
                  />
                  <CardTitle>{campaign.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {campaign.description}
                  </p>
                  <div className="flex justify-between mb-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>Goal: {campaign.goal}</span>
                    <span>Raised: {campaign.raised}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                    <div
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 h-2.5 rounded-full"
                      style={{ width: `${campaign.progress}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
                    {campaign.progress}% Funded
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default DonatePage;

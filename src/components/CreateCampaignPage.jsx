import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RocketIcon,
  CalendarIcon,
  DollarSignIcon,
  AlertCircle,
  HeartIcon,
  GlobeIcon,
  School2Icon,
  HospitalIcon,
  LeafIcon,
  UsersIcon,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import apiConfig from "@/config/apiConfig";

const CreateCampaign = () => {
  const [campaignData, setCampaignData] = useState({
    title: "",
    description: "",
    category: "",
    fundraisingGoal: "",
    endDate: "",
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    "Education",
    "Healthcare",
    "Community Development",
    "Environmental",
    "Medical Research",
    "Humanitarian Aid",
  ];

  // Icon mapping for each category
  const categoryIcons = {
    Education: School2Icon,
    Healthcare: HospitalIcon,
    "Community Development": UsersIcon,
    Environmental: LeafIcon,
    "Medical Research": GlobeIcon,
    "Humanitarian Aid": HeartIcon,
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

    try {
      // Prepare the data for submission
      const submitData = {
        ...campaignData,
        fundraisingGoal: parseFloat(campaignData.fundraisingGoal),
      };
      console.log("Submit data:", submitData);

      // Make API call to create campaign
      const response = await apiConfig.post("/campaigns", submitData, {
        withCredentials: true,
      });

      // Log the created campaign
      console.log("Campaign created:", response.data);

      // Show a detailed success toast
      toast.success(
        `Campaign "${campaignData.title}" created successfully! 🎉`,
        {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#4caf50",
            color: "white",
            padding: "16px",
            borderRadius: "8px",
          },
        }
      );

      // Reset form
      setCampaignData({
        title: "",
        description: "",
        category: "",
        fundraisingGoal: "",
        endDate: "",
        imageUrl: "",
      });
    } catch (error) {
      // Handle different types of errors
      console.error("Campaign creation error:", error);

      if (error.response) {
        // Server responded with an error
        setError(error.response.data.message || "Failed to create campaign");
      } else if (error.request) {
        // Request made but no response received
        setError("No response from server. Please check your connection.");
      } else {
        // Something else went wrong
        setError(error.message || "An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCampaignData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear any existing errors when user starts typing
    if (error) setError(null);
  };

  const SelectedIcon = categoryIcons[campaignData.category] || RocketIcon;

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='container mx-auto py-12 px-4 flex-grow'
      >
        <Card className='max-w-2xl mt-10 mx-auto bg-white dark:bg-gray-800'>
          <CardHeader>
            <CardTitle className='flex items-center text-2xl font-bold text-indigo-600 dark:text-indigo-400'>
              <SelectedIcon className='mr-3' size={32} />
              Create Your Fundraising Campaign
            </CardTitle>
            <p className='text-gray-600 dark:text-gray-300 mt-2'>
              Launch a meaningful campaign and make a difference
            </p>
          </CardHeader>
          <CardContent>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='bg-red-50 border border-red-200 p-3 rounded-lg flex items-center mb-4'
              >
                <AlertCircle className='mr-2 text-red-500' size={20} />
                <span className='text-red-700'>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label className='block mb-2 text-gray-700 dark:text-gray-300'>
                  Campaign Title
                </label>
                <Input
                  placeholder='Enter campaign title'
                  value={campaignData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                  disabled={isLoading}
                  className={
                    error && campaignData.title.length < 5
                      ? "border-red-500"
                      : ""
                  }
                />
                {error && campaignData.title.length < 5 && (
                  <p className='text-red-500 text-sm mt-1'>
                    Campaign title must be at least 5 characters long
                  </p>
                )}
              </div>

              <div>
                <label className='block mb-2 text-gray-700 dark:text-gray-300'>
                  Description
                </label>
                <Textarea
                  placeholder='Tell your story and inspire supporters'
                  value={campaignData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label className='block mb-2 text-gray-700 dark:text-gray-300'>
                    <DollarSignIcon className='inline mr-2' size={16} />
                    Fundraising Goal
                  </label>
                  <Input
                    type='number'
                    placeholder='10000'
                    value={campaignData.fundraisingGoal}
                    onChange={(e) =>
                      handleInputChange("fundraisingGoal", e.target.value)
                    }
                    required
                    disabled={isLoading}
                    min={100}
                    className={
                      error && parseFloat(campaignData.fundraisingGoal) < 100
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {error && parseFloat(campaignData.fundraisingGoal) < 100 && (
                    <p className='text-red-500 text-sm mt-1'>
                      Fundraising goal must be at least $100
                    </p>
                  )}
                </div>

                <div>
                  <label className='block mb-2 text-gray-700 dark:text-gray-300'>
                    <CalendarIcon className='inline mr-2' size={16} />
                    Campaign End Date
                  </label>
                  <Input
                    type='date'
                    value={campaignData.endDate}
                    onChange={(e) =>
                      handleInputChange("endDate", e.target.value)
                    }
                    required
                    disabled={isLoading}
                    min={new Date().toISOString().split("T")[0]}
                    className={
                      error && new Date(campaignData.endDate) <= new Date()
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {error && new Date(campaignData.endDate) <= new Date() && (
                    <p className='text-red-500 text-sm mt-1'>
                      Campaign end date must be in the future
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className='block mb-2 text-gray-700 dark:text-gray-300'>
                  Campaign Category
                </label>
                <Select
                  value={campaignData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select Campaign Category' />
                  </SelectTrigger>
                  <SelectContent className='z-50 max-h-60 overflow-y-auto bg-white rounded-xl shadow-2xl border boarder-gray-100 ring-1 ring-black ring-opacity-5'>
                    {categories.map((category) => {
                      const Icon = categoryIcons[category] || RocketIcon;
                      return (
                        <SelectItem key={category} value={category}>
                          <Icon className='mr-2 h-4 w-4 inline-block' />
                          {category}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type='submit'
                className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                disabled={isLoading}
              >
                {isLoading ? "Creating Campaign..." : "Create Campaign"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.main>

      <Footer />
    </div>
  );
};

export default CreateCampaign;

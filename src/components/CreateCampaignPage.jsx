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
  ImageIcon,
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
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
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

  const categoryIcons = {
    Education: School2Icon,
    Healthcare: HospitalIcon,
    "Community Development": UsersIcon,
    Environmental: LeafIcon,
    "Medical Research": GlobeIcon,
    "Humanitarian Aid": HeartIcon,
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validation logic remains the same
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
      const formData = new FormData();
      formData.append("title", campaignData.title);
      formData.append("description", campaignData.description);
      formData.append("category", campaignData.category);
      formData.append("fundraisingGoal", campaignData.fundraisingGoal);
      formData.append("endDate", campaignData.endDate);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await apiConfig.post("/campaigns/form-data", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
      });
      setSelectedImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Campaign creation error:", error);
      if (error.response) {
        setError(error.response.data.message || "Failed to create campaign");
      } else if (error.request) {
        setError("No response from server. Please check your connection.");
      } else {
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
    if (error) setError(null);
  };

  const SelectedIcon = categoryIcons[campaignData.category] || RocketIcon;

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='container mx-auto py-12 px-4 flex-grow'
      >
        <Card className='max-w-2xl mt-10 mx-auto bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-xl border-0'>
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
                className='bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 p-3 rounded-lg flex items-center mb-4'
              >
                <AlertCircle
                  className='mr-2 text-red-500 dark:text-red-400'
                  size={20}
                />
                <span className='text-red-700 dark:text-red-300'>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label className='block mb-2 text-gray-700 dark:text-gray-200'>
                  Campaign Title
                </label>
                <Input
                  placeholder='Enter campaign title'
                  value={campaignData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                  disabled={isLoading}
                  className={`bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                    error && campaignData.title.length < 5
                      ? "border-red-500"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                />
                {error && campaignData.title.length < 5 && (
                  <p className='text-red-500 dark:text-red-400 text-sm mt-1'>
                    Campaign title must be at least 5 characters long
                  </p>
                )}
              </div>

              <div>
                <label className='block mb-2 text-gray-700 dark:text-gray-200'>
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
                  className='bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400'
                />
              </div>

              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label className='block mb-2 text-gray-700 dark:text-gray-200'>
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
                    className={`bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                      error && parseFloat(campaignData.fundraisingGoal) < 100
                        ? "border-red-500"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  />
                </div>

                <div>
                  <label className='block mb-2 text-gray-700 dark:text-gray-200'>
                    <CalendarIcon
                      className='inline mr-2 text-gray-600 dark:text-gray-300'
                      size={16}
                    />
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
                    className={`bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 ${
                      error && new Date(campaignData.endDate) <= new Date()
                        ? "border-red-500"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className='block mb-2 text-gray-700 dark:text-gray-200'>
                  Campaign Category
                </label>
                <Select
                  value={campaignData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger className='bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100'>
                    <SelectValue placeholder='Select Campaign Category' />
                  </SelectTrigger>
                  <SelectContent className='bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'>
                    {categories.map((category) => {
                      const Icon = categoryIcons[category] || RocketIcon;
                      return (
                        <SelectItem key={category} value={category}>
                          <div className='flex items-center'>
                            <Icon className='mr-2' size={16} />
                            {category}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className='block mb-2 text-gray-700 dark:text-gray-200'>
                  <ImageIcon className='inline mr-2' size={16} />
                  Campaign Image
                </label>
                <Input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  disabled={isLoading}
                  className='file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                           file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 
                           hover:file:bg-indigo-100 dark:file:bg-indigo-900 dark:file:text-indigo-300
                           dark:hover:file:bg-indigo-800 bg-white/50 dark:bg-gray-900/50 
                           border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100'
                />
                {previewUrl && (
                  <div className='mt-4'>
                    <img
                      src={previewUrl}
                      alt='Preview'
                      className='w-full max-w-md rounded-lg shadow-md'
                    />
                  </div>
                )}
              </div>

              <Button
                type='submit'
                className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 
                         hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 
                         dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600'
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

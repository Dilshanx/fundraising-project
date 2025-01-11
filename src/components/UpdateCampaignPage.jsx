import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  Trash2Icon,
  Loader2Icon,
} from "lucide-react";
import { toast } from "react-hot-toast";
import apiConfig from "@/config/apiConfig";

const UpdateCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  useEffect(() => {
    if (id) {
      fetchCampaignData();
    } else {
      setIsFetching(false);
      setError("Campaign ID not found");
      toast.error("Campaign ID not found");
    }
  }, [id]);

  const fetchCampaignData = async () => {
    try {
      const response = await apiConfig.get(`/campaigns/${id}`);
      const campaign = response.data.data;

      if (!campaign) {
        throw new Error("Campaign data is missing");
      }

      const endDate = campaign.endDate
        ? new Date(campaign.endDate).toISOString().split("T")[0]
        : "";

      setCampaignData({
        title: campaign.title || "",
        description: campaign.description || "",
        category: campaign.category || "",
        fundraisingGoal: campaign.fundraisingGoal || "",
        endDate: endDate,
      });

      if (campaign.imageUrl) {
        setPreviewUrl(campaign.imageUrl);
      }
    } catch (error) {
      console.error("Error fetching campaign:", error);
      const errorMessage =
        error.response?.status === 404
          ? "Campaign not found"
          : "Failed to load campaign data";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsFetching(false);
    }
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

      const response = await apiConfig.patch(`/campaigns/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Campaign updated successfully! 🎉");
        navigate(`/campaign-details/${id}`);
      }
    } catch (error) {
      console.error("Campaign update error:", error);
      const errorMessage =
        error.response?.status === 403
          ? "You don't have permission to update this campaign"
          : error.response?.data?.message || "Failed to update campaign";

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await apiConfig.delete(`/campaigns/${id}`, {
        withCredentials: true,
      });

      toast.success("Campaign deleted successfully", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#4caf50",
          color: "white",
          padding: "16px",
          borderRadius: "8px",
        },
      });

      navigate("/explore-campaigns");
    } catch (error) {
      console.error("Campaign deletion error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to delete campaign";
      toast.error(errorMessage, {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#f44336",
          color: "white",
          padding: "16px",
          borderRadius: "8px",
        },
      });
    } finally {
      setIsLoading(false);
      setShowDeleteDialog(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCampaignData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError(null);
  };

  if (isFetching) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader2Icon className='animate-spin h-8 w-8 text-indigo-600' />
      </div>
    );
  }

  if (error === "Campaign not found") {
    return (
      <Card className='max-w-2xl mx-auto bg-white dark:bg-gray-800'>
        <CardContent className='p-6'>
          <div className='text-center'>
            <AlertCircle className='mx-auto h-12 w-12 text-red-500 mb-4' />
            <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2'>
              Campaign Not Found
            </h2>
            <p className='text-gray-600 dark:text-gray-400 mb-4'>
              The campaign you're looking for doesn't exist or has been removed.
            </p>
            <Button
              onClick={() => navigate("/explore-campaigns")}
              className='bg-indigo-600 hover:bg-indigo-700'
            >
              Return to Campaigns
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const SelectedIcon = categoryIcons[campaignData.category] || RocketIcon;

  return (
    <Card className='max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg'>
      <CardHeader>
        <CardTitle className='flex items-center text-2xl font-bold text-indigo-600 dark:text-indigo-400'>
          <SelectedIcon className='mr-3' size={32} />
          Update Campaign
        </CardTitle>
      </CardHeader>
      <CardContent className='dark:text-gray-200'>
        {error && (
          <div className='bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-3 rounded-lg flex items-center mb-4'>
            <AlertCircle
              className='mr-2 text-red-500 dark:text-red-400'
              size={20}
            />
            <span className='text-red-700 dark:text-red-300'>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block mb-2 text-gray-700 dark:text-gray-200'>
              Campaign Title
            </label>
            <Input
              value={campaignData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
              disabled={isLoading}
              className='bg-white dark:bg-gray-900 dark:border-gray-700'
            />
          </div>

          <div>
            <label className='block mb-2 text-gray-700 dark:text-gray-200'>
              Description
            </label>
            <Textarea
              value={campaignData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              required
              disabled={isLoading}
              className='bg-white dark:bg-gray-900 dark:border-gray-700'
            />
          </div>

          <div className='grid md:grid-cols-2 gap-4'>
            <div>
              <label className='block mb-2 text-gray-700 dark:text-gray-200'>
                <DollarSignIcon
                  className='inline mr-2 dark:text-gray-300'
                  size={16}
                />
                Fundraising Goal
              </label>
              <Input
                type='number'
                value={campaignData.fundraisingGoal}
                onChange={(e) =>
                  handleInputChange("fundraisingGoal", e.target.value)
                }
                required
                disabled={isLoading}
                min={100}
                className='bg-white dark:bg-gray-900 dark:border-gray-700'
              />
            </div>

            <div>
              <label className='block mb-2 text-gray-700 dark:text-gray-200'>
                <CalendarIcon
                  className='inline mr-2 dark:text-gray-300'
                  size={16}
                />
                Campaign End Date
              </label>
              <Input
                type='date'
                value={campaignData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                required
                disabled={isLoading}
                min={new Date().toISOString().split("T")[0]}
                className='bg-white dark:bg-gray-900 dark:border-gray-700'
              />
            </div>
          </div>

          <div>
            <label className='block mb-2 text-gray-700 dark:text-gray-200'>
              Campaign Category
            </label>
            <Select
              value={campaignData.category}
              onValueChange={(value) => handleInputChange("category", value)}
              disabled={isLoading}
            >
              <SelectTrigger className='dark:bg-gray-900 dark:border-gray-700'>
                <SelectValue placeholder='Select Campaign Category' />
              </SelectTrigger>
              <SelectContent className='dark:bg-gray-800 dark:border-gray-700'>
                {categories.map((category) => {
                  const Icon = categoryIcons[category] || RocketIcon;
                  return (
                    <SelectItem
                      key={category}
                      value={category}
                      className='dark:text-gray-200'
                    >
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
              <ImageIcon className='inline mr-2 dark:text-gray-300' size={16} />
              Campaign Image
            </label>
            <Input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              disabled={isLoading}
              className='file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold 
                       file:bg-indigo-50 dark:file:bg-indigo-950 file:text-indigo-700 dark:file:text-indigo-300 
                       hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900
                       dark:bg-gray-900 dark:border-gray-700'
            />
            {previewUrl && (
              <div className='mt-4'>
                <img
                  src={previewUrl}
                  alt='Campaign'
                  className='w-full max-w-md rounded-lg shadow-md dark:shadow-gray-900'
                />
              </div>
            )}
          </div>

          <div className='flex gap-4'>
            <Button
              type='submit'
              className='flex-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Campaign"}
            </Button>

            <Button
              type='button'
              variant='destructive'
              onClick={() => setShowDeleteDialog(true)}
              disabled={isLoading}
              className='bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
            >
              <Trash2Icon className='mr-2' size={16} />
              Delete
            </Button>
          </div>
        </form>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className='bg-white dark:bg-gray-800 border dark:border-gray-700'>
            <AlertDialogHeader>
              <AlertDialogTitle className='dark:text-gray-200'>
                Are you sure?
              </AlertDialogTitle>
              <AlertDialogDescription className='dark:text-gray-400'>
                This action cannot be undone. This will permanently delete your
                campaign and remove all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className='dark:bg-gray-700 dark:hover:bg-gray-600'>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className='bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
              >
                Delete Campaign
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default UpdateCampaign;

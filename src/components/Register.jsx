import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import apiConfig from "@/config/apiConfig";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Settings,
  AlertCircle,
  MapPin,
  Mail,
  Phone,
  Camera,
  Calendar,
  Globe,
  ChevronDown,
} from "lucide-react";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await apiConfig.get("/auth/current-user");
        setUser(response.data.user);
        setFormData(response.data.user.demographicData || {});
        setInterests(response.data.user.demographicData?.interests || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInterestChange = (interest, isAdding) => {
    setInterests((prevInterests) =>
      isAdding
        ? [...prevInterests, interest]
        : prevInterests.filter((i) => i !== interest)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = user._id;
      await apiConfig.patch(`/users/user-profile/${userId}`, {
        demographicData: { ...formData, interests },
      });
      setUser((prevUser) => ({
        ...prevUser,
        demographicData: { ...formData, interests },
      }));
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update user profile.");
    }
  };

  const handleClearProfile = async () => {
    try {
      const userId = user._id;
      await apiConfig.delete(`/users/user-profile/${userId}`);
      setUser((prevUser) => ({
        ...prevUser,
        demographicData: {},
      }));
      setFormData({});
      setInterests([]);
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to clear user profile.");
    }
  };

  const availableInterests = [
    "Environment",
    "Education",
    "Animal Welfare",
    "Health",
    "Human Rights",
    "Poverty Alleviation",
    "Arts & Culture",
  ];

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Card className='w-full max-w-3xl mx-auto'>
          <CardHeader className='space-y-2'>
            <Skeleton className='h-8 w-1/3' />
            <Skeleton className='h-4 w-1/2' />
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex items-center space-x-4'>
              <Skeleton className='h-16 w-16 rounded-full' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-4 w-48' />
              </div>
            </div>
            <Skeleton className='h-48 w-full' />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Alert variant='destructive' className='w-full max-w-3xl mx-auto'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const profileSections = [
    { icon: Mail, label: "Email", value: user.email },
    { icon: Phone, label: "Phone", value: user.phone || "Not specified" },
    {
      icon: Calendar,
      label: "Age Range",
      value: user.demographicData?.ageRange || "Not specified",
    },
    {
      icon: User,
      label: "Gender",
      value: user.demographicData?.gender || "Not specified",
    },
    {
      icon: Globe,
      label: "Location",
      value:
        user.demographicData?.city && user.demographicData?.country
          ? `${user.demographicData.city}, ${user.demographicData.state}, ${user.demographicData.country}`
          : "Not specified",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='container mx-auto px-4 py-8'
    >
      <Card className='w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
        <CardHeader className='bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 px-6'>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-2xl font-bold flex items-center'>
              <Settings className='mr-2' /> User Profile
            </CardTitle>
            <Badge variant='secondary' className='text-sm'>
              {editMode ? "Editing" : "Viewing"}
            </Badge>
          </div>
          <CardDescription className='text-white/80'>
            Manage your personal information and preferences
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-8 p-6'>
          <div className='flex items-center space-x-6'>
            <div className='relative'>
              <Avatar className='h-24 w-24 border-4 border-white shadow-lg'>
                <AvatarImage
                  src={user.avatarUrl || "/api/placeholder/96/96"}
                  alt='User Avatar'
                />
                <AvatarFallback className='bg-primary/10 text-primary font-medium'>
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <Button
                size='icon'
                variant='secondary'
                className='absolute -bottom-2 -right-2 rounded-full h-8 w-8 bg-white shadow-md'
              >
                <Camera className='h-4 w-4 text-gray-600' />
              </Button>
            </div>
            <div>
              <h2 className='text-xl font-semibold text-gray-800'>
                {user.name}
              </h2>
              <p className='text-gray-600'>
                Member since {new Date(user.createdAt).getFullYear()}
              </p>
            </div>
          </div>

          <Separator />

          <AnimatePresence mode='wait'>
            {editMode ? (
              <motion.form
                key='edit-form'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className='space-y-6'
              >
                <div className='grid gap-6 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='ageRange' className='text-gray-700'>
                      Age Range
                    </Label>
                    <Select
                      value={formData.ageRange || ""}
                      onValueChange={(value) =>
                        handleInputChange("ageRange", value)
                      }
                    >
                      <SelectTrigger className='w-full border-gray-300'>
                        <SelectValue
                          placeholder='Select age range'
                          className='text-gray-800'
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {["18-24", "25-34", "35-44", "45-54", "55+"].map(
                          (age) => (
                            <SelectItem
                              key={age}
                              value={age}
                              className='text-gray-800'
                            >
                              {age}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='gender' className='text-gray-700'>
                      Gender
                    </Label>
                    <Select
                      value={formData.gender || ""}
                      onValueChange={(value) =>
                        handleInputChange("gender", value)
                      }
                    >
                      <SelectTrigger className='w-full border-gray-300'>
                        <SelectValue
                          placeholder='Select gender'
                          className='text-gray-800'
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Male",
                          "Female",
                          "Non-binary",
                          "Other",
                          "Prefer not to say",
                        ].map((gender) => (
                          <SelectItem
                            key={gender}
                            value={gender}
                            className='text-gray-800'
                          >
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='country' className='text-gray-700'>
                      Country
                    </Label>
                    <Input
                      id='country'
                      value={formData.country || ""}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                      className='w-full border-gray-300 text-gray-800'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='state' className='text-gray-700'>
                      State
                    </Label>
                    <Input
                      id='state'
                      value={formData.state || ""}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      className='w-full border-gray-300 text-gray-800'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='city' className='text-gray-700'>
                      City
                    </Label>
                    <Input
                      id='city'
                      value={formData.city || ""}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className='w-full border-gray-300 text-gray-800'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label className='text-gray-700'>Interests</Label>
                  <div className='border rounded-md p-2 space-y-2'>
                    {availableInterests.map((interest) => (
                      <div key={interest} className='flex items-center'>
                        <input
                          type='checkbox'
                          id={`interest-${interest}`}
                          checked={interests.includes(interest)}
                          onChange={(e) =>
                            handleInterestChange(interest, e.target.checked)
                          }
                          className='mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                        />
                        <label
                          htmlFor={`interest-${interest}`}
                          className='text-gray-700'
                        >
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='flex gap-2'>
                  <Button
                    type='submit'
                    className='w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white'
                  >
                    Save Changes
                  </Button>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setEditMode(false)}
                    className='w-full sm:w-auto border-gray-300 text-gray-800'
                  >
                    Cancel
                  </Button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key='view-profile'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className='space-y-6'
              >
                <div className='grid gap-4 sm:grid-cols-2'>
                  {profileSections.map((section, index) => (
                    <motion.div
                      key={section.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className='flex items-center p-4 rounded-lg bg-gray-50 border border-gray-200 shadow-sm'
                    >
                      <section.icon className='h-5 w-5 text-gray-500 mr-3' />
                      <div>
                        <p className='text-sm text-gray-600'>{section.label}</p>
                        <p className='font-medium text-gray-800'>
                          {section.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  {/* Interests Section */}
                  <motion.div
                    key='interests'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: profileSections.length * 0.1 }}
                    className='col-span-2 p-4 rounded-lg bg-gray-50 border border-gray-200 shadow-sm'
                  >
                    <h3 className='text-lg font-medium text-gray-800 mb-2'>
                      Interests
                    </h3>
                    <div className='flex flex-wrap gap-2'>
                      {interests.length > 0 ? (
                        interests.map((interest) => (
                          <Badge
                            key={interest}
                            variant='secondary'
                            className='text-gray-800 bg-indigo-100 border-indigo-300'
                          >
                            {interest}
                          </Badge>
                        ))
                      ) : (
                        <p className='text-gray-600'>No interests specified</p>
                      )}
                    </div>
                  </motion.div>
                </div>

                <div className='flex gap-2'>
                  <Button
                    onClick={() => setEditMode(true)}
                    className='w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white'
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant='outline'
                    onClick={handleClearProfile}
                    className='w-full sm:w-auto border-gray-300 text-gray-800'
                  >
                    Clear Profile
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserProfilePage;

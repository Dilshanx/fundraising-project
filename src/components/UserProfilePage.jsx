import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Settings,
  Camera,
  Mail,
  Phone,
  Calendar,
  Globe,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Navbar from "./Navbar";
import Footer from "@/components/Footer";
import apiConfig from "@/config/apiConfig";

const UserProfilePage = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    campaigns: [],
    donations: [],
    demographicData: {},
  });
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiConfig.get("/auth/current-user");
        setUser(response.data.user);
        setFormData(response.data.user.demographicData || {});
      } catch (err) {
        console.error("Failed to load user profile:", err);
        setError("Failed to load user profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await apiConfig.patch(
        `/users/user-profile/${user._id}`,
        {
          demographicData: formData,
        }
      );

      setUser((prevUser) => ({
        ...prevUser,
        demographicData: response.data.demographicData,
      }));

      setEditMode(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile. Please try again later.");
    }
  };

  const handleClearProfile = async () => {
    setError(null);
    try {
      await apiConfig.delete(`/users/user-profile/${user._id}`);
      setUser((prevUser) => ({
        ...prevUser,
        demographicData: {},
      }));
      setFormData({});
    } catch (err) {
      console.error("Failed to clear profile:", err);
      setError("Failed to clear profile data. Please try again later.");
    }
  };

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
      label: "City",
      value: user.demographicData?.city
        ? `${user.demographicData.city}`
        : "Not specified",
    },
    {
      icon: Globe,
      label: "Location",
      value: user.demographicData?.country
        ? `${user.demographicData.country}`
        : "Not specified",
    },
  ];

  const renderProfileContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='space-y-8'
          >
            {error && (
              <div className='bg-destructive/10 text-destructive p-4 rounded-lg'>
                {error}
              </div>
            )}

            <div className='flex items-center space-x-6'>
              <div className='relative'>
                <Avatar className='h-24 w-24'>
                  <AvatarImage
                    src={user.avatarUrl || "/api/placeholder/96/96"}
                  />
                  <AvatarFallback className='bg-primary/10'>
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size='icon'
                  variant='secondary'
                  className='absolute -bottom-2 -right-2 rounded-full h-8 w-8'
                >
                  <Camera className='h-4 w-4' />
                </Button>
              </div>
              <div>
                <h2 className='text-xl font-semibold'>{user.name}</h2>
                <p className='text-muted-foreground'>
                  Member since {new Date().getFullYear()}
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
                      <Label htmlFor='ageRange'>Age Range</Label>
                      <Select
                        value={formData.ageRange || ""}
                        onValueChange={(value) =>
                          handleInputChange("ageRange", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select age range' />
                        </SelectTrigger>
                        <SelectContent>
                          {["18-24", "25-34", "35-44", "45-54", "55+"].map(
                            (age) => (
                              <SelectItem key={age} value={age}>
                                {age}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='gender'>Gender</Label>
                      <Select
                        value={formData.gender || ""}
                        onValueChange={(value) =>
                          handleInputChange("gender", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select gender' />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Male",
                            "Female",
                            "Non-binary",
                            "Other",
                            "Prefer not to say",
                          ].map((gender) => (
                            <SelectItem key={gender} value={gender}>
                              {gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='city'>City</Label>
                      <Input
                        id='city'
                        value={formData.city || ""}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        className='w-full'
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='country'>Country</Label>
                      <Input
                        id='country'
                        value={formData.country || ""}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        className='w-full'
                      />
                    </div>
                  </div>

                  <div className='flex gap-2'>
                    <Button type='submit' className='w-full sm:w-auto'>
                      Save Changes
                    </Button>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => setEditMode(false)}
                      className='w-full sm:w-auto'
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
                        className='flex items-center p-4 rounded-lg bg-muted/50'
                      >
                        <section.icon className='h-5 w-5 text-muted-foreground mr-3' />
                        <div>
                          <p className='text-sm text-muted-foreground'>
                            {section.label}
                          </p>
                          <p className='font-medium'>{section.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className='flex gap-2'>
                    <Button
                      onClick={() => setEditMode(true)}
                      className='w-full sm:w-auto'
                    >
                      Edit Profile
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant='destructive'
                          className='w-full sm:w-auto'
                        >
                          <Trash2 className='mr-2 h-4 w-4' />
                          Clear Profile
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Clear Profile Data?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will remove all your demographic
                            information. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleClearProfile}
                            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                          >
                            Clear Data
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case "settings":
        return (
          <div className='space-y-6'>
            {error && (
              <div className='bg-destructive/10 text-destructive p-4 rounded-lg'>
                {error}
              </div>
            )}
            <h2 className='text-2xl font-bold'>Account Settings</h2>
            <div>
              <h3 className='text-lg font-semibold mb-2'>Security</h3>
              <Button variant='outline'>Change Password</Button>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-2'>Notifications</h3>
              <div className='flex items-center space-x-2'>
                <input type='checkbox' id='emailNotifications' />
                <label htmlFor='emailNotifications'>
                  Receive email updates about campaigns
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='flex-grow container mt-10 mx-auto py-12 px-4'>
        <div className='grid md:grid-cols-4 gap-8'>
          {/* Sidebar Navigation */}
          <Card className='h-fit'>
            <CardContent className='p-6'>
              <div className='flex items-center mb-8'>
                <Avatar className='w-16 h-16 mr-4'>
                  <AvatarImage
                    src={user.avatarUrl || "/api/placeholder/64/64"}
                  />
                  <AvatarFallback>
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className='text-xl font-bold'>{user.name}</h2>
                  <p className='text-muted-foreground'>{user.email}</p>
                </div>
              </div>
              <nav className='space-y-2'>
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  onClick={() => setActiveTab("profile")}
                  className='w-full justify-start'
                >
                  <User className='mr-2' size={20} /> Profile
                </Button>

                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  onClick={() => setActiveTab("settings")}
                  className='w-full justify-start'
                >
                  <Settings className='mr-2' size={20} /> Settings
                </Button>
              </nav>
            </CardContent>
          </Card>

          {/* Main Content Area */}
          <Card className='md:col-span-3'>
            <CardContent className='p-8'>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderProfileContent()}
                  </motion.div>
                </AnimatePresence>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfilePage;

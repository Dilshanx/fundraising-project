import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle2,
  AlertCircle,
  Lock,
  UserPlus,
  Sparkles,
  Shield,
  Zap,
  ChevronDown,
} from "lucide-react";
import apiConfig from "@/config/apiConfig";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const availableInterests = [
  "Environment",
  "Education",
  "Animal Welfare",
  "Health",
  "Human Rights",
  "Poverty Alleviation",
  "Arts & Culture",
];

// Password strength meter component
const PasswordStrengthMeter = ({ password }) => {
  const calculateStrength = (pwd) => {
    let strength = 0;
    strength += pwd.length > 7 ? 1 : 0;
    strength += /[A-Z]/.test(pwd) ? 1 : 0;
    strength += /[a-z]/.test(pwd) ? 1 : 0;
    strength += /[0-9]/.test(pwd) ? 1 : 0;
    strength += /[^A-Za-z0-9]/.test(pwd) ? 1 : 0;
    return strength;
  };

  const strengthLevels = [
    { label: "Weak", color: "bg-red-500", minStrength: 0 },
    { label: "Fair", color: "bg-yellow-500", minStrength: 2 },
    { label: "Good", color: "bg-green-500", minStrength: 4 },
  ];

  const strength = calculateStrength(password);
  const currentLevel =
    strengthLevels.findLast((level) => strength >= level.minStrength) ||
    strengthLevels[0];

  return (
    <div className='mt-2 space-y-2'>
      <div className='flex items-center space-x-2'>
        {strengthLevels.map((level, index) => (
          <div
            key={level.label}
            className={`h-2 flex-1 rounded-full ${
              strength >= level.minStrength ? currentLevel.color : "bg-gray-200"
            } transition-colors duration-500`}
          />
        ))}
      </div>
      <div className='flex items-center text-sm'>
        <span className={`mr-2 ${currentLevel.color}`}>
          {currentLevel.label === "Weak" ? (
            <AlertCircle size={16} />
          ) : (
            <Sparkles size={16} />
          )}
        </span>
        <span className='text-gray-600'>
          Password Strength: {currentLevel.label}
        </span>
      </div>
    </div>
  );
};

// MultiSelect component
const MultiSelect = ({ label, options, selected, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='space-y-2'>
      <Label>{label}</Label>
      <div className='relative'>
        <Button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className='w-full flex justify-between items-center px-3 py-2 text-left border rounded-md'
        >
          <span className='truncate'>
            {selected.length > 0
              ? `${selected.length} selected`
              : "Select interests"}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>

        {isOpen && (
          <div className='absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border'>
            <div className='p-2 space-y-1 max-h-60 overflow-auto'>
              {options.map((option) => (
                <label
                  key={option}
                  className='flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer'
                >
                  <Checkbox
                    checked={selected.includes(option)}
                    onCheckedChange={(checked) => {
                      onChange(
                        checked
                          ? [...selected, option]
                          : selected.filter((item) => item !== option)
                      );
                    }}
                    className='mr-2'
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();

  // Step 1: Basic Registration Data
  const [basicData, setBasicData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "donor",
    termsAccepted: false,
  });

  // Step 2: Demographic Data
  const [demographicData, setDemographicData] = useState({
    ageRange: "",
    gender: "",
    country: "",
    state: "", // or region/province
    city: "",
    interests: [], // Array to store multiple interests
  });

  // Validation errors for both steps
  const [validationErrors, setValidationErrors] = useState({
    // Basic Data Errors
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: "",
    // Demographic Data Errors
    ageRange: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    interests: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Start with step 1

  // Handle input changes for Basic Data
  const handleBasicDataChange = (e) => {
    const { name, value } = e.target;
    setBasicData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (validationErrors[name]) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  // Handle input changes for Demographic Data
  const handleDemographicDataChange = (e) => {
    const { name, value } = e.target;
    setDemographicData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (validationErrors[name]) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  // Handle Role Change (Basic Data)
  const handleRoleChange = (value) => {
    setBasicData((prevData) => ({
      ...prevData,
      role: value,
    }));
  };

  // Validate Step 1: Basic Data
  const validateBasicData = () => {
    const errors = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      termsAccepted: "",
    };

    // Name validation
    if (!basicData.name) {
      errors.name = "Name is required";
    } else if (basicData.name.length < 3) {
      errors.name = "Name must be at least 3 characters long";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(basicData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone number validation
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(basicData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(basicData.password)) {
      errors.password =
        "Password must include uppercase, lowercase, number, and special character";
    }

    // Confirm password validation
    if (basicData.password !== basicData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Terms validation
    if (!basicData.termsAccepted) {
      errors.termsAccepted = "You must accept the terms and conditions";
    }

    setValidationErrors((prevErrors) => ({ ...prevErrors, ...errors }));
    return Object.values(errors).every((error) => error === "");
  };

  // Validate Step 2: Demographic Data
  const validateDemographicData = () => {
    const errors = {
      ageRange: "",
      gender: "",
      country: "",
      state: "",
      city: "",
      interests: "",
    };

    // Add validation rules for demographic data (example)
    if (!demographicData.ageRange) {
      errors.ageRange = "Please select your age range";
    }
    if (!demographicData.gender) {
      errors.gender = "Please select your gender";
    }
    if (!demographicData.country) {
      errors.country = "Please select your country";
    }
    if (demographicData.interests.length === 0) {
      errors.interests = "Please select at least one interest";
    }
    // Add more validation as needed

    setValidationErrors((prevErrors) => ({ ...prevErrors, ...errors }));
    return Object.values(errors).every((error) => error === "");
  };

  // Go to the next step
  const nextStep = () => {
    if (currentStep === 1) {
      if (validateBasicData()) {
        setCurrentStep(2);
      }
    }
  };

  // Go back to the previous step
  const prevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  // Handle form submission (Step 2)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (currentStep === 2 && validateDemographicData()) {
      setIsLoading(true);
      try {
        const { confirmPassword, ...basicSubmitData } = basicData;
        const submitData = {
          ...basicSubmitData,
          demographicData, // Include demographic data
        };

        const response = await apiConfig.post("/auth/register", submitData, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          localStorage.setItem("registeredEmail", basicSubmitData.email);
          toast.success("Registration successful! Please verify your email.", {
            duration: 4000,
            position: "top-right",
            style: {
              background: "#4CAF50",
              color: "white",
              fontWeight: "bold",
            },
            icon: "✅",
          });
          navigate("/verify-email");
        } else {
          toast.error(
            "Registration successful but unexpected response. Please contact support."
          );
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.error ||
            error.response?.data?.message ||
            "Registration failed. Please try again.";
          toast.error(errorMessage, {
            duration: 4000,
            position: "top-right",
            style: {
              background: "#F44336",
              color: "white",
              fontWeight: "bold",
            },
          });
          setApiError(errorMessage);
        } else {
          toast.error("An unexpected error occurred", {
            duration: 4000,
            position: "top-right",
          });
          setApiError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4'
      >
        <Card className='w-full max-w-md shadow-2xl border-none rounded-2xl overflow-hidden'>
          <CardHeader className='bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-6'>
            <motion.div
              initial={{ rotate: -20, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className='flex items-center justify-center mb-4'
            >
              <UserPlus className='text-white' size={48} />
            </motion.div>
            <CardTitle className='text-2xl font-bold text-center'>
              {currentStep === 1
                ? "Create Your Account"
                : "Tell Us More About Yourself"}
            </CardTitle>
            <CardDescription className='text-white/80 text-center'>
              {currentStep === 1
                ? "Join our community and start making an impact"
                : "Help us personalize your experience"}
            </CardDescription>
          </CardHeader>
          <CardContent className='bg-white p-6 space-y-4'>
            {apiError && (
              <div
                className='bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded relative mb-4'
                role='alert'
              >
                <span className='block sm:inline'>{apiError}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Step 1: Basic Registration */}
              {currentStep === 1 && (
                <div className='space-y-4'>
                  {/* name Input */}
                  <div>
                    <Label htmlFor='name' className='flex items-center'>
                      Full Name
                      {basicData.name && !validationErrors.name && (
                        <CheckCircle2
                          className='ml-2 text-green-500'
                          size={16}
                        />
                      )}
                    </Label>
                    <Input
                      type='text'
                      name='name'
                      value={basicData.name}
                      onChange={handleBasicDataChange}
                      placeholder='Enter your full name'
                      className={`${
                        validationErrors.name ? "border-red-500" : ""
                      }`}
                    />
                    {validationErrors.name && (
                      <p className='text-red-500 text-sm mt-1 flex items-center'>
                        <AlertCircle className='mr-2' size={16} />
                        {validationErrors.name}
                      </p>
                    )}
                  </div>
                  {/* Email Input */}
                  <div>
                    <Label htmlFor='email' className='flex items-center'>
                      Email Address
                      {basicData.email && !validationErrors.email && (
                        <CheckCircle2
                          className='ml-2 text-green-500'
                          size={16}
                        />
                      )}
                    </Label>
                    <Input
                      type='email'
                      name='email'
                      value={basicData.email}
                      onChange={handleBasicDataChange}
                      placeholder='Enter your email'
                      className={`${
                        validationErrors.email ? "border-red-500" : ""
                      }`}
                    />
                    {validationErrors.email && (
                      <p className='text-red-500 text-sm mt-1 flex items-center'>
                        <AlertCircle className='mr-2' size={16} />
                        {validationErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number Input */}
                  <div>
                    <Label htmlFor='phone' className='flex items-center'>
                      Phone Number
                      {basicData.phone && !validationErrors.phone && (
                        <CheckCircle2
                          className='ml-2 text-green-500'
                          size={16}
                        />
                      )}
                    </Label>
                    <Input
                      type='tel'
                      name='phone'
                      value={basicData.phone}
                      onChange={handleBasicDataChange}
                      placeholder='Enter your phone number'
                      className={`${
                        validationErrors.phone ? "border-red-500" : ""
                      }`}
                    />
                    {validationErrors.phone && (
                      <p className='text-red-500 text-sm mt-1 flex items-center'>
                        <AlertCircle className='mr-2' size={16} />
                        {validationErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Password Input with Strength Meter */}
                  <div>
                    <Label htmlFor='password' className='flex items-center'>
                      Password
                      <Lock className='ml-2 text-gray-400' size={16} />
                    </Label>
                    <div className='relative'>
                      <Input
                        type={showPassword ? "text" : "password"}
                        name='password'
                        value={basicData.password}
                        onChange={handleBasicDataChange}
                        placeholder='Create a strong password'
                        className={`${
                          validationErrors.password
                            ? "border-red-500"
                            : "border-gray-300"
                        } pr-10`}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                      >
                        {showPassword ? (
                          <Shield size={20} />
                        ) : (
                          <Zap size={20} />
                        )}
                      </button>
                    </div>
                    {validationErrors.password && (
                      <p className='text-red-500 text-sm mt-1 flex items-center'>
                        <AlertCircle className='mr-2' size={16} />
                        {validationErrors.password}
                      </p>
                    )}
                    <PasswordStrengthMeter password={basicData.password} />
                  </div>

                  {/* Confirm Password Input */}
                  <div>
                    <Label
                      htmlFor='confirmPassword'
                      className='flex items-center'
                    >
                      Confirm Password
                      {basicData.confirmPassword &&
                        basicData.password === basicData.confirmPassword && (
                          <CheckCircle2
                            className='ml-2 text-green-500'
                            size={16}
                          />
                        )}
                    </Label>
                    <Input
                      type='password'
                      name='confirmPassword'
                      value={basicData.confirmPassword}
                      onChange={handleBasicDataChange}
                      placeholder='Repeat your password'
                      className={`${
                        validationErrors.confirmPassword ? "border-red-500" : ""
                      }`}
                    />
                    {validationErrors.confirmPassword && (
                      <p className='text-red-500 text-sm mt-1 flex items-center'>
                        <AlertCircle className='mr-2' size={16} />
                        {validationErrors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Role Selection */}
                  <div>
                    <Label className='mb-2 block text-sm font-medium text-gray-700'>
                      Select Your Role
                    </Label>
                    <Select
                      value={basicData.role}
                      onValueChange={handleRoleChange}
                    >
                      <SelectTrigger
                        className='w-full border-2 border-indigo-200 hover:border-indigo-400 transition-colors duration-300
                 bg-white shadow-sm rounded-lg focus:ring-2 focus:ring-indigo-200
                 text-gray-800 font-medium'
                      >
                        <SelectValue placeholder='Choose your community role' />
                      </SelectTrigger>
                      <SelectContent
                        className='z-50 max-h-60 overflow-y-auto bg-white rounded-xl shadow-2xl
                 border border-gray-100 ring-1 ring-black ring-opacity-5'
                      >
                        <div className='p-1'>
                          <SelectItem
                            value='donor'
                            className='flex items-center justify-between hover:bg-indigo-50 rounded-md transition-colors cursor-pointer px-3 py-2 group'
                          >
                            <div className='flex items-center'>
                              <span className='mr-3 text-indigo-600 group-hover:text-indigo-800'>
                                💰
                              </span>
                              <span>Donor</span>
                            </div>
                            <span className='text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity'>
                              Support causes you care about
                            </span>
                          </SelectItem>

                          <SelectItem
                            value='campaigner'
                            className='flex items-center justify-between hover:bg-green-50 rounded-md transition-colors cursor-pointer px-3 py-2 group'
                          >
                            <div className='flex items-center'>
                              <span className='mr-3 text-green-600 group-hover:text-green-800'>
                                🚀
                              </span>
                              <span>Campaign Creator</span>
                            </div>
                            <span className='text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity'>
                              Launch and manage campaigns
                            </span>
                          </SelectItem>
                        </div>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Terms and Conditions */}
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='terms'
                      name='termsAccepted'
                      checked={basicData.termsAccepted}
                      onCheckedChange={(checked) =>
                        setBasicData((prev) => ({
                          ...prev,
                          termsAccepted: checked,
                        }))
                      }
                    />
                    <Label htmlFor='terms' className='text-sm text-gray-700'>
                      I accept the Terms and Conditions
                    </Label>
                  </div>
                  <AnimatePresence>
                    {validationErrors.termsAccepted && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className='text-red-500 text-sm flex items-center'
                      >
                        <AlertCircle className='mr-2' size={16} />
                        {validationErrors.termsAccepted}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Next Step Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type='button'
                      onClick={nextStep}
                      className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white
                      hover:from-indigo-700 hover:to-purple-700
                      transition-all duration-300 ease-in-out'
                    >
                      Next
                    </Button>
                  </motion.div>
                </div>
              )}

              {/* Step 2: Demographic Information */}
              {currentStep === 2 && (
                <div className='space-y-4'>
                  {/* Age Range */}
                  <div>
                    <Label htmlFor='ageRange'>Age Range</Label>
                    <Select
                      name='ageRange'
                      value={demographicData.ageRange}
                      onValueChange={(value) =>
                        handleDemographicDataChange({
                          target: { name: "ageRange", value },
                        })
                      }
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select your age range' />
                      </SelectTrigger>
                      <SelectContent
                        className='z-50 max-h-60 overflow-y-auto bg-white rounded-xl shadow-2xl
                       border border-gray-100 ring-1 ring-black ring-opacity-5'
                      >
                        <SelectItem value='18-24'>18-24</SelectItem>
                        <SelectItem value='25-34'>25-34</SelectItem>
                        <SelectItem value='35-44'>35-44</SelectItem>
                        <SelectItem value='45-54'>45-54</SelectItem>
                        <SelectItem value='55-64'>55-64</SelectItem>
                        <SelectItem value='65+'>65+</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.ageRange && (
                      <p className='text-red-500 text-sm mt-1'>
                        {validationErrors.ageRange}
                      </p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <Label htmlFor='gender'>Gender</Label>
                    <Select
                      name='gender'
                      value={demographicData.gender}
                      onValueChange={(value) =>
                        handleDemographicDataChange({
                          target: { name: "gender", value },
                        })
                      }
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select your gender' />
                      </SelectTrigger>
                      <SelectContent
                        className='z-50 max-h-60 overflow-y-auto bg-white rounded-xl shadow-2xl
                       border border-gray-100 ring-1 ring-black ring-opacity-5'
                      >
                        <SelectItem value='Male'>Male</SelectItem>
                        <SelectItem value='Female'>Female</SelectItem>
                        <SelectItem value='Other'>Other</SelectItem>
                        <SelectItem value='Prefer not to say'>
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.gender && (
                      <p className='text-red-500 text-sm mt-1'>
                        {validationErrors.gender}
                      </p>
                    )}
                  </div>
                  {/* Country */}
                  <div>
                    <Label htmlFor='country'>Country</Label>
                    <Select
                      name='country'
                      value={demographicData.country}
                      onValueChange={(value) =>
                        handleDemographicDataChange({
                          target: { name: "country", value },
                        })
                      }
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select your country' />
                      </SelectTrigger>
                      <SelectContent
                        className='z-50 max-h-60 overflow-y-auto bg-white rounded-xl shadow-2xl
                       border border-gray-100 ring-1 ring-black ring-opacity-5'
                      >
                        <SelectItem value='United States'>
                          United States
                        </SelectItem>
                        <SelectItem value='Canada'>Canada</SelectItem>
                        <SelectItem value='United Kingdom'>
                          United Kingdom
                        </SelectItem>
                        {/* Add more countries as needed */}
                      </SelectContent>
                    </Select>
                    {validationErrors.country && (
                      <p className='text-red-500 text-sm mt-1'>
                        {validationErrors.country}
                      </p>
                    )}
                  </div>

                  {/* State/Region */}
                  <div>
                    <Label htmlFor='state'>State/Region</Label>
                    <Input
                      type='text'
                      name='state'
                      value={demographicData.state}
                      onChange={handleDemographicDataChange}
                      placeholder='Enter your state or region'
                    />
                    {validationErrors.state && (
                      <p className='text-red-500 text-sm mt-1'>
                        {validationErrors.state}
                      </p>
                    )}
                  </div>
                  {/* City */}
                  <div>
                    <Label htmlFor='city'>City</Label>
                    <Input
                      type='text'
                      name='city'
                      value={demographicData.city}
                      onChange={handleDemographicDataChange}
                      placeholder='Enter your city'
                    />
                    {validationErrors.city && (
                      <p className='text-red-500 text-sm mt-1'>
                        {validationErrors.city}
                      </p>
                    )}
                  </div>
                  {/* Interests (Multiple Select with Checkboxes) */}
                  <MultiSelect
                    label='Interests'
                    options={availableInterests}
                    selected={demographicData.interests}
                    onChange={(newInterests) => {
                      setDemographicData((prev) => ({
                        ...prev,
                        interests: newInterests,
                      }));
                      // Clear validation error if any interests are selected
                      if (newInterests.length > 0) {
                        setValidationErrors((prev) => ({
                          ...prev,
                          interests: "",
                        }));
                      }
                    }}
                    error={validationErrors.interests}
                  />

                  {/* Back Button */}
                  <Button
                    type='button'
                    variant='outline'
                    onClick={prevStep}
                    className='w-full'
                  >
                    Back
                  </Button>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type='submit'
                      disabled={isLoading}
                      className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white
                      hover:from-indigo-700 hover:to-purple-700
                      transition-all duration-300 ease-in-out
                      disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </motion.div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default Register;

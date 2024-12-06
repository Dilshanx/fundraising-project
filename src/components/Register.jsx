import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle2,
  AlertCircle,
  Lock,
  UserPlus,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";

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

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "donor",
    termsAccepted: false,
  });

  const [validationErrors, setValidationErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const errors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: "",
    };

    // Username validation
    if (registerData.username.length < 3) {
      errors.username = "Username must be at least 3 characters long";
    } else if (registerData.username.length > 20) {
      errors.username = "Username cannot exceed 20 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(registerData.password)) {
      errors.password =
        "Password must include uppercase, lowercase, number, and special character";
    }

    // Confirm password validation
    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Terms validation
    if (!registerData.termsAccepted) {
      errors.termsAccepted = "You must accept the terms and conditions";
    }

    setValidationErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name !== "termsAccepted") {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRoleChange = (value) => {
    setRegisterData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log("Registration Data:", registerData);
        alert("Registration successful!");
      } catch (error) {
        console.error("Registration failed", error);
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
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
            Create Your Account
          </CardTitle>
          <CardDescription className='text-white/80 text-center'>
            Join our community and start making an impact
          </CardDescription>
        </CardHeader>
        <CardContent className='bg-white p-6 space-y-4'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Username Input */}
            <div>
              <Label
                htmlFor='username'
                className='flex items-center justify-between'
              >
                <span>Username</span>
                {registerData.username && !validationErrors.username && (
                  <CheckCircle2 className='text-green-500' size={16} />
                )}
              </Label>
              <div className='relative'>
                <Input
                  type='text'
                  name='username'
                  value={registerData.username}
                  onChange={handleChange}
                  placeholder='Choose a unique username'
                  className={`${
                    validationErrors.username
                      ? "border-red-500"
                      : "border-gray-300"
                  } pr-10`}
                />
                {registerData.username.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2'
                  >
                    {validationErrors.username ? (
                      <AlertCircle className='text-red-500' size={20} />
                    ) : (
                      <CheckCircle2 className='text-green-500' size={20} />
                    )}
                  </motion.div>
                )}
              </div>
              <AnimatePresence>
                {validationErrors.username && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className='text-red-500 text-sm mt-1'
                  >
                    {validationErrors.username}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email Input */}
            <div>
              <Label htmlFor='email' className='flex items-center'>
                Email Address
                {registerData.email && !validationErrors.email && (
                  <CheckCircle2 className='ml-2 text-green-500' size={16} />
                )}
              </Label>
              <Input
                type='email'
                name='email'
                value={registerData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                className={`${validationErrors.email ? "border-red-500" : ""}`}
              />
              {validationErrors.email && (
                <p className='text-red-500 text-sm mt-1 flex items-center'>
                  <AlertCircle className='mr-2' size={16} />
                  {validationErrors.email}
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
                  value={registerData.password}
                  onChange={handleChange}
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
                  {showPassword ? <Shield size={20} /> : <Zap size={20} />}
                </button>
              </div>
              {validationErrors.password && (
                <p className='text-red-500 text-sm mt-1 flex items-center'>
                  <AlertCircle className='mr-2' size={16} />
                  {validationErrors.password}
                </p>
              )}
              <PasswordStrengthMeter password={registerData.password} />
            </div>

            {/* Confirm Password Input */}
            <div>
              <Label htmlFor='confirmPassword' className='flex items-center'>
                Confirm Password
                {registerData.confirmPassword &&
                  registerData.password === registerData.confirmPassword && (
                    <CheckCircle2 className='ml-2 text-green-500' size={16} />
                  )}
              </Label>
              <Input
                type='password'
                name='confirmPassword'
                value={registerData.confirmPassword}
                onChange={handleChange}
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
                value={registerData.role}
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

                    <SelectItem
                      value='volunteer'
                      className='flex items-center justify-between hover:bg-orange-50 rounded-md transition-colors cursor-pointer px-3 py-2 group'
                    >
                      <div className='flex items-center'>
                        <span className='mr-3 text-orange-600 group-hover:text-orange-800'>
                          ❤️
                        </span>
                        <span>Volunteer</span>
                      </div>
                      <span className='text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity'>
                        Make a difference in your community
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
                checked={registerData.termsAccepted}
                onCheckedChange={(checked) =>
                  setRegisterData((prev) => ({
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

            {/* Submit Button with Animation */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type='submit'
                className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition-all'
              >
                Create Account
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Register;

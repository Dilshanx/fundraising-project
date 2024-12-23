import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { AlertCircle, Loader2, KeyRound } from "lucide-react";
import apiConfig from "@/config/apiConfig";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get email from URL parameters if available
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email");
    if (emailParam) {
      setFormData((prev) => ({ ...prev, email: emailParam }));
    }
  }, []);

  const validateForm = () => {
    if (
      !formData.email ||
      !formData.otp ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return false;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiConfig.post("/auth/reset-password", {
        email: formData.email,
        otp: formData.otp,
        password: formData.password,
      });

      if (response.data.success) {
        setSuccess(true);
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setError(
        error.response?.data?.error ||
          "An error occurred while resetting your password"
      );
    } finally {
      setIsLoading(false);
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
            <KeyRound className='text-white' size={48} />
          </motion.div>
          <CardTitle className='text-2xl font-bold text-center'>
            Reset Password
          </CardTitle>
          <CardDescription className='text-white/80 text-center'>
            Enter your verification code and new password
          </CardDescription>
        </CardHeader>

        <CardContent className='bg-white p-6 space-y-4'>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-red-50 border border-red-200 p-3 rounded-lg flex items-center'
            >
              <AlertCircle className='mr-2 text-red-500' size={20} />
              <span className='text-red-700'>{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-green-50 border border-green-200 p-3 rounded-lg text-green-700'
            >
              Password reset successful! Redirecting to login...
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label htmlFor='email'>Email Address</Label>
              <Input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                disabled={isLoading}
                className='mt-2'
              />
            </div>

            <div>
              <Label htmlFor='otp'>Verification Code</Label>
              <Input
                type='text'
                id='otp'
                name='otp'
                value={formData.otp}
                onChange={handleChange}
                placeholder='Enter verification code'
                disabled={isLoading}
                className='mt-2'
              />
            </div>

            <div>
              <Label htmlFor='password'>New Password</Label>
              <Input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter new password'
                disabled={isLoading}
                className='mt-2'
              />
            </div>

            <div>
              <Label htmlFor='confirmPassword'>Confirm New Password</Label>
              <Input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Confirm new password'
                disabled={isLoading}
                className='mt-2'
              />
            </div>

            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Resetting Password...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>

            <div className='text-center text-sm text-gray-600'>
              Remember your password?{" "}
              <Button
                variant='link'
                size='sm'
                className='p-0 text-indigo-600 hover:text-indigo-800 hover:underline'
                onClick={() => (window.location.href = "/login")}
              >
                Back to Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResetPasswordPage;

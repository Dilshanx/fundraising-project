import { useEffect, useState } from "react";
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
import { Separator } from "@/components/ui/separator";
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
import {
  LogIn,
  AlertCircle,
  Chrome,
  Shield,
  Zap,
  Facebook,
  Loader2,
} from "lucide-react";
import apiConfig from "@/config/apiConfig";

const LoginPage = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const login = urlParams.get("login");
    const userData = urlParams.get("data");

    if (login === "success" && userData) {
      try {
        const parsedUserData = JSON.parse(decodeURIComponent(userData));
        localStorage.setItem("user", JSON.stringify(parsedUserData));
        window.location.href = "/";
      } catch (error) {
        console.error("Error parsing user data:", error);
        setError("Failed to process login data");
      }
    }
  }, []);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordStatus, setForgotPasswordStatus] = useState({
    loading: false,
    message: "",
    error: false,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      setForgotPasswordStatus({
        loading: false,
        message: "Please enter your email",
        error: true,
      });
      return;
    }

    setForgotPasswordStatus({
      loading: true,
      message: "",
      error: false,
    });

    try {
      const response = await apiConfig.post("/auth/forgot-password", {
        email: forgotPasswordEmail,
      });

      setForgotPasswordStatus({
        loading: false,
        message: "Password reset code has been sent to your email",
        error: false,
      });

      // Add a small delay before redirecting to ensure the success message is visible
      setTimeout(() => {
        window.location.href = `/reset-password?email=${encodeURIComponent(
          forgotPasswordEmail
        )}`;
      }, 1500);
    } catch (error) {
      setForgotPasswordStatus({
        loading: false,
        message: error.response?.data?.error || "Failed to send reset code",
        error: true,
      });
    }
  };

  const handleLocalLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!loginData.email || !loginData.password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiConfig.post(
        "/auth/login",
        {
          email: loginData.email,
          password: loginData.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        setError(error.response.data.message || "Login failed");
      } else if (error.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("An error occurred during login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const baseURL = "http://localhost:5000/api";
    window.location.href = `${baseURL}/auth/google`;
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
            <LogIn className='text-white' size={48} />
          </motion.div>
          <CardTitle className='text-2xl font-bold text-center'>
            Welcome Back
          </CardTitle>
          <CardDescription className='text-white/80 text-center'>
            Sign in to continue your journey
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

          <form onSubmit={handleLocalLogin} className='space-y-4'>
            <div>
              <Label htmlFor='email'>Email Address</Label>
              <Input
                type='email'
                name='email'
                value={loginData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                required
                className='mt-2'
              />
            </div>

            <div>
              <div className='flex justify-between items-center mb-2'>
                <Label htmlFor='password'>Password</Label>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant='link'
                      size='sm'
                      className='text-sm text-indigo-600 hover:text-indigo-800 p-0'
                    >
                      Forgot password?
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className='bg-white'>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Reset Password</AlertDialogTitle>
                      <AlertDialogDescription>
                        Enter your email to receive a password reset code
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className='space-y-4'>
                      <Input
                        placeholder='Enter your email'
                        type='email'
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      />
                      {forgotPasswordStatus.message && (
                        <div
                          className={`text-sm ${
                            forgotPasswordStatus.error
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {forgotPasswordStatus.message}
                        </div>
                      )}
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleForgotPassword}
                        disabled={forgotPasswordStatus.loading}
                      >
                        {forgotPasswordStatus.loading ? (
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        ) : null}
                        Send Reset Code
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className='relative'>
                <Input
                  type={showPassword ? "text" : "password"}
                  name='password'
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder='Enter your password'
                  required
                  className='pr-10'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                >
                  {showPassword ? <Shield size={20} /> : <Zap size={20} />}
                </button>
              </div>
            </div>

            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className='my-6'>
            <Separator className='my-4' />
            <div className='text-center text-sm text-gray-600 mb-4'>
              Or continue with
            </div>
            <div className='grid grid-cols-1 gap-4'>
              <Button
                variant='outline'
                onClick={handleGoogleLogin}
                className='w-full'
              >
                <Chrome className='mr-2 h-5 w-5 text-red-500' />
                Sign in with Google
              </Button>
              <Button variant='outline' className='w-full'>
                <Facebook className='mr-2 h-5 w-5 text-blue-600' />
                Facebook
              </Button>
            </div>
          </div>

          <div className='text-center text-sm text-gray-600 mt-6'>
            Don't have an account?{" "}
            <Button
              variant='link'
              size='sm'
              className='p-0 text-indigo-600 hover:text-indigo-800 hover:underline'
              onClick={() => (window.location.href = "/register")}
            >
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LoginPage;

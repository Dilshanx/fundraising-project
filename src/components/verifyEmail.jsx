import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import apiConfig from "@/config/apiConfig";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  const email = localStorage.getItem("registeredEmail");

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countdown]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await apiConfig.post("/auth/verify-email", {
        email,
        code: verificationCode,
      });

      if (response.status === 200) {
        localStorage.removeItem("registeredEmail");
        toast.success("Email verified successfully! 🎉", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#4CAF50",
            color: "white",
            fontWeight: "bold",
          },
        });
        navigate("/verification-success");
      }
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "Invalid verification code. Please try again."
      );
      console.error("Verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendDisabled(true);
    setCountdown(60);
    try {
      const response = await apiConfig.post("/resend-verification", {
        email,
      });

      toast.success("New verification code sent! 📧", {
        position: "top-right",
      });
    } catch (error) {
      toast.error("Failed to resend code. Please try again.", {
        position: "top-right",
      });
    }
  };

  if (!email) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4'>
        <Card className='w-full max-w-md'>
          <CardContent className='p-6'>
            <div className='text-center space-y-4'>
              <Mail className='w-12 h-12 text-gray-400 mx-auto' />
              <h2 className='text-xl font-semibold text-gray-900'>
                No Email Found
              </h2>
              <p className='text-gray-600'>
                Please register first to verify your email.
              </p>
              <Button onClick={() => navigate("/register")} className='w-full'>
                Go to Registration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <div className='mx-auto bg-blue-100 rounded-full p-3 mb-4'>
            <Mail className='w-6 h-6 text-blue-600' />
          </div>
          <CardTitle className='text-2xl font-bold text-center'>
            Verify Your Email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            <div className='text-center'>
              <p className='text-gray-600'>
                We've sent a verification code to:
              </p>
              <p className='font-medium text-gray-900 mt-1'>{email}</p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <div className='relative'>
                  <Input
                    type='text'
                    maxLength={6}
                    placeholder='Enter verification code'
                    value={verificationCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      setVerificationCode(value);
                    }}
                    className='text-center text-lg tracking-[0.5em] font-medium h-12'
                    required
                  />
                </div>
                {error && (
                  <p className='text-red-500 text-sm text-center animate-shake'>
                    {error}
                  </p>
                )}
              </div>

              <Button
                type='submit'
                disabled={isLoading}
                className='w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
              >
                {isLoading ? (
                  <div className='flex items-center gap-2'>
                    <Loader2 className='w-4 h-4 animate-spin' />
                    Verifying...
                  </div>
                ) : (
                  <div className='flex items-center justify-center gap-2'>
                    Verify Email
                    <ArrowRight className='w-4 h-4' />
                  </div>
                )}
              </Button>
            </form>

            <div className='text-center space-y-2'>
              <p className='text-sm text-gray-600'>Didn't receive the code?</p>
              <Button
                variant='ghost'
                onClick={handleResendCode}
                disabled={resendDisabled}
                className='text-blue-600 hover:text-blue-700'
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${
                    resendDisabled ? "animate-spin" : ""
                  }`}
                />
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;

const keyframes = {
  shake: {
    "0%, 100%": { transform: "translateX(0)" },
    "25%": { transform: "translateX(-5px)" },
    "75%": { transform: "translateX(5px)" },
  },
};

const style = {
  ".animate-shake": {
    animation: "shake 0.5s ease-in-out",
  },
  "@keyframes shake": keyframes.shake,
};

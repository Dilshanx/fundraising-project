import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiConfig from "@/config/apiConfig";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("registeredEmail");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Corrected API call using apiConfig.post
      const response = await apiConfig.post("/auth/verify-email", {
        email,
        code: verificationCode, // Send as 'code' to match backend
      });

      if (response.status === 200) {
        // Verification successful
        console.log("Verification successful:", response.data);

        // Remove email from localStorage
        localStorage.removeItem("registeredEmail");

        // Show success toast
        toast.success("Email verified successfully!", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#4CAF50",
            color: "white",
            fontWeight: "bold",
          },
          icon: "🎉",
        });

        // Redirect to success page or login page
        navigate("/verification-success"); // Or "/login"
      } else {
        // Verification failed (this should ideally not happen with a 200 status)
        setError("Invalid verification code. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        // Handle backend errors with specific messages
        setError(
          error.response.data.error ||
            "Invalid verification code. Please try again."
        );
      } else {
        // Handle other errors (network, etc.)
        setError("An error occurred. Please try again later.");
      }
      console.error("Verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleResendCode = async () => {
    try {
      const response = await apiConfig.post("/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Show a success message to the user
        alert("Verification code resent! Please check your email.");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to resend code.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error("Resend code error:", error);
    }
  };

  if (!email) {
    return (
      <div>
        <p>No email found. Please register first.</p>
        {/* Optionally, redirect to registration page */}
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      <Card className='w-full max-w-md mx-auto'>
        <CardHeader>
          <CardTitle className='text-center'>Verify Your Email</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-center mb-4'>
            Please enter the verification code sent to {email}.
          </p>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Input
                type='text'
                id='verificationCode'
                placeholder='Verification Code'
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                className='w-full'
              />
            </div>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            <Button type='submit' disabled={isLoading} className='w-full'>
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </form>
          <div className='mt-4 text-center'>
            <button onClick={handleResendCode} className='text-blue-500'>
              Resend Code
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;

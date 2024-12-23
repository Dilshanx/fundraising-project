import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const VerificationSuccess = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4'>
      <Card className='max-w-md w-full'>
        <CardContent className='pt-6'>
          <div className='text-center space-y-6'>
            {/* Success Icon with Animation */}
            <div className='flex justify-center'>
              <div className='rounded-full bg-green-100 p-3 animate-bounce'>
                <CheckCircle className='w-12 h-12 text-green-600' />
              </div>
            </div>

            {/* Main Content */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold text-gray-900'>
                Email Verified Successfully!
              </h2>

              <p className='text-gray-600'>
                Your email has been verified. You can now access all features of
                your account.
              </p>

              {/* Features List */}
              <div className='bg-blue-50 rounded-lg p-4 text-left'>
                <p className='text-sm font-medium text-blue-900 mb-2'>
                  What's next?
                </p>
                <ul className='space-y-2 text-sm text-blue-800'>
                  <li className='flex items-center gap-2'>
                    <div className='w-1 h-1 rounded-full bg-blue-400' />
                    Complete your profile information
                  </li>
                  <li className='flex items-center gap-2'>
                    <div className='w-1 h-1 rounded-full bg-blue-400' />
                    Explore available features
                  </li>
                  <li className='flex items-center gap-2'>
                    <div className='w-1 h-1 rounded-full bg-blue-400' />
                    Connect with other users
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <Link to='/login' className='block'>
                <Button className='w-full group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200'>
                  <span className='flex items-center justify-center gap-2'>
                    Continue to Login
                    <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationSuccess;

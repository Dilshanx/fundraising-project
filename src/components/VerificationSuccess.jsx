import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Your UI components

const VerificationSuccess = () => {
  return (
    <div className='container mx-auto p-4'>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold mb-4'>Verification Successful!</h2>
        <p className='mb-4'>
          Your email has been verified. You can now log in.
        </p>
        <Link to='/login'>
          <Button>Go to Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default VerificationSuccess;

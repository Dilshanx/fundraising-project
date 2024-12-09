const SecurityAndCompliancePage = () => {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-4'>Security and Compliance</h1>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-2xl font-bold mb-4'>Data Security</h2>
        <p className='text-gray-700 mb-4'>
          Our platform takes data security and privacy very seriously. All
          sensitive information, including user data and donation details, is
          encrypted both in transit and at rest using industry-standard
          encryption protocols.
        </p>
        <p className='text-gray-700 mb-4'>
          We employ a range of security measures, including firewalls, intrusion
          detection systems, and regular security audits, to protect our systems
          from unauthorized access and malicious activities.
        </p>
      </div>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-2xl font-bold mb-4'>Regulatory Compliance</h2>
        <p className='text-gray-700 mb-4'>
          Our platform is designed to adhere to all relevant legal and
          regulatory requirements, including data protection laws such as the
          General Data Protection Regulation (GDPR) and the Health Insurance
          Portability and Accountability Act (HIPAA).
        </p>
        <p className='text-gray-700 mb-4'>
          We regularly review our policies and procedures to ensure ongoing
          compliance with applicable laws and industry best practices. Our users
          can be confident that their data and transactions are handled in a
          secure and compliant manner.
        </p>
      </div>
    </div>
  );
};

export default SecurityAndCompliancePage;

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import apiConfig from "@/config/apiConfig";

const SupportTicketsView = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await apiConfig.get("/support/tickets");

      if (response.data.success) {
        setTickets(response.data.data);
        setError(null);
      } else {
        throw new Error(response.data.message || "Failed to fetch tickets");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch tickets");
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      new: "bg-green-100 text-green-800",
      open: "bg-blue-100 text-blue-800",
      inProgress: "bg-yellow-100 text-yellow-800",
      resolved: "bg-purple-100 text-purple-800",
      closed: "bg-gray-100 text-gray-800",
    };
    return colors[status.toLowerCase()] || "bg-blue-100 text-blue-800";
  };

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <Card>
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className='bg-red-50 text-red-500 p-4 rounded-md mb-4'>
              {error}
            </div>
          )}

          {loading ? (
            <div className='text-center py-8'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto'></div>
              <p className='mt-2'>Loading tickets...</p>
            </div>
          ) : (
            <div className='space-y-4'>
              {tickets.map((ticket) => (
                <Card
                  key={ticket._id}
                  className='hover:shadow-md transition-shadow'
                >
                  <CardContent className='p-4'>
                    <div className='flex justify-between items-start'>
                      <h3 className='font-bold text-lg'>{ticket.subject}</h3>
                      <span
                        className={`${getStatusColor(
                          ticket.status
                        )} px-3 py-1 rounded-full text-sm`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <p className='text-gray-600 mt-2'>{ticket.description}</p>
                    <div className='mt-3 flex items-center text-sm text-gray-500'>
                      {ticket.metadata?.contactName && (
                        <span className='flex items-center'>
                          <svg
                            className='w-4 h-4 mr-1'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                            />
                          </svg>
                          {ticket.metadata.contactName}
                        </span>
                      )}
                      {ticket.metadata?.email && (
                        <span className='ml-4 flex items-center'>
                          <svg
                            className='w-4 h-4 mr-1'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                            />
                          </svg>
                          {ticket.metadata.email}
                        </span>
                      )}
                      {ticket.createdAt && (
                        <span className='ml-4 flex items-center'>
                          <svg
                            className='w-4 h-4 mr-1'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {tickets.length === 0 && (
                <div className='text-center py-8 text-gray-500'>
                  <svg
                    className='w-16 h-16 mx-auto text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                    />
                  </svg>
                  <p className='mt-2'>No tickets found</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportTicketsView;

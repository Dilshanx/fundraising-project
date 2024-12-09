import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const EngagementAndCommunicationPage = () => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [newUpdate, setNewUpdate] = useState("");
  const [updates, setUpdates] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch the campaign details and updates from the backend
    const fetchCampaignData = async () => {
      const response = await fetch(`/api/campaigns/${campaignId}`);
      const data = await response.json();
      setCampaign(data.campaign);
      setUpdates(data.updates);
      setComments(data.comments);
    };
    fetchCampaignData();
  }, [campaignId]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    // Send the new update to the backend
    await fetch(`/api/campaigns/${campaignId}/updates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newUpdate }),
    });
    setNewUpdate("");
    // Fetch the updated campaign data
    await fetchCampaignData();
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    // Send the new comment to the backend
    await fetch(`/api/campaigns/${campaignId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newComment }),
    });
    setNewComment("");
    // Fetch the updated campaign data
    await fetchCampaignData();
  };

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-4'>Engagement and Communication</h1>
      {campaign && (
        <div>
          <h2 className='text-2xl font-bold mb-4'>{campaign.title}</h2>
          <div className='mb-8'>
            <h3 className='text-xl font-bold mb-2'>Campaign Updates</h3>
            <form onSubmit={handleUpdateSubmit} className='mb-4'>
              <textarea
                value={newUpdate}
                onChange={(e) => setNewUpdate(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Write a new update...'
              ></textarea>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Post Update
              </button>
            </form>
            {updates.map((update, index) => (
              <div
                key={index}
                className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
              >
                <p className='text-gray-700 font-bold mb-2'>{update.author}</p>
                <p className='text-gray-700 mb-2'>{update.content}</p>
                <p className='text-gray-500 text-sm'>
                  {format(new Date(update.createdAt), "MMM d, yyyy")}
                </p>
              </div>
            ))}
          </div>
          <div>
            <h3 className='text-xl font-bold mb-2'>Comments</h3>
            <form onSubmit={handleCommentSubmit} className='mb-4'>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Write a new comment...'
              ></textarea>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Post Comment
              </button>
            </form>
            {comments.map((comment, index) => (
              <div
                key={index}
                className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
              >
                <p className='text-gray-700 font-bold mb-2'>{comment.author}</p>
                <p className='text-gray-700 mb-2'>{comment.content}</p>
                <p className='text-gray-500 text-sm'>
                  {format(new Date(comment.createdAt), "MMM d, yyyy")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EngagementAndCommunicationPage;

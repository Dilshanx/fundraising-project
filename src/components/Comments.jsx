import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare, Reply, Trash2, Edit2 } from "lucide-react";
import apiConfig from "@/config/apiConfig";
import { format } from "date-fns";
import toast from "react-hot-toast";

// API configuration remains the same
const secureApiConfig = {
  ...apiConfig,
  withCredentials: true,
  headers: {
    ...apiConfig.headers,
    "Content-Type": "application/json",
    ...(typeof window !== "undefined" && {
      "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
        ?.content,
    }),
  },
};

const Comments = ({ campaignId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Existing useEffect and fetch functions remain the same...
  useEffect(() => {
    if (campaignId) {
      fetchComments();
    }
  }, [campaignId]);

  // All existing handler functions remain the same...
  const fetchComments = async () => {
    try {
      const response = await secureApiConfig.get(
        `/comments/by-campaign/${campaignId}`,
        { withCredentials: true }
      );

      if (!response.data) {
        throw new Error("No data received from server");
      }

      setComments(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load comments");
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    try {
      setIsLoading(true);
      const commentData = {
        campaignId,
        comment: newComment.trim(),
        isSubComment: !!replyTo,
        parentCommentId: replyTo,
      };

      const response = await secureApiConfig.post(
        "/comments/create",
        commentData
      );

      if (!response.data) {
        throw new Error("Failed to create comment");
      }

      setNewComment("");
      setReplyTo(null);
      await fetchComments();
      toast.success("Comment posted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post comment");
      console.error("Error posting comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!currentUser) return;

    try {
      const response = await secureApiConfig.delete(`/comments/${commentId}`);

      if (!response.data) {
        throw new Error("Failed to delete comment");
      }

      await fetchComments();
      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete comment");
      console.error("Error deleting comment:", error);
    }
  };

  const handleUpdateComment = async (commentId) => {
    if (!currentUser || !editingComment) return;

    try {
      const response = await secureApiConfig.patch(
        `/comments/update/${commentId}`,
        {
          comment: editingComment.trim(),
        }
      );

      if (!response.data) {
        throw new Error("Failed to update comment");
      }

      setEditingComment(null);
      await fetchComments();
      toast.success("Comment updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update comment");
      console.error("Error updating comment:", error);
    }
  };

  const Comment = ({ comment, isReply }) => (
    <div className={`flex gap-4 ${isReply ? "ml-12 mt-4" : "mt-6"}`}>
      <Avatar className='h-10 w-10'>
        <div className='bg-indigo-500 dark:bg-indigo-600 text-white w-full h-full flex items-center justify-center rounded-full'>
          {comment.userId.name[0].toUpperCase()}
        </div>
      </Avatar>
      <div className='flex-1'>
        <div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 shadow-sm dark:shadow-gray-900/20'>
          <div className='flex justify-between items-start'>
            <div>
              <h4 className='font-semibold text-gray-900 dark:text-gray-100'>
                {comment.userId.name}
              </h4>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                {format(new Date(comment.createdAt), "MMM d, yyyy")}
              </p>
            </div>
            {currentUser &&
              (currentUser.id === comment.userId._id ||
                currentUser.role === "admin") && (
                <div className='flex gap-2'>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='hover:bg-gray-200 dark:hover:bg-gray-700'
                    onClick={() => setEditingComment(comment._id)}
                  >
                    <Edit2 className='h-4 w-4 text-gray-600 dark:text-gray-400' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='hover:bg-gray-200 dark:hover:bg-gray-700'
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    <Trash2 className='h-4 w-4 text-gray-600 dark:text-gray-400' />
                  </Button>
                </div>
              )}
          </div>
          {editingComment === comment._id ? (
            <div className='mt-2'>
              <Textarea
                defaultValue={comment.comment}
                onChange={(e) => setEditingComment(e.target.value)}
                className='min-h-[100px] bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600'
              />
              <div className='flex gap-2 mt-2'>
                <Button
                  onClick={() => handleUpdateComment(comment._id)}
                  className='bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600'
                >
                  Save
                </Button>
                <Button
                  variant='ghost'
                  onClick={() => setEditingComment(null)}
                  className='hover:bg-gray-200 dark:hover:bg-gray-700'
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className='mt-2 text-gray-800 dark:text-gray-200'>
                {comment.comment}
              </p>
              {!isReply && (
                <Button
                  variant='ghost'
                  size='sm'
                  className='mt-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  onClick={() => setReplyTo(comment._id)}
                >
                  <Reply className='h-4 w-4 mr-2' />
                  Reply
                </Button>
              )}
            </>
          )}
        </div>
        {comment.replies?.map((reply) => (
          <Comment key={reply._id} comment={reply} isReply={true} />
        ))}
      </div>
    </div>
  );

  return (
    <div className='mt-8'>
      <div className='flex items-center gap-2 mb-6'>
        <MessageSquare className='h-6 w-6 text-gray-700 dark:text-gray-300' />
        <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
          Comments
        </h3>
      </div>

      {currentUser ? (
        <form onSubmit={handleSubmitComment} className='mb-6'>
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={replyTo ? "Write a reply..." : "Write a comment..."}
            className='min-h-[100px] bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400'
          />
          <div className='flex justify-end gap-2 mt-2'>
            {replyTo && (
              <Button
                variant='ghost'
                onClick={() => setReplyTo(null)}
                className='hover:bg-gray-200 dark:hover:bg-gray-700'
              >
                Cancel Reply
              </Button>
            )}
            <Button
              type='submit'
              disabled={isLoading}
              className='bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600'
            >
              {isLoading ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </form>
      ) : (
        <p className='text-center text-gray-500 dark:text-gray-400 mb-6'>
          Please log in to leave a comment
        </p>
      )}

      <div className='space-y-4'>
        {comments.map(
          (comment) =>
            !comment.isSubComment && (
              <Comment key={comment._id} comment={comment} isReply={false} />
            )
        )}
      </div>
    </div>
  );
};

export default Comments;

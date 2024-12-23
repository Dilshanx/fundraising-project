import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  UserCircle,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create axios instance with auth interceptor
const apiConfig = axios.create({
  baseURL: "http://localhost:5000/api/admin/",
  withCredentials: true,
});

// Add request interceptor to include token
apiConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle auth errors
apiConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Redirect to login if unauthorized
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("admin");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiConfig.get(
        `users/${activeTab}?page=${currentPage}&limit=10`
      );
      const data = response.data;

      if (data.success) {
        setUsers(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching users. Please try again."
      );
      if (error.response?.status === 403) {
        setError("You don't have permission to access this resource.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [activeTab, currentPage]);

  const handleDeleteUser = async (id) => {
    try {
      setError(null);
      const response = await apiConfig.delete(`users/${id}`);
      const data = response.data;

      if (data.success) {
        setUsers(users.filter((user) => user._id !== id));
        setIsDeleteDialogOpen(false);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while deleting the user. Please try again."
      );
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      setError(null);
      const response = await apiConfig.put(`users/${id}`, editForm);
      const data = response.data;

      if (data.success) {
        setUsers(
          users.map((user) =>
            user._id === id ? { ...user, ...editForm } : user
          )
        );
        setIsEditMode(false);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while updating the user. Please try again."
      );
    }
  };

  const handleEditClick = async (user) => {
    try {
      setError(null);
      const response = await apiConfig.get(`users/${user._id}`);
      const userData = response.data.data;

      setSelectedUser(userData);
      setEditForm({
        name: userData.name,
        email: userData.email,
        phone: userData.phone || "",
        role: userData.role,
      });
      setIsEditMode(true);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching user details. Please try again."
      );
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-lg'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-6'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'>
              {error}
            </div>
          )}

          {/* Rest of the component remains exactly the same */}
          {/* Tab Navigation */}
          <div className='flex space-x-4 mb-6'>
            <Button
              variant={activeTab === "admin" ? "default" : "outline"}
              onClick={() => {
                setActiveTab("admin");
                setCurrentPage(1);
              }}
            >
              Admins
            </Button>
            <Button
              variant={activeTab === "campaigner" ? "default" : "outline"}
              onClick={() => {
                setActiveTab("campaigner");
                setCurrentPage(1);
              }}
            >
              Campaigners
            </Button>
            <Button
              variant={activeTab === "donor" ? "default" : "outline"}
              onClick={() => {
                setActiveTab("donor");
                setCurrentPage(1);
              }}
            >
              Donors
            </Button>
          </div>

          {/* User Table */}
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className='font-medium'>
                      <div className='flex items-center space-x-2'>
                        <UserCircle className='w-6 h-6' />
                        <span>{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className='capitalize'>{user.role}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.isVerified
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {user.isVerified ? "Verified" : "Pending"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className='flex space-x-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleEditClick(user)}
                        >
                          <Edit className='w-4 h-4' />
                        </Button>
                        <Button
                          variant='destructive'
                          size='sm'
                          onClick={() => {
                            setSelectedUser(user);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className='w-4 h-4' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className='flex items-center justify-between mt-4'>
            <Button
              variant='outline'
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className='w-4 h-4 mr-2' />
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant='outline'
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className='w-4 h-4 ml-2' />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent
          className='z-50 max-h-60 overflow-y-auto bg-white rounded-xl shadow-2xl
                 border border-gray-100 ring-1 ring-black ring-opacity-5'
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user and all their data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className='bg-red-600 hover:bg-red-700'
              onClick={() => handleDeleteUser(selectedUser?._id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit User Dialog */}
      <AlertDialog open={isEditMode} onOpenChange={setIsEditMode}>
        <AlertDialogContent
          className='z-50  overflow-y-auto bg-white rounded-xl shadow-2xl
                 border border-gray-100 ring-1 ring-black ring-opacity-5'
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Edit User</AlertDialogTitle>
          </AlertDialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <label>Name</label>
              <Input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
            </div>
            <div className='grid gap-2'>
              <label>Email</label>
              <Input
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
              />
            </div>
            <div className='grid gap-2'>
              <label>Phone</label>
              <Input
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
              />
            </div>
            <div className='grid gap-2'>
              <label>Role</label>
              <Select
                value={editForm.role}
                onValueChange={(value) =>
                  setEditForm({ ...editForm, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='admin'>Admin</SelectItem>
                  <SelectItem value='campaigner'>Campaigner</SelectItem>
                  <SelectItem value='donor'>Donor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleUpdateUser(selectedUser?._id)}
            >
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;

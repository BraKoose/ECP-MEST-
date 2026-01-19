import React, { useState } from 'react';
import axiosInstance from "../api/AxiosInstance";
import { FaSearch } from 'react-icons/fa';

export const TrackComplaint = () => {
    const [complaintId, setComplaintId] = useState('');
    const [complaint, setComplaint] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setComplaint(null);
        setLoading(true);

        try {
            const response = await axiosInstance.get(`/api/complaint/${complaintId}`);
            setComplaint(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Complaint not found or server error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                    Track Your Complaint
                </h1>

                <form onSubmit={handleSearch} className="mb-10">
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                            placeholder="Enter Complaint ID (e.g., 65a1b...)"
                            value={complaintId}
                            onChange={(e) => setComplaintId(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="absolute inset-y-0 right-0 px-4 py-2 bg-blue-600 text-white font-medium rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {loading ? 'Searching...' : 'Track'}
                        </button>
                    </div>
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                </form>

                {complaint && (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Complaint Details
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                ID: {complaint._id}
                            </p>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Title</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{complaint.title}</dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                                complaint.status === 'Registered' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'}`}>
                                            {complaint.status}
                                        </span>
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">
                                        {complaint.description}
                                    </dd>
                                </div>
                                {complaint.resolutionDetails && (
                                    <div className="bg-green-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t border-green-200">
                                        <dt className="text-sm font-bold text-green-700">Resolution Details</dt>
                                        <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                                            {complaint.resolutionDetails}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

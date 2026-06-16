import { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Eye, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const VolunteersList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Modal State
  const [selectedVol, setSelectedVol] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remarks, setRemarks] = useState('');

  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/volunteers?pageNumber=${page}&keyword=${keyword}&status=${statusFilter}`);
      setVolunteers(res.data.volunteers);
      setTotalPages(res.data.pages);
    } catch (error) {
      toast.error('Failed to fetch volunteers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search
    const delayDebounceFn = setTimeout(() => {
      fetchVolunteers();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [keyword, statusFilter, page]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/admin/volunteers/${id}/status`, { status: newStatus, remarks });
      toast.success(`Volunteer ${newStatus}`);
      setIsModalOpen(false);
      setRemarks('');
      fetchVolunteers();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this volunteer?')) {
      try {
        await api.delete(`/admin/volunteers/${id}`);
        toast.success('Volunteer deleted');
        fetchVolunteers();
      } catch (error) {
        toast.error('Failed to delete volunteer');
      }
    }
  };

  const openModal = (vol) => {
    setSelectedVol(vol);
    setIsModalOpen(true);
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      Approved: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Rejected: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Volunteer Management</h1>
          <p className="text-gray-500">Review and manage volunteer applications.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, email, or city..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading data...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volunteer Info</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College/City</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {volunteers.map((vol) => (
                    <tr key={vol._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                            {vol.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{vol.name}</div>
                            <div className="text-sm text-gray-500">ID: {vol.volunteerId || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{vol.email}</div>
                        <div className="text-sm text-gray-500">{vol.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 truncate max-w-xs">{vol.college}</div>
                        <div className="text-sm text-gray-500">{vol.city}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={vol.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openModal(vol)} className="text-orange-600 hover:text-orange-900 bg-orange-50 p-2 rounded-md transition-colors" title="View & Action">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDelete(vol._id)} className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-md transition-colors" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-700">Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span></p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
                <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Modal */}
      {isModalOpen && selectedVol && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="relative z-10 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start mb-5 border-b pb-4">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Applicant Review: {selectedVol.name}</h3>
                    <p className="text-sm text-gray-500">Review application details before making a decision.</p>
                  </div>
                  <StatusBadge status={selectedVol.status} />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div><span className="font-semibold text-gray-700">Email:</span> {selectedVol.email}</div>
                  <div><span className="font-semibold text-gray-700">Phone:</span> {selectedVol.phone}</div>
                  <div><span className="font-semibold text-gray-700">College:</span> {selectedVol.college}</div>
                  <div><span className="font-semibold text-gray-700">Course & Year:</span> {selectedVol.course} - {selectedVol.year}</div>
                  <div><span className="font-semibold text-gray-700">City:</span> {selectedVol.city}</div>
                  <div><span className="font-semibold text-gray-700">Availability:</span> {selectedVol.availability}</div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Skills & Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVol.skills?.map(s => <span key={s} className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-xs">{s}</span>)}
                    {selectedVol.interests?.map(i => <span key={i} className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs">{i}</span>)}
                  </div>
                </div>

                {selectedVol.resume && (
                  <div className="mb-6 border-t pt-4">
                    <a href={selectedVol.resume} target="_blank" rel="noreferrer" className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
                      View Uploaded Resume
                    </a>
                  </div>
                )}

                <div className="border-t pt-4">
                  <Input 
                    label="Remarks (Optional, will be sent to user)" 
                    placeholder="E.g. Great skills, looking forward to working with you."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
                <Button 
                  className="w-full inline-flex justify-center sm:w-auto bg-success hover:bg-green-600"
                  onClick={() => handleStatusChange(selectedVol._id, 'Approved')}
                >
                  <CheckCircle className="h-4 w-4 mr-2"/> Approve
                </Button>
                <Button 
                  variant="danger" 
                  className="w-full inline-flex justify-center sm:w-auto"
                  onClick={() => handleStatusChange(selectedVol._id, 'Rejected')}
                >
                  <XCircle className="h-4 w-4 mr-2"/> Reject
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full inline-flex justify-center sm:w-auto mt-3 sm:mt-0"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteersList;

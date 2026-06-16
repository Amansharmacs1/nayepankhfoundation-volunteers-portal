import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { User, Mail, Phone, MapPin, Briefcase, BookOpen, Clock, Upload } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import api from '../../utils/api';
import { setCredentials } from '../../slices/authSlice';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/me');
        setProfileData(res.data);
        
        // Populate form
        setValue('name', res.data.name);
        setValue('phone', res.data.phone);
        setValue('college', res.data.college);
        setValue('course', res.data.course);
        setValue('year', res.data.year);
        setValue('city', res.data.city);
        setValue('skills', res.data.skills?.join(', '));
        setValue('interests', res.data.interests?.join(', '));
        setValue('availability', res.data.availability);
      } catch (error) {
        toast.error('Failed to load profile');
      }
    };
    fetchProfile();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formattedData = {
        ...data,
        skills: data.skills.split(',').map(s => s.trim()),
        interests: data.interests.split(',').map(i => i.trim()),
      };

      const res = await api.put('/volunteer/profile', formattedData);
      dispatch(setCredentials(res.data)); // Update local storage and redux state
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const toastId = toast.loading('Uploading...');
    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Once uploaded, save to profile
      await api.put('/volunteer/profile', { [type]: res.data.url });
      
      toast.success(`${type === 'photo' ? 'Photo' : 'Resume'} uploaded successfully`, { id: toastId });
      
      // Update local state to show new photo immediately
      if (type === 'photo') {
        setProfileData(prev => ({ ...prev, photo: res.data.url }));
      }
    } catch (error) {
      toast.error('Upload failed', { id: toastId });
    }
  };

  if (!profileData) return <div className="p-8 text-center">Loading profile...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Avatar and Info Card */}
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardContent className="flex flex-col items-center pt-8">
            <div className="relative group mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center">
                {profileData?.photo ? (
                  <img src={profileData.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-primary-dark transition-colors">
                <Upload className="h-4 w-4" />
                <input id="photo-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'photo')} />
              </label>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 text-center">{profileData?.name}</h2>
            <p className="text-primary font-medium text-sm mt-1">{userInfo?.status} Volunteer</p>
            {userInfo?.volunteerId && (
              <p className="text-gray-500 font-mono text-sm mt-1">{userInfo?.volunteerId}</p>
            )}
            
            <div className="w-full mt-6 space-y-3">
              <div className="flex justify-between text-sm py-2 border-b">
                <span className="text-gray-500 flex items-center gap-2"><Mail className="h-4 w-4"/> Email</span>
                <span className="text-gray-900">{profileData?.email}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b">
                <span className="text-gray-500 flex items-center gap-2"><Phone className="h-4 w-4"/> Phone</span>
                <span className="text-gray-900">{profileData?.phone || '-'}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b">
                <span className="text-gray-500 flex items-center gap-2"><MapPin className="h-4 w-4"/> City</span>
                <span className="text-gray-900">{profileData?.city || '-'}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b">
                <span className="text-gray-500 flex items-center gap-2"><Clock className="h-4 w-4"/> Joined</span>
                <span className="text-gray-900">{new Date(profileData?.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="w-full mt-6">
              <label htmlFor="resume-upload" className="w-full">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <Briefcase className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-primary font-medium">Update Resume (PDF)</span>
                  <input id="resume-upload" type="file" className="hidden" accept=".pdf" onChange={(e) => handleFileUpload(e, 'resume')} />
                </div>
              </label>
              {profileData?.resume && (
                <a href={profileData.resume} target="_blank" rel="noreferrer" className="block text-center text-sm text-orange-500 hover:underline mt-2">
                  View Current Resume
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Edit Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" {...register('name', { required: 'Name is required' })} error={errors.name?.message} />
                <Input label="Phone Number" {...register('phone')} error={errors.phone?.message} />
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-4"><BookOpen className="h-4 w-4 text-primary"/> Educational Background</h3>
                <Input label="College / University" className="mb-4" {...register('college')} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input label="Course / Degree" {...register('course')} />
                  <Input label="Year of Study" {...register('year')} />
                </div>
                <Input label="Current City" {...register('city')} />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Skills & Interests</h3>
                <Input label="Skills (comma separated)" className="mb-4" {...register('skills')} />
                <Input label="Areas of Interest (comma separated)" className="mb-4" {...register('interests')} />
                
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                  <select 
                    {...register('availability')}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="Weekends only">Weekends only</option>
                    <option value="2-4 hours a week">2-4 hours a week</option>
                    <option value="5-10 hours a week">5-10 hours a week</option>
                    <option value="Full time volunteer">Full time volunteer</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <Button type="submit" isLoading={isLoading}>Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

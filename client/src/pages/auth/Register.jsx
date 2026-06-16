import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import api from '../../utils/api';
import { setCredentials } from '../../slices/authSlice';

const Register = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, trigger, getValues } = useForm();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNextStep = async () => {
    let fieldsToValidate = [];
    if (step === 1) fieldsToValidate = ['name', 'email', 'password', 'phone'];
    if (step === 2) fieldsToValidate = ['college', 'course', 'year', 'city'];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formattedData = {
        ...data,
        skills: data.skills.split(',').map(s => s.trim()),
        interests: data.interests.split(',').map(i => i.trim()),
      };

      const res = await api.post('/auth/register', formattedData);
      dispatch(setCredentials(res.data));
      
      toast.success('Registration successful! Welcome to NayePankh.');
      navigate('/volunteer/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side Branding */}
        <div className="md:w-1/3 bg-primary p-8 text-white flex flex-col justify-between hidden md:flex">
          <div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary font-bold text-2xl mb-6">
              N
            </div>
            <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
            <p className="text-orange-100">
              Become a part of something bigger. Your journey to make a difference starts here.
            </p>
          </div>
          <div className="mt-8">
            <div className="flex space-x-2 mb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`h-1.5 w-10 rounded-full ${step >= s ? 'bg-white' : 'bg-orange-300'}`} />
              ))}
            </div>
            <p className="text-sm text-orange-200">Step {step} of 3</p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="md:w-2/3 p-8">
          <div className="md:hidden mb-6 flex justify-center">
             <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">N</div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Volunteer Registration</h2>
          <p className="text-gray-500 mb-8">Please fill in your details to create an account.</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h3 className="font-semibold text-gray-700 border-b pb-2 mb-4">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Full Name" {...register('name', { required: 'Name is required' })} error={errors.name?.message} />
                  <Input label="Phone Number" {...register('phone', { required: 'Phone is required' })} error={errors.phone?.message} />
                </div>
                <Input label="Email Address" type="email" {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }})} error={errors.email?.message} />
                <Input label="Password" type="password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' }})} error={errors.password?.message} />
                
                <Button type="button" onClick={handleNextStep} className="w-full mt-6">Next Step</Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h3 className="font-semibold text-gray-700 border-b pb-2 mb-4">Educational Background</h3>
                <Input label="College / University" {...register('college', { required: 'College is required' })} error={errors.college?.message} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Course / Degree" {...register('course', { required: 'Course is required' })} error={errors.course?.message} />
                  <Input label="Year of Study" {...register('year', { required: 'Year is required' })} error={errors.year?.message} />
                </div>
                <Input label="Current City" {...register('city', { required: 'City is required' })} error={errors.city?.message} />
                
                <div className="flex gap-4 mt-6">
                  <Button type="button" variant="outline" onClick={handlePrevStep} className="w-1/3">Back</Button>
                  <Button type="button" onClick={handleNextStep} className="w-2/3">Next Step</Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h3 className="font-semibold text-gray-700 border-b pb-2 mb-4">Skills & Interests</h3>
                <Input 
                  label="Skills (comma separated)" 
                  placeholder="e.g. Teaching, Design, Social Media" 
                  {...register('skills', { required: 'Skills are required' })} 
                  error={errors.skills?.message} 
                />
                <Input 
                  label="Areas of Interest (comma separated)" 
                  placeholder="e.g. Education, Environment, Health" 
                  {...register('interests', { required: 'Interests are required' })} 
                  error={errors.interests?.message} 
                />
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                  <select 
                    {...register('availability', { required: 'Availability is required' })}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select availability...</option>
                    <option value="Weekends only">Weekends only</option>
                    <option value="2-4 hours a week">2-4 hours a week</option>
                    <option value="5-10 hours a week">5-10 hours a week</option>
                    <option value="Full time volunteer">Full time volunteer</option>
                  </select>
                  {errors.availability && <p className="mt-1 text-sm text-danger">{errors.availability.message}</p>}
                </div>

                <div className="flex items-start mt-6">
                  <input
                    id="consent"
                    type="checkbox"
                    {...register('consent', { required: 'You must agree to the terms' })}
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="consent" className="ml-2 block text-sm text-gray-600">
                    I confirm that the information provided is accurate and I consent to the terms and conditions of NayePankh Foundation.
                  </label>
                </div>
                {errors.consent && <p className="mt-1 text-sm text-danger">{errors.consent.message}</p>}
                
                <div className="flex gap-4 mt-6">
                  <Button type="button" variant="outline" onClick={handlePrevStep} className="w-1/3">Back</Button>
                  <Button type="submit" isLoading={isLoading} className="w-2/3 bg-success hover:bg-green-600">Submit Application</Button>
                </div>
              </motion.div>
            )}
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
              Log in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

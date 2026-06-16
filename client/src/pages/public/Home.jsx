import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import { Heart, Users, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                Empowering Volunteers. <br/> Strengthening Communities.
              </h1>
              <p className="text-lg md:text-xl text-orange-100 mb-10 max-w-2xl">
                Join NayePankh Foundation today and become a part of a nationwide movement to uplift the underprivileged. Your time and skills can change lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button variant="white" size="lg" className="w-full sm:w-auto">
                    Become a Volunteer
                  </Button>
                </Link>
                <Link to="#about">
                  <Button variant="white-outline" size="lg" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="absolute inset-0 bg-secondary rounded-2xl transform rotate-3 opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Children smiling - NayePankh Foundation" 
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl relative z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100 relative -mt-10 z-20 max-w-6xl mx-auto rounded-xl shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
          <div>
            <p className="text-4xl font-bold text-primary mb-2">50k+</p>
            <p className="text-gray-600 font-medium">Lives Impacted</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary mb-2">10k+</p>
            <p className="text-gray-600 font-medium">Active Volunteers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary mb-2">50+</p>
            <p className="text-gray-600 font-medium">Cities Covered</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary mb-2">100+</p>
            <p className="text-gray-600 font-medium">Active Programs</p>
          </div>
        </div>
      </section>

      {/* About & Mission */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About NayePankh Foundation</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                NayePankh Foundation is a non-governmental organization dedicated to bringing a positive change in society by empowering the underprivileged. We believe in providing 'new wings' (Naye Pankh) to those who dare to dream but lack the resources.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Our Mission</h3>
                    <p className="text-gray-600 mt-1">To eradicate poverty, hunger, and illiteracy through community-driven initiatives and dedicated volunteer support.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Our Vision</h3>
                    <p className="text-gray-600 mt-1">A world where every individual has equal opportunities to thrive, regardless of their socio-economic background.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeIn} className="relative h-96 bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Community Impact" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Volunteer */}
      <section id="programs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Volunteer With Us?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Volunteering is not just about giving back; it's about growing, learning, and becoming a leader.
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Make Real Impact",
                desc: "Your efforts directly translate to smiles, education, and better lives for those in need.",
                icon: <Heart className="h-8 w-8 text-danger" />
              },
              {
                title: "Develop Skills",
                desc: "Enhance your leadership, communication, and teamwork skills while working on real projects.",
                icon: <Users className="h-8 w-8 text-primary" />
              },
              {
                title: "Official Certification",
                desc: "Get an official NayePankh Volunteer Certificate and LOR for your outstanding contributions.",
                icon: <CheckCircle2 className="h-8 w-8 text-success" />
              }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeIn} className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-orange-100 mb-10">
            Join thousands of youth across India who are dedicating their time to nation-building.
          </p>
          <Link to="/register">
            <Button variant="white" size="lg" className="rounded-full px-8 shadow-lg">
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

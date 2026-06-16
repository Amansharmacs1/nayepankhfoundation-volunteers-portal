import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="https://assets.zyrosite.com/YKbL494Mv8Ip3qgy/logo-AVLW2LLWZkI8v845.png" alt="NayePankh Logo" className="h-10 bg-white p-1 rounded" />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Empowering Volunteers. Strengthening Communities. Join hands with us to make a difference.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/#about" className="text-gray-400 hover:text-primary transition-colors text-sm">About Us</a></li>
              <li><a href="/#programs" className="text-gray-400 hover:text-primary transition-colors text-sm">Our Programs</a></li>
              <li><Link to="/register" className="text-gray-400 hover:text-primary transition-colors text-sm">Volunteer</Link></li>
              <li><a href="/#contact" className="text-gray-400 hover:text-primary transition-colors text-sm">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-primary transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>info@nayepankh.org</li>
              <li>+91 98765 43210</li>
              <li>New Delhi, India</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} NayePankh Foundation. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Social Links placeholders */}
            <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Facebook</span>FB</a>
            <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Twitter</span>TW</a>
            <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Instagram</span>IG</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

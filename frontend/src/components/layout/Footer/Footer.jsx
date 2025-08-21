import logo from '../../../assets/images/prelovedlogo.png';

/**
 * Footer component with logo and copyright
 */
const Footer = () => {
  return (
    <footer className="fixed bottom-0 right-0 p-4 z-10">
      <div className="flex flex-col items-end space-y-2">
        <img 
          src={logo} 
          alt="PreLoved Logo" 
          className="w-12 h-12 opacity-80 hover:opacity-100 transition-opacity duration-200" 
        />
        <p className="text-xs text-neutral-700 font-medium">© 2023, PreLoved</p>
      </div>
    </footer>
  );
};

export default Footer;
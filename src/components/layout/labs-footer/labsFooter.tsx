const LabsFooter = () => {
  return (
    <footer className="relative border-t border-white/5 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © 2024 Haelo Studios. Crafted with precision.
            </p>
            <p className="text-gray-600 text-xs mt-1">labs.haelostudios.com</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Built with React</span>
            <span>•</span>
            <span>Framer Motion</span>
            <span>•</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LabsFooter;

function Footer() {
  return (
    <footer className="relative bottom-0 left-0 right-0 pt-7 mt-4 pb-3 border-black-300 flex justify-between items-center flex-wrap gap-5 bg-black">
      <div className="text-white flex gap-2 px-2">
        <a href="#" className="hover:underline">Terms & Conditions</a>
        <span>|</span>
        <a href="#" className="hover:underline">Privacy Policy</a>
      </div>

      <div className="flex gap-4">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="Github">
          <img src="/assets/github.svg" alt="GitHub" className="w-6 h-6 text-white" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <img src="/assets/twitter.svg" alt="Twitter" className="w-6 h-6 text-white" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <img src="/assets/instagram.svg" alt="Instagram" className="w-6 h-6 text-white" />
        </a>
      </div>

      <p className="text-white px-3">© 2024 Sparsh Singh. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

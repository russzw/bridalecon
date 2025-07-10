// app/components/Footer.tsx

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-700 mt-12 p-4 text-center text-sm text-gray-400">
      © {new Date().getFullYear()} Bridal Economics Explorer. All rights reserved.
    </footer>
  );
};

export default Footer;


// app/components/Contributions.tsx

import { FaEnvelope, FaGithub } from 'react-icons/fa';

const Contributions = () => {
  return (
    <div className="p-6 bg-purple-900 rounded-lg shadow-inner mt-12">
      <h2 className="text-3xl font-bold mb-6 text-purple-400 font-serif underline">Contribute to the Project</h2>
      <p className="text-lg mb-6 font-light text-lilac-200">
        This project is open source and we welcome contributions. If you have data for a country not yet included, or if you have corrections to the existing data, please feel free to contribute.
      </p>
      <div className="flex flex-col sm:flex-row gap-6">
        <a
          href="mailto:russellmutamba@protonmail.com"
          className="flex items-center justify-center bg-lilac-200 hover:bg-lilac-300 text-black font-bold py-4 px-8 rounded-lg transition duration-300 ease-in-out text-center text-xl"
        >
          <FaEnvelope className="h-5 w-5 mr-3" />
          Contribute via Email
        </a>
        <a
          href="https://github.com/russzw/bridalecon"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out text-center"
        >
          <FaGithub className="h-4 w-4 mr-2" />
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default Contributions;

// app/about/page.tsx

import GoBackButton from "../components/GoBackButton";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <GoBackButton />
      <div className="bg-purple-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-lilac-300">About Bridal Economics Explorer</h1>
        <p className="text-lilac-200">
          The Bridal Economics Explorer is a platform dedicated to visualizing and understanding the concept of bride price across different cultures and regions. Our goal is to provide a comprehensive and accessible resource for researchers, journalists, and anyone interested in the economic and cultural aspects of marriage.
        </p>
        <p className="text-lilac-200">
          We believe that by making this data available, we can foster a greater understanding of the diverse traditions and practices that shape our world. We are committed to presenting this information in a neutral and informative manner, without judgment or bias.
        </p>
        <p className="text-lilac-200">
          This project is open source and we welcome contributions from the community. If you have data or insights that you would like to share, please don&apos;t hesitate to get in touch.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;

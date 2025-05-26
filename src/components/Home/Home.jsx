import React, { useState, useEffect } from "react";

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=9cb02ee28139471e8bc874618183c29d`;

        const corsProxy = "https://corsproxy.io/?";
        const finalUrl =
          window.location.hostname === "localhost" ? url : corsProxy + url;

        const response = await fetch(finalUrl);
        const data = await response.json();

        setNews(data.articles?.slice(0, 6) || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            Welcome to News 24X7
          </h1>
          <p className="text-lg md:text-xl font-medium">
            Your trusted source for breaking news and real-time updates.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white shadow-md">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            About Our Website
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At <span className="font-semibold text-red-600">News 24X7</span>, we
            aim to deliver the most up-to-date and credible news from around the
            globe. Whether it’s politics, technology, or entertainment, we’ve
            got you covered. Our user-friendly interface ensures a seamless
            browsing experience for everyone.
          </p>
        </div>
      </section>

      {/* Breaking News Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-red-50 to-red-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-red-600 text-center mb-10">
            Breaking News
          </h2>
          {loading ? (
            <p className="text-center text-gray-500 text-lg">Loading news...</p>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt="News"
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {article.description || "No description available."}
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 font-medium hover:underline"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No breaking news available at the moment.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("publishedAt");
  const [activeCategory, setActiveCategory] = useState("general");

  const categories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const API_KEY = "9cb02ee28139471e8bc874618183c29d";

  const fetchArticles = async () => {
    setLoading(true);
    const endpoint =
      searchQuery.trim().length > 0
        ? `https://newsapi.org/v2/everything?q=${searchQuery}&sortBy=${sortOption}&language=en&apiKey=${API_KEY}`
        : `https://newsapi.org/v2/top-headlines?category=${activeCategory}&country=us&apiKey=${API_KEY}`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.status !== "ok") {
        throw new Error(data.message || "Failed to fetch news");
      }

      const validArticles = (data.articles || []).filter(
        (article) =>
          article.title &&
          article.url &&
          article.urlToImage &&
          article.description
      );

      setArticles(validArticles);
    } catch (error) {
      console.error("Error fetching news:", error);
      alert("Failed to fetch news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim().length === 0) fetchArticles();
  }, [activeCategory, sortOption]);

  useEffect(() => {
    if (searchQuery.trim().length > 0) fetchArticles();
  }, [searchQuery, sortOption]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-800 text-white py-6 shadow-md">
        <h1 className="text-3xl font-bold text-center tracking-tight">
          News 24X7 Portal
        </h1>
        <p className="text-center text-sm opacity-90">
          Stay updated with real-time news across categories
        </p>
      </header>

      {/* Search + Sort Controls */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Search for news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={fetchArticles}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Search
          </button>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm"
          >
            <option value="publishedAt">Latest</option>
            <option value="relevancy">Most Relevant</option>
            <option value="popularity">Most Popular</option>
          </select>
        </div>

        {/* Category Buttons */}
        {searchQuery.trim().length === 0 && (
          <div className="flex flex-wrap justify-center mt-6 gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  activeCategory === category
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-red-100"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 pb-16">
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading news...</p>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto text-red-600 font-medium hover:underline"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No articles found for your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;

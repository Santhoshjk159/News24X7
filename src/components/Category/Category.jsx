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
    if (searchQuery.trim().length === 0) {
      fetchArticles();
    }
  }, [activeCategory, sortOption]);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      fetchArticles();
    }
  }, [searchQuery, sortOption]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-red-600 text-white p-4">
        <h1 className="text-2xl font-bold text-center">News Portal</h1>
      </header>

      {/* Search and Sort Options */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search for news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-2/3"
          />
          <button
            onClick={fetchArticles}
            className="ml-4 bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>

          {/* Sort */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="publishedAt">Latest</option>
            <option value="relevancy">Most Relevant</option>
            <option value="popularity">Most Popular</option>
          </select>
        </div>

        {/* Categories */}
        {searchQuery.trim().length === 0 && (
          <div className="flex space-x-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg ${
                  activeCategory === category
                    ? "bg-red-600 text-white"
                    : "bg-gray-300"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* News Articles */}
      <div className="p-4">
        {loading ? (
          <p className="text-center text-gray-600">Loading news...</p>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col"
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="rounded-t-lg w-full h-48 object-cover"
                  />
                )}
                <h2 className="text-lg font-bold mt-4">{article.title}</h2>
                <p className="text-gray-600 text-sm mt-2">
                  {article.description}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto text-red-600 font-bold"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No articles found for your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;

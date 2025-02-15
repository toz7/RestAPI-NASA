import React, { useState } from "react";
import PostList from "./PostList";
import "./App.css"; // Import CSS file

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container">
      <h1>🚀 NASA News Feed</h1>

      {/* 🔍 Search Bar */}
      <input 
        type="text" 
        placeholder="Search posts..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      <PostList searchQuery={searchQuery} />
    </div>
  );
};

export default App;

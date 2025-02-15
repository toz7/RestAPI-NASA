import React, { useState, useEffect } from "react";
import { getPosts } from "./Api";

const PostList = ({ searchQuery }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const data = await getPosts(page);
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, [page]);

  const filteredPosts = posts.filter(post => 
    post.title.rendered.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {loading ? <p className="loading">Loading posts...</p> : (
        <div className="post-grid">
          {filteredPosts.length === 0 ? <p>No posts found</p> : (
            filteredPosts.map(post => (
              <div className="post-card" key={post.id}>
                <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                
                {post.imageUrl ? (
                  <img src={post.imageUrl} alt="NASA Post" className="post-image" />
                ) : (
                  <p>No Image Available</p>
                )}

                <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                <a href={post.link} target="_blank" rel="noopener noreferrer" className="read-more">Read More</a>
              </div>
            ))
          )}
        </div>
      )}
      
      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="nav-button">⬅ Previous</button>
        <button onClick={() => setPage(page + 1)} className="nav-button">Next ➡</button>
      </div>
    </div>
  );
};

export default PostList;

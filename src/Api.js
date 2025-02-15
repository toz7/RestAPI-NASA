export const getPosts = async (page = 1) => {
    try {
      const response = await fetch(`https://www.nasa.gov/wp-json/wp/v2/posts?page=${page}&per_page=5`);
      if (!response.ok) throw new Error("Failed to fetch posts");
      
      const posts = await response.json();
  
      // Fetch images for each post
      const postsWithImages = await Promise.all(posts.map(async (post) => {
        if (post.featured_media) {
          try {
            const mediaResponse = await fetch(`https://www.nasa.gov/wp-json/wp/v2/media/${post.featured_media}`);
            if (mediaResponse.ok) {
              const mediaData = await mediaResponse.json();
              post.imageUrl = mediaData.source_url; // Attach image URL to the post
            } else {
              post.imageUrl = null; // No image found
            }
          } catch (error) {
            post.imageUrl = null;
          }
        } else {
          post.imageUrl = null; // No featured image
        }
        return post;
      }));
  
      return postsWithImages;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };
  
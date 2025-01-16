import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BlogPage.css";
import { WordPressPost } from "../types/WordPress";

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<WordPressPost[]>(
          "https://blogs.cupshup.ai/wp-json/wp/v2/posts?_embed"
        );
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blog posts.");
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="blog-page" id="blog">
      <header className="blog-header">
        <h1>Latest News</h1>
        <a href="/all-blogs" className="see-all-link">
          See All →
        </a>
      </header>
      <div className="blog-list-container">
        <ul className="blog-list">
          {posts.map((post) => (
            <li className="blog-card" key={post.id}>
              {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                <img
                  src={post._embedded["wp:featuredmedia"][0].source_url}
                  alt={post.title.rendered}
                  className="blog-image"
                />
              ) : (
                <div className="blog-image-placeholder">No Image Available</div>
              )}
              <div className="blog-content">
                <h2
                  className="blog-title"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <p
                  className="blog-excerpt"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <a
                  className="read-more-btn"
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Full Article
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogPage;

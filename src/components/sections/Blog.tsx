import React from 'react';
import { BlogHeader } from './Blog/BlogHeader';
import { BlogList } from '../blog/BlogList';
import { useBlogPosts } from '../../hooks/useBlogPosts';

export function Blog() {
  const { posts, isLoading } = useBlogPosts();

  return (
    <section id="blog" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogHeader />
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <BlogList posts={posts} />
        )}
      </div>
    </section>
  );
}
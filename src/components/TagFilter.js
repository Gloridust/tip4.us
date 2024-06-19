// src/components/TagFilter.js
import React from 'react';

function TagFilter({ tags, selectedTag, onTagSelect }) {
  return (
    <div className="tag-filter">
      {tags.map(tag => (
        <button 
          key={tag} 
          className={tag === selectedTag ? 'selected' : ''} 
          onClick={() => onTagSelect(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default TagFilter;

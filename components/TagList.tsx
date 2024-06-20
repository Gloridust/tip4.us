const TagList = ({ tags }) => (
    <div className="tag-list">
      {tags.map(tag => (
        <span key={tag} className="tag">{tag}</span>
      ))}
    </div>
  )
  
  export default TagList
  
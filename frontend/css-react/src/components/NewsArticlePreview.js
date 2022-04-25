const NewsArticlePreview = ({ article }) => {
  return (
    <div>
      <div className="news-preview-container">
        {article.image != "None" && (
          <img
            className="article-preview-image"
            src={article.image}
            alt={article.title}
          />
        )}
        <div className="article-title">{article.title}</div>
        <div className="article-description">{article.description}</div>
        <a className="small-button" href={article.url}>
          Read Full Article
        </a>
      </div>
    </div>
  );
};

export default NewsArticlePreview;

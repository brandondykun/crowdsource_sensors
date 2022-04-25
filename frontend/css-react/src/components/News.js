import apiCalls from "../apis/apiCalls";
import { useEffect, useState } from "react";
import NewsArticlePreview from "./NewsArticlePreview";

const News = () => {
  const [articles, setArticles] = useState();

  const getArticles = async () => {
    const articlesResponse = await apiCalls.getNews();
    if (articlesResponse) {
      setArticles(articlesResponse.news);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  if (!articles) {
    return (
      <div className="main-content">
        <div className="loading-message"> Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="responsive-width-container">
        <h1 className="page-title">Top Tech News</h1>
        {articles &&
          articles.map((article) => {
            return <NewsArticlePreview article={article} key={article.id} />;
          })}
      </div>
    </div>
  );
};

export default News;

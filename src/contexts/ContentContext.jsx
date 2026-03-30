import { createContext, useContext, useEffect, useState } from "react";
import { fetchContent } from "../data/content.js";

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshContent = async () => {
    try {
      // Clear cache in data/content.js if necessary, 
      // but fetchContent already returns current API data if we hit the server.
      const res = await fetch("/api/content");
      const data = await res.json();
      setContent(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContent()
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading, error, refreshContent }}>
      {children}
    </ContentContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return context;
}

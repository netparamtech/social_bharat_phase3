import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageContentWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top of the page when navigating to a new route
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <div className="main-content">{children}</div>;
};

export default PageContentWrapper;

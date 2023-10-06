import { useEffect } from "react";

const useVt = (callback, dependencies) => {
  useEffect(() => {
    callback();
  }, dependencies);
};

export default useVt;
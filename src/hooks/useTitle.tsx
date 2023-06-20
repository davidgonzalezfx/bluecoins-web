import { useEffect, useState } from "react";

const useTitle = (initialTitle: string) => {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return [setTitle];
};

export default useTitle;

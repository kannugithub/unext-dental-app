import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useIsNotFoundPage = () => {
  const router = useRouter();
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);

  useEffect(() => {
    // List of all valid routes in your application
    const validRoutes = ["/", "/login", "/signup" /* ... */];

    // Check if the current route is a valid route
    const isValidRoute = validRoutes.includes(router.pathname);

    // If the current route is not a valid route, it's the not-found page
    setIsNotFoundPage(!isValidRoute);
  }, [router.pathname]);

  return isNotFoundPage;
};

export default useIsNotFoundPage;

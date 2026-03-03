"use client";
import { useEffect } from "react";
import Home from "./Components/Home/Home";
import CookieCard from "./Components/common/Cookies/CookiesCard";
import CookiCard from "./Components/common/Cookies/CookiesCard";

export default function Page() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      var Tawk_API = Tawk_API || {},
        Tawk_LoadStart = new Date();
      (function () {
        var s1 = document.createElement("script"),
          s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = "https://embed.tawk.to/65239ef9eb150b3fb99f6fd8/1hc9i9vr2";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        s0.parentNode.insertBefore(s1, s0);
      })();
    }
  }, []);

  return (
    <>
      <CookiCard />
      <Home />
    </>
  );
}

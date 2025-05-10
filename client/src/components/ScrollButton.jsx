import { useEffect, useState } from "react";
import { ChevronsUp} from "lucide-react"

function ScrollButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300); // 超過 300px 才顯示
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showButton) return null;

  return (
    <button
      onClick={handleScrollTop}
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        backgroundColor: "#b0b0b0",
        color: "#fff",
        border: "none",
        opacity: 0.8,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ChevronsUp size={30} />
    </button>
  );
}

export default ScrollButton;
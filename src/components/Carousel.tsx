import React, { useState, useEffect } from "react";

interface CarouselProps {
  images: string[];
  altTexts?: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images, altTexts = [] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 767);
    }
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close modal on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalOpen(false);
        setCurrentIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentIndex(null);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 16,
          padding: 16,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          cursor: "pointer",
          scrollbarWidth: "none",
        }}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            style={{
              flex: isMobile ? "none" : "0 0 calc((100% / 3) - 16px)",
              width: isMobile ? "100%" : undefined,
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              overflow: "hidden",
              transition: "transform 0.3s ease",
            }}
            onClick={() => openModal(idx)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={src}
              alt={altTexts[idx] || `carousel-image-${idx}`}
              loading="lazy"
              style={{
                width: "100%",
                objectFit: "cover",
                display: "block",
                borderRadius: 12,
                userSelect: "none",
              }}
            />
          </div>
        ))}
      </div>
      {modalOpen && currentIndex !== null && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            cursor: "pointer",
            animation: "fadeIn 0.3s ease",
          }}
          aria-modal="true"
          role="dialog"
        >
          <img
            src={images[currentIndex]}
            alt={altTexts[currentIndex] || `modal-image-${currentIndex}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: 12,
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
              cursor: "auto",
              userSelect: "none",
            }}
          />
          <button
            onClick={closeModal}
            aria-label="Close modal"
            style={{
              position: "fixed",
              top: 20,
              right: 20,
              background: "transparent",
              border: "none",
              fontSize: 30,
              color: "white",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            &times;
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        @media (max-width: 767px) {
          div[style*="flex: 0 0 calc((100% / 3) - 16px)"] {
            flex: none !important;
            width: 100% !important;
            height: 200px !important;
            margin-bottom: 16px;
          }
          div[style*="flex: 0 0 calc((100% / 3) - 16px)"]:last-child {
            margin-bottom: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Carousel;

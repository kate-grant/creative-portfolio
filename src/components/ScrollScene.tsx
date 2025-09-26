import React from "react";

type ScrollSceneProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

const ScrollScene = ({ id, className, children }: ScrollSceneProps) => {
  return (
    <section
      id={id}
      className={className}
      style={{
        minHeight: "100vh",
        boxSizing: "border-box",
        scrollSnapAlign: "start",
      }}
    >
      {children}
    </section>
  );
};

export default ScrollScene;

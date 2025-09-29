// src/components/AboutSection.tsx
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import React from "react";
import "./About.module.css";

const paragraphs = [
  `I am a poet and interdisciplinary artist from Brooklyn. My work explores the quiet geometries of a path shaped by city light and porous façades. I hold a B.A. in Music,  channeling a subtle rhythm that hums beneath my prose and language shaped like melody.`,
  `My creative path moves between the written word, the visual, and the sonic, always chasing resonance over rules.`,
  `Whether sculpting stanzas, crafting visual experiences, or composing textures of sound, I seek moments that trace the intersections of technology, creativity, and the quiet architectures of memory.`,
  `Art, for me, is not a medium but a meeting place. My background in music taught me to listen deeply. Now, I build experiences that echo the environments that shape us.`,
];

const About = () => {
  return (
    <section
      className="about-container"
      id="about"
      style={{ paddingTop: window.innerHeight < 750 ? "80vh" : 0 }}
    >
      <div className="about-content">
        <h2>About</h2>
        {paragraphs.map((text, index) => (
          <AnimatedParagraph key={index} delay={index * 0.2}>
            {text}
          </AnimatedParagraph>
        ))}
      </div>
    </section>
  );
};

type AnimatedParagraphProps = {
  children: React.ReactNode;
  delay: number;
};

const AnimatedParagraph = ({ children, delay }: AnimatedParagraphProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="about-paragraph"
    >
      {children}
    </motion.p>
  );
};

export default About;

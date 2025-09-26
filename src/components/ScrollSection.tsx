import React, { useEffect } from "react";
import AnimatedSVGsContainer from "./AnimatedSVGsContainer";
import ScrollScene from "./ScrollScene";
import Carousel from "./Carousel";
import b1 from "@assets/broadside_fomo_kate_grant.jpg";
import b2 from "@assets/broadside_hope_kate_grant.jpg";
import b3 from "@assets/vision_broadside_kate_grant.jpg";
import b4 from "@assets/waterline_zine_kate_grant.jpg";
import b5 from "@assets/degraw_pool_broadside_kate_grant.jpg";
import b6 from "@assets/phantom_girl_poster_kate_grant.jpg";
import yami from "@assets/youareami_kate_grant.png";
import About from "./About";

const images = [b1, b2, b3, b4, b5, b6];

const ScrollSections: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 767);
    }
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <>
      <ScrollScene id="home">
        <AnimatedSVGsContainer />
      </ScrollScene>

      <ScrollScene id="about">
        <About />
      </ScrollScene>

      <ScrollScene id="posters">
        <h2>Posters and Broadsides</h2>
        <div style={{ maxWidth: "90vw", margin: "0 auto" }}>
          <Carousel images={images} />
        </div>
      </ScrollScene>
      <ScrollScene id="digital">
        <h2>Digital Audio</h2>
        <div
          style={{
            maxWidth: "90vw",
            margin: "0 auto",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <img
            src={yami}
            style={{
              maxWidth: isMobile ? "80%" : "30%",
              height: "50%",
              borderRadius: "12px",
            }}
          />
          <div
            style={{
              margin: "2em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3 style={{ textAlign: isMobile ? "center" : "left" }}>
              YouAreAmI
            </h3>
            <p
              style={{
                textAlign: isMobile ? "center" : "left",
                fontSize: isMobile ? "1rem" : "1.7rem",
              }}
            >
              YouAreAmI is a multi-player MIDI synthesizer that uses proximity
              and sentiment ML analysis to control Web Audio. By exploring the
              concept of shared space and the emotions that arise from sharing
              space, YouAreAmI asks users to emote their presence. Proximity
              between users creates a feeling of increased activity, anxiety,
              distraction, or intimacy, with the goal of modeling physical
              space, while amplifying the complexity of emotions that arise in
              shared spaces.
            </p>
            <a
              href="https://youareami.onrender.com/"
              target="_blank"
              style={{
                textAlign: isMobile ? "center" : "left",
                fontSize: "2em",
                textDecoration: "underline",
                textDecorationStyle: "wavy",
              }}
            >
              Visit
            </a>
          </div>
        </div>
      </ScrollScene>
    </>
  );
};

export default ScrollSections;

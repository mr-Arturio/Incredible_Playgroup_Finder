import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const IntroductionText = () => {
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { translation } = useLanguage();

  useEffect(() => {
    setIsClient(true); // Set client-side flag after component mounts
  }, []);

  const toggleTextVisibility = () => {
    setIsFullTextVisible((prevVisibility) => !prevVisibility);
  };

  // Define text mappings based on the selected language
  const translations = {
    fullText:
      translation === "fr" ? (
        <>
          <p>
            Les Centres pour l&apos;enfant et la famille EarlyON offrent un
            espace accueillant pour les enfants, les parents et les gardiens,
            afin de participer à des programmes et des services de qualité qui
            soutiennent le développement de l&apos;enfant, y compris :
          </p>
          <ul className="list-disc list-inside mb-2">
            <li>
              Programmes spécialement conçus pour les enfants jusqu&apos;à six
              ans
            </li>
            <li>
              Des expériences d&apos;apprentissage par le jeu amusantes et
              engageantes – comme la peinture, le dessin, la construction, la
              création, la lecture, les contes, le chant et bien plus encore
            </li>
            <li>
              Des conseils de professionnels formés au développement de la
              petite enfance
            </li>
            <li>
              Informations ou références à des programmes et services
              spécialisés dans la communauté
            </li>
            <li>
              Opportunité de rencontrer et de créer des liens avec des familles
              ayant de jeunes enfants
            </li>
          </ul>
          <p>
            Les parents peuvent facilement trouver des groupes de jeu locaux qui
            répondent à leurs besoins en utilisant cet outil, qui filtre en
            fonction du temps, de l&apos;âge, de l&apos;emplacement et
            d&apos;autres catégories.
          </p>
        </>
      ) : (
        <>
          <p>
            EarlyON Child and Family Centres provide a welcoming space for
            children, parents, and caregivers to engage in quality programs and
            services that support their child&apos;s development, including:
          </p>
          <ul className="list-disc list-inside mb-2">
            <li>
              Programs designed especially for children up to six years old
            </li>
            <li>
              Play-based learning experiences that are fun and engaging – such
              as painting, drawing, building, creating, reading, storytelling,
              singing and much more
            </li>
            <li>
              Advice from professionals trained in early childhood development
            </li>
            <li>
              Information or referrals to specialized programs and services
              within the community
            </li>
            <li>
              Opportunity to meet and make connections with families with young
              children
            </li>
          </ul>
          <p>
            Parents can easily find local playgroups that suit their needs using
            this tool, which filters based on time, age, location and other
            categories.
          </p>
        </>
      ),
    shortText:
      translation === "fr" ? (
        <p>
          Découvrez l&apos;outil ultime pour les parents d&apos;Ottawa afin de
          trouver et planifier facilement des sorties passionnantes avec les
          groupes de jeu EarlyON adaptées à leur emploi du temps et à leurs
          préférences!
        </p>
      ) : (
        <p>
          Discover the ultimate tool for Ottawa parents to effortlessly find and
          plan exciting EarlyON playgroup outings tailored to their schedule and
          preferences!
        </p>
      ),
    showMore: translation === "fr" ? "En savoir plus" : "Read More",
    showLess: translation === "fr" ? "Lire moins" : "Read Less",
  };

  // Render a loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="flex-col items-center justify-between">
        <div className="mt-8 md:mt-4 md:mb-8 text-left">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <LanguageSwitcher />
      </div>
      <div className="flex-col items-center justify-between bg-cardBody/75 rounded-lg">
        <div className="mt-8 md:pt-5 md:pl-5 pt-2 pl-2 mb-1 md:mb-6 text-left text-sm md:text-base">
          <div>{translations.shortText}</div>
          <div>
            {isFullTextVisible && translations.fullText}
            <button
              onClick={toggleTextVisibility}
              className="text-blue-500 my-2"
            >
              {isFullTextVisible
                ? translations.showLess
                : translations.showMore}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroductionText;
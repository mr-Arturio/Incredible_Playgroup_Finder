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
          <section className="mb-6 mt-2">
            <h2 className="text-xl font-bold mb-3 text-blue-600">
              COMMENT UTILISER L&apos;OUTIL INCROYABLE
            </h2>
            <p>
              Utilisez un ou plusieurs filtres (jour, heure, âge, région, langue
              et prestataire) pour trouver le groupe de jeu idéal pour vos
              besoins. La carte interactive (nous vous recommandons de partager
              votre emplacement) peut être utilisée pour afficher l&apos;emplacement
              de tous les groupes de jeu qui correspondent à vos critères de
              recherche. Vous pouvez également utiliser la carte pour rechercher
              les groupes de jeu proposés dans un lieu spécifique. La carte
              fournit également des indications pour vous aider à trouver votre
              chemin.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-blue-600">
              POURQUOI LE JEU EST IMPORTANT ET POURQUOI DEVRAIS-JE JOUER AVEC
              MON ENFANT&#8239;?
            </h2>
            <p className="mb-3">
              Grâce au jeu, les enfants développent leurs aptitudes sociales,
              renforcent leur confiance en eux et posent les bases de leur
              réussite future. Ils établissent également des liens avec vous.
              Alors, prenons le temps de jouer et regardons nos enfants grandir,
              apprendre et s&apos;épanouir - tout en s&apos;amusant&#8239;!
            </p>
            <p className="font-semibold">
              Grâce à l&apos;Outil Incroyable, vous pouvez maintenant trouver et
              planifier sans effort des sorties amusantes, adaptées à votre
              horaire et à vos besoins&#8239;!
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-blue-600">
              QU&apos;EST-CE QU&apos;UN EARLYON/ONyva ET POURQUOI DEVRAIS-JE Y
              ALLER&#8239;?
            </h2>
            <p className="mb-3">
              Les groupes de jeux ONyva s&apos;offre aux enfants un environnement
              gratuit, amusant, stimulant et encourageant qui leur permet
              d&apos;apprendre, de grandir et d&apos;acquérir des compétences
              essentielles. Ces centres offrent une multitude de possibilités
              d&apos;apprentissage par le jeu, favorisant la socialisation, la
              créativité et le développement dans un cadre sûr et stimulant.
            </p>
            <p>
              En outre, les parents peuvent entrer en contact avec d&apos;autres
              familles, accéder à des ressources et à un soutien précieux, et
              apprendre de nouvelles façons d&apos;améliorer l&apos;expérience de la
              petite enfance de leur enfant. Les centres ONyva sont une
              ressource inestimable pour les familles, car ils favorisent des
              relations parent-enfant positives et contribuent au bien-être et à
              la réussite des enfants.
            </p>
          </section>

          <footer className="text-center">
            <p className="font-bold text-lg text-blue-600">
              Amusez-vous bien en explorant&#8239;!
            </p>
          </footer>
        </>
      ) : (
        <>
          <section className="mb-6 mt-2">
            <h2 className="text-xl font-bold mb-3 text-blue-600">
              HOW TO USE THE PLAYGROUP FINDER
            </h2>
            <p>
              Use one or more of the filters (day, time, age, area, language,
              and provider) to find the perfect playgroup for your needs. The
              interactive map (we recommend sharing your location) can be used
              to show the location of all the playgroups that fit your search
              terms. You can also use the map to search the playgroups offered
              at a specific location. The map also provides directions to help
              you find your way.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-blue-600">
              WHY IS PLAY IMPORTANT AND WHY SHOULD I PLAY WITH MY CHILD?
            </h2>
            <p className="mb-3">
              Through play, children build their social skills, boost their
              self-confidence, and create a strong foundation for their future
              success – and build a connection with you. So, let&apos;s carve
              out some time for play, and watch our kids grow, learn, and thrive
              – all while having a blast!
            </p>
            <p className="font-semibold">
              With the Incredible Playgroup Finder, you can now effortlessly
              find and plan exciting play-based outings tailored to YOUR
              schedule and needs!
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-blue-600">
              WHAT’S AN EARLYON & WHY SHOULD I GO?
            </h2>
            <p className="mb-3">
              EarlyON offers a free, fun, engaging, and supportive environment
              for children to learn, grow, and build essential skills. These
              centres provide a wealth of opportunities for play-based learning,
              fostering socialization, creativity, and development in a safe and
              nurturing setting.
            </p>
            <p>
              Additionally, parents can connect with other families, access
              valuable resources and support, and learn new ways to enhance
              their child&apos;s early years&apos; experience. EarlyON Centres
              are an invaluable resource for families, promoting positive
              parent-child relationships and supporting children&apos;s overall
              well-being and success.
            </p>
          </section>

          <footer className="text-center">
            <p className="font-bold text-lg text-blue-600">
              Have fun exploring!
            </p>
          </footer>
        </>
      ),
    shortText:
      translation === "fr" ? (
        <div>
          <p className="font-lazydog text-introText mb-2">
            Mettez plus de jeu dans votre journée!
          </p>
          <p>
            Appel à tous les parents ! Saviez-vous que le temps de jeu est comme
            une potion magique pour vos enfants? C&apos;est un moyen amusant et
            engageant pour eux d&apos;explorer le monde, de libérer leur
            créativité intérieure et de devenir de grands résolveurs de
            problèmes&#8239;!
          </p>
        </div>
      ) : (
        <div>
          <p className="font-lazydog text-base md:text-2xl text-introText mb-1 md:mb-2">
            Put more play in your day!
          </p>
          <p>
            Calling all parents! Did you know that playtime is like a magical
            potion for your little ones? It&apos;s a fun and engaging way for
            them to explore the world, unleash their inner creativity, and
            become super problem-solvers!
          </p>
        </div>
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
      <div className="relative mr-2.5">
        <LanguageSwitcher />
      </div>
      <div className="flex-col items-center m-1.5 justify-between bg-cardBody/75 rounded-lg">
        <div className="mt-8 md:p-5 md:pl-5 pt-2 px-2.5 mb-1 md:mb-6 text-justify text-sm md:text-base">
          <div>{translations.shortText}</div>
          <div>
            {isFullTextVisible && translations.fullText}
            <button
              onClick={toggleTextVisibility}
              className="text-blue-500 my-2 md:my-0 md:mt-2"
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

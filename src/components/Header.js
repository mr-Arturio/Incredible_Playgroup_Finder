import React, { useState, useEffect } from "react";
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    setIsClient(true); // Set client-side flag after component mounts
  }, []);

  const toggleTextVisibility = () => {
    setIsFullTextVisible(prevVisibility => !prevVisibility);
  };

  // Define text mappings based on the selected language
  const translations = {
    fullText: language === "fr" ? (
      <>
        <p>
          Conçu et créé par une maman d'Ottawa, les parents d'Ottawa disposent désormais d'un nouvel outil incroyablement utile pour planifier les sorties des groupes de jeu EarlyON avec leurs enfants.
        </p>
        <br />
        <p>
          Les groupes de jeu EarlyON sont une partie importante de la croissance à Ottawa et sont souvent la première occasion pour nos petits de sortir dans le monde pour apprendre et socialiser. Les parents peuvent se faire de nouveaux amis qui commencent également une jeune famille, avoir un espace sûr et accueillant pour poser des questions sur la parentalité et rire de cette nouvelle aventure folle avec d'autres parents. Chaque EarlyON a sa propre saveur unique et peut inclure l'accès à des ressources telles que des bibliothèques de jouets, des espaces extérieurs sympas, des ressources parentales telles que des livres ou des opportunités de micro-apprentissage, des groupes de jeu dans différentes langues et même un parking gratuit ou des collations délicieuses !
        </p>
        <br />
        <p>
          Cet outil aidera les parents à voir les groupes de jeu qui correspondent à leur emploi du temps – choisissez de voir ce que vous aimez, en fonction de l'heure de la journée, de l'âge des enfants, du jour de la semaine et d'autres catégories qui rendent votre visite fantastique pour vous.
        </p>
        <br />
        <p>Venez et JOUEZ !</p>
      </>
    ) : (
      <>
        <p>
          Conceived and created by an Ottawa Mom, Ottawa parents now have a new, incredibly useful tool to plan EarlyON playgroup outings with their children.
        </p>
        <br />
        <p>
          EarlyON playgroups are an important part of growing up in Ottawa, and are often the first opportunity our littles have to head out into the world to learn and socialize. Parents can make new friends who are also starting a young family, have a safe and welcoming space to ask parenting questions and laugh about this crazy new adventure with other parents. Each EarlyON has its own unique flavor, and can include access to resources such as toy libraries, cool outdoor spaces, parenting resources such as books or micro-learning opportunities, playgroups in different languages and even free parking or yummy snacks!
        </p>
        <br />
        <p>
          This tool will help parents view playgroups that work with their schedule – choose to see what you like, based on time of day, age of children, day of the week and other categories that make your visit fantastic for you.
        </p>
        <br />
        <p>Come and PLAY!</p>
      </>
    ),
    shortText: language === "fr" ? (
      <>
        <p>
          Découvrez l'outil ultime pour les parents d'Ottawa afin de trouver et planifier facilement des sorties passionnantes avec les groupes de jeu EarlyON adaptées à leur emploi du temps et à leurs préférences !
        </p>
      </>
    ) : (
      <>
        <p>
          Discover the ultimate tool for Ottawa parents to effortlessly find and plan exciting EarlyON playgroup outings tailored to their schedule and preferences!
        </p>
      </>
    ),
    showMore: language === "fr" ? "Afficher Plus" : "Show More",
    showLess: language === "fr" ? "Afficher Moins" : "Show Less"
  };

  // Render a loading state until client-side hydration is complete
  if (!isClient) {
    return <div className="flex-col items-center justify-between"><div className="mt-8 md:mt-4 md:mb-8 text-left">Loading...</div></div>;
  }

  return (
    <div className="flex-col items-center justify-between">
      <div className="mt-8 md:mt-4 md:mb-8 text-left">
        <div className="hidden md:block">{translations.fullText}</div>
        <div className="block md:hidden">
          {isFullTextVisible ? translations.fullText : translations.shortText}
          <button
            onClick={toggleTextVisibility}
            className="text-blue-500 mt-2"
          >
            {isFullTextVisible ? translations.showLess : translations.showMore}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

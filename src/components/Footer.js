import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-white text-xs md:text-base font-light md:leading-relaxed ">
      {/* Decorative Lines */}
      <div className="w-full">
        <div className="bg-mainBlue h-1"></div>
        {/* <div className="bg-plum h-1"></div> */}
        <div className="bg-amber h-3"></div>
      </div>

      <div className="container mx-auto px-2.5 md:px-4 mt-3 md:mt-4">
        {/* Top Section */}
        <p className="text-justify">
          The Parent Resource Centre (PRC) is a not-for-profit charity that
          helps build confident, resilient families in Ottawa. We provide
          engaging high-quality programs, a wide variety of social services and
          supportive resources for children, youth, parents and caregivers in a
          welcoming environment.
        </p>
        <div className="flex flex-row justify-between md:items-center space-y-5 md:space-y-0">
          {/* Contact Information */}
          <div className="text-left mt-2 md:mt-6">
            <h3 className="text-amber text-base md:text-lg font-bold">
              Contact Information
            </h3>
            <p className="md:text-base text-sm">
              300 Goulburn Crescent
              <br />
              Ottawa, ON
              <br />
              K1N 1C9
              <br />
              (613) 565-2467
              <br />
              <a
                href="mailto:ipf@parentresource.ca"
                className="text-purple-700"
              >
                ipf@parentresource.ca
              </a>
            </p>
          </div>
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/parentresourcecentre"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://static.wixstatic.com/media/e316f544f9094143b9eac01f1f19e697.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/e316f544f9094143b9eac01f1f19e697.png"
                alt="Facebook"
                width={39}
                height={39}
                className="md:h-10 md:w-10 hover:scale-105 h-6 w-6"
              />
            </a>
            <a
              href="https://www.instagram.com/parentresource"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://static.wixstatic.com/media/8d6893330740455c96d218258a458aa4.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8d6893330740455c96d218258a458aa4.png"
                alt="Instagram"
                width={39}
                height={39}
                className="md:h-10 md:w-10 hover:scale-105 h-6 w-6"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/parent-resource-centre/mycompany/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://static.wixstatic.com/media/11062b_9e78da3320da497ab23ce28d738d388a~mv2.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_9e78da3320da497ab23ce28d738d388a~mv2.png"
                alt="LinkedIn"
                width={39}
                height={39}
                className="md:h-10 md:w-10 hover:scale-105 h-6 w-6"
              />
            </a>
            <a
              href="https://www.eventbrite.ca/o/ottawa-parent-resource-centre-7963790017"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://static.wixstatic.com/media/f93ed4_ab61c4f988d44c38a1b97fc5708734bd~mv2.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/f93ed4_ab61c4f988d44c38a1b97fc5708734bd~mv2.png"
                alt="Eventbrite"
                width={39}
                height={39}
                className="md:h-10 md:w-10 hover:scale-105 h-6 w-6"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full bg-mainBlue pt-2 mt-2.5 md:mt-6 px-2.5 md:px-4 text-xs md:text-sm/2">
        <div className="container mx-auto flex justify-between text-white">
          <div>
            <p>&copy; 2024 Parent Resource Centre</p>
            <p>Charitable registration number: 119076487RR0001</p>
            <p className="my-1 font-extralight">
              {" "}
              Built by{" "}
              <a
                href="https://github.com/mr-Arturio"
                className="hover:text-amber "
              >
                {" "}
                Artur
              </a>{" "}
              for{" "}
              <a
                href="https://www.parentresource.ca/"
                className="hover:text-amber"
              >
                {" "}
                PRC
              </a>{" "}
              / Background image is by
              <a
                href="https://www.svgbackgrounds.com/"
                className="hover:text-amber"
              >
                {" "}
                SVGBackgrounds.com
              </a>
            </p>
          </div>
          <a
            href="https://www.parentresource.ca/pricacy"
            className="font-semibold text-white hover:underline"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

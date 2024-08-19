import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <p className="text-left">
          The Parent Resource Centre (PRC) is a not-for-profit charity that
          helps build confident, resilient families in Ottawa. We provide
          engaging high-quality programs, a wide variety of social services and
          supportive resources for children, youth, parents and caregivers in a
          welcoming environment.
        </p>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Contact Information */}
          <div className="text-left mt-10">
            <h3 className="text-amber text-lg font-bold">
              Contact Information
            </h3>
            <p className="text-base">
              300 Goulburn Crescent
              <br />
              Ottawa, ON
              <br />
              K1N 1C9
              <br />
              (613) 565-2467
              <br />
              <a
                href="mailto:information@parentresource.ca"
                className="text-purple-700"
              >
                information@parentresource.ca
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
              <img
                src="https://static.wixstatic.com/media/e316f544f9094143b9eac01f1f19e697.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/e316f544f9094143b9eac01f1f19e697.png"
                alt="Facebook"
                className="h-10 w-10"
              />
            </a>
            <a
              href="https://www.instagram.com/parentresource"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://static.wixstatic.com/media/8d6893330740455c96d218258a458aa4.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8d6893330740455c96d218258a458aa4.png"
                alt="Instagram"
                className="h-10 w-10"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/parent-resource-centre/mycompany/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://static.wixstatic.com/media/11062b_9e78da3320da497ab23ce28d738d388a~mv2.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_9e78da3320da497ab23ce28d738d388a~mv2.png"
                alt="LinkedIn"
                className="h-10 w-10"
              />
            </a>
            <a
              href="https://www.eventbrite.ca/o/ottawa-parent-resource-centre-7963790017"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://static.wixstatic.com/media/f93ed4_ab61c4f988d44c38a1b97fc5708734bd~mv2.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/f93ed4_ab61c4f988d44c38a1b97fc5708734bd~mv2.png"
                alt="Other"
                className="h-10 w-10"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full bg-mainBlue py-4 mt-8">
        <div className="container mx-auto px-4 flex justify-between text-white">
          <div>
            <p>&copy; 2024 Parent Resource Centre</p>
            <p>Charitable registration number: 119076487RR0001</p>
          </div>
          <a href="/privacy-policy" className="font-semibold text-white">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

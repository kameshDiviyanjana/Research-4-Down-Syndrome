import {
  FaWhatsappSquare,
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-black py-16 px-10 grid md:grid-cols-2 gap-8 text-gray-300 bottom-0 m-0">
      <div className="">
        <h3 className="text-2xl font-bold text-[#41A4FF]">D Learner</h3>
        <p className="py-4">
          We believe in creating a supportive learning environment where every
          child with Down syndrome can discover their potential. Through
          specialized education tools and caring guidance, we help build
          confidence, skills, and joyful learning experiences.
        </p>
        <div className="flex justify-start gap-10 md:w-[75%] my-6">
          <FaWhatsappSquare size={30} />
          <FaFacebookSquare size={30} />
          <FaInstagramSquare size={30} />
          <FaTwitterSquare size={30} />
        </div>
      </div>
      <div className="flex md:justify-around justify-start mt-8">
        <div>
          <h6 className="font-bold text-[#41a3ff]">Resources</h6>
          <ul className="mt-2 font-light">
            <li className="py-2 text-sm">Leaning Materials</li>
            <li className="py-2 text-sm">Parent Guides</li>
            <li className="py-2 text-sm">Activities</li>
          </ul>
        </div>
        <div className="ml-[8rem]">
          <h6 className="font-bold text-[#41A4FF]">Learn More</h6>
          <ul className="mt-2 font-light">
            <li className="py-2 text-sm">Contact us</li>
            <li className="py-2 text-sm">About us</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;

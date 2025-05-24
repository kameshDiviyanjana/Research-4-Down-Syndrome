import GorssmotorIntro from "../components/GorssmotorIntro";
import MathsIntro from "../components/MathsIntro";
import VocabularyIntro from "../components/VocabularyIntro";
import WritingIntro from "../components/WritingIntro";
import bg1 from "../../public/images/langpage.jpg";
import { motion } from "framer-motion";

const SkillDevHome = () => {
  return (
    <motion.div
      className="relative w-full flex flex-col justify-center items-center text-center p-6 bg-cover bg-no-repeat bg-center shadow-xl min-h-[700px]"
      style={{
        //backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Optional overlay for better text contrast */}
      <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>

      <div className="relative z-10 space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-yellow-600 drop-shadow-lg"
        >
          Welcome to Fun Learning!
        </motion.h1>

        {/* Removed ConfettiEmoji animation */}

        <p className="text-lg text-black font-medium drop-shadow-md">
          Let's explore, play, and grow together!
        </p>

        <motion.div
          className="lg:grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <WritingIntro />
          <GorssmotorIntro />
        </motion.div>

        <motion.div
          className="lg:grid grid-cols-2 gap-4 mt-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <VocabularyIntro />
          <MathsIntro />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillDevHome;

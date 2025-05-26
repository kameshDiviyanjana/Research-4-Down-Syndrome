import { useState, useEffect } from "react";
import GorssmotorIntro from "../components/GorssmotorIntro";
import MathsIntro from "../components/MathsIntro";
import VocabularyIntro from "../components/VocabularyIntro";
import WritingIntro from "../components/WritingIntro";
import bg1 from "../../public/images/langpage.jpg";
import { motion } from "framer-motion";
import {
  getLanguagePreference,
  saveLanguagePreference,
  updateLanguagePreference,
} from "../services/languageService";

const translations = {
  en: {
    welcome: "Welcome to Fun Learning!",
    subtitle: "Let's explore, play, and grow together!",
    chooseLang: "Choose Your Language",
    selectLang: "Select Language",
    save: "Save",
    changeLang: "Change Language",
    checkLang: "Checking language preference...",
    selectBtn: "Select Language",
    saveSuccess: "Language updated successfully!",
    saveError: "Failed to update language",
  },
  si: {
    welcome: "සතුටුදායක ඉගෙනුමට පිළිගනිමු!",
    subtitle: "එකමුතුවෙන් සෙල්ලම් කරමින්, අලුත් දේවල් ඉගෙනගනිමු!",
    chooseLang: "ඔබගේ භාෂාව තෝරන්න",
    selectLang: "භාෂාව තෝරන්න",
    save: "සුරකින්න",
    changeLang: "භාෂාව වෙනස් කරන්න",
    checkLang: "භාෂා මනාපය පරීක්ෂා කරමින්...",
    selectBtn: "භාෂාව තෝරන්න",
    saveSuccess: "භාෂාව සාර්ථකව යාවත්කාලීන විය!",
    saveError: "භාෂාව යාවත්කාලීන කිරීමට අසමත් විය",
  },
};

const SkillDevHome = () => {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [updateLanguage, setUpdateLanguage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChangeLanguageDropdown, setShowChangeLanguageDropdown] = useState(false);

  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const response = await getLanguagePreference(userId);
        if (response.data.status === "success") {
          const lang = response.data.language;
          setSelectedLanguage(lang);
          setShowLanguageSelector(false);
        }
      } catch (err) {
        if (err.response?.status === 404 || err.response?.status === 500) {
          setShowLanguageSelector(true);
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLanguage();
  }, [userId]);

  const handleLanguageSubmit = async () => {
    if (!selectedLanguage) {
      setError(translations[selectedLanguage]?.selectLang || "Please select a language");
      return;
    }

    try {
      const response = await saveLanguagePreference({ userId, language: selectedLanguage });
      if (response.status === 201) {
        setShowLanguageSelector(false);
        setError(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      console.error(err);
    }
  };

  const handleLanguageUpdate = async () => {
    if (!updateLanguage) return;

    try {
      const res = await updateLanguagePreference({ userId, language: updateLanguage });
      if (res.status === 200 || res.data.status === "success") {
        setShowChangeLanguageDropdown(false);
        alert(translations[updateLanguage]?.saveSuccess || "Language updated successfully!");
        setSelectedLanguage(updateLanguage);
      }
    } catch (err) {
      console.error("Failed to update language:", err);
      alert(translations[updateLanguage]?.saveError || "Failed to update language");
    }
  };

  return (
    <motion.div
      className="relative w-full flex flex-col justify-center items-center text-center p-6 bg-cover bg-no-repeat bg-center shadow-xl min-h-[700px]"
      style={{ backgroundImage: `url(${bg1.src})` }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>

      {/* Top-Left Select Language Button */}
      {!loading && showLanguageSelector && (
        <div className="absolute top-4 left-4 z-30">
          <button
            className="bg-yellow-600 text-white px-4 py-1 rounded-md hover:bg-yellow-700 text-sm"
            onClick={() => setShowLanguageSelector(true)}
          >
            {translations[selectedLanguage]?.selectBtn || "Select Language"}
          </button>
        </div>
      )}

      {/* Top-Right Change Language */}
      {!loading && !showLanguageSelector && (
        <div className="absolute top-4 right-4 z-30">
          {!showChangeLanguageDropdown ? (
            <button
              className="bg-yellow-600 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-700"
              onClick={() => setShowChangeLanguageDropdown(true)}
            >
              {translations[selectedLanguage]?.changeLang || "Change Language"}
            </button>
          ) : (
            <div className="bg-white/90 p-3 rounded shadow-md flex items-center gap-2">
              <select
                value={updateLanguage}
                onChange={(e) => setUpdateLanguage(e.target.value)}
                className="border px-2 py-1 rounded text-sm"
              >
                <option value="" disabled>
                  {translations[selectedLanguage]?.selectLang || "Select"}
                </option>
                <option value="en">English</option>
                <option value="si">Sinhala</option>
              </select>
              <button
                className="bg-yellow-600 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-700"
                onClick={handleLanguageUpdate}
              >
                {translations[selectedLanguage]?.save || "Save"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 space-y-6 max-w-4xl w-full">
        <motion.h1
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-yellow-600 drop-shadow-lg"
        >
          {translations[selectedLanguage]?.welcome || "Welcome to Fun Learning!"}
        </motion.h1>

        <p className="text-lg text-black font-medium drop-shadow-md">
          {translations[selectedLanguage]?.subtitle || "Let's explore, play, and grow together!"}
        </p>

        {/* Language Form */}
        {loading ? (
          <p className="text-lg text-gray-600">
            {translations[selectedLanguage]?.checkLang || "Checking language preference..."}
          </p>
        ) : showLanguageSelector ? (
          <motion.div
            className="bg-white/80 p-6 rounded-lg shadow-lg max-w-sm mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              {translations[selectedLanguage]?.chooseLang || "Choose Your Language"}
            </h2>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
            >
              <option value="" disabled>
                {translations[selectedLanguage]?.selectLang || "Select Language"}
              </option>
              <option value="en">English</option>
              <option value="si">Sinhala</option>
            </select>
            <button
              onClick={handleLanguageSubmit}
              className="w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition-colors"
            >
              {translations[selectedLanguage]?.save || "Save"}
            </button>
            {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
          </motion.div>
        ) : null}

        {/* Skill Cards */}
        <motion.div
          className="lg:grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <WritingIntro selectedLanguage={selectedLanguage} />
          <GorssmotorIntro selectedLanguage={selectedLanguage} />
        </motion.div>

        <motion.div
          className="lg:grid grid-cols-2 gap-4 mt-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <VocabularyIntro selectedLanguage={selectedLanguage} />
          <MathsIntro selectedLanguage={selectedLanguage} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillDevHome;
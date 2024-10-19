import React, {useEffect, useState} from 'react';
import {useTheme} from "next-themes";

const SkillCategory = ({ title, skills }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const {theme, systemTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Use a default theme (e.g., dark) for the initial render
    const currentTheme = mounted && theme ? (theme === 'system' ? systemTheme : theme) : 'dark';

    const styles = {
        background: currentTheme === 'dark' ? '#2c3e50' : '#e3e0e0',
        color: currentTheme === 'dark' ? '#fff' : '#000'
    };

    if (!mounted) {
        return null; // or return a loading state
    }

  return (
    <div
      className={` ${currentTheme === 'dark'? 'bg-gray-700':'bg-gray-100'} rounded-lg shadow-lg p-6 transition-all duration-300 ease-in-out hover:scale-105 flex-1`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      <ul
        className={`space-y-2 overflow-hidden transition-all duration-300 ease-in-out  max-h-96`}
      >
        {skills.map((skill, index) => (
          <li key={index} className="text-center">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

const SkillsSection = ({ resume }) => {
  return (
    <div className="mt-20 mb-20">
      <h1 className="text-3xl font-bold text-center mb-10">Skills</h1>
      <div className="max-w-7xl mx-auto flex flex-row md:flex-row gap-8">
        {resume.languages && (
          <SkillCategory title="Languages" skills={resume.languages} />
        )}
        {resume.frameworks && (
          <SkillCategory title="Frameworks" skills={resume.frameworks} />
        )}
        {resume.others && (
          <SkillCategory title="Others" skills={resume.others} />
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
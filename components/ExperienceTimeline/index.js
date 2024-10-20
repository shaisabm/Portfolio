import React from 'react';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {useTheme} from 'next-themes';
import {useEffect, useState} from 'react';
import data from "/data/experiences.json";

const ExperienceTimeline = () => {

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
        <VerticalTimeline lineColor={currentTheme === 'dark' ? '#fff' : '#e3e0e0'}>

            {data.map((experience, index) => (

                <VerticalTimelineElement
                    key={index}
                    className="vertical-timeline-element--work"
                    contentStyle={{background: styles.background, color: styles.color}}
                    contentArrowStyle={{borderRight: '7px solid #2c3e50'}}
                    date={experience.date}
                    iconStyle={{background: '#2c3e50', color: '#fff'}}
                    icon={
                        <img
                            src={experience.logo}
                            alt={experience.alt}
                            style={{borderRadius: '50%', width: '100%', height: '100%'}}
                        />
                    }
                >
                    <h3 className="vertical-timeline-element-title">{experience.info.title}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{experience.info.company} - {experience.info.location}</h4>
                    {experience.info.bullets.map((bullet, index) => (
                        <p key={index}>
                            &#8226; {bullet}
                        </p>
                    ))}

                    <div className="tech-tags">
                        {experience.info.skills.map((skill, index) => (
                            <span key={index} className="tech-tag">{skill}</span>

                        ))}
                    </div>

                </VerticalTimelineElement>
            ))}



        </VerticalTimeline>
    )
}
export default ExperienceTimeline;
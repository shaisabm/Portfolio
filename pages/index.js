import React, {useRef} from "react";
import Header from "../components/Header";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import {useIsomorphicLayoutEffect} from "../utils";
import {stagger} from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";
import ExperienceTimeline from "../components/ExperienceTimeline";
import SkillsSection from "../components/SkillCategory";
import {Analytics} from "@vercel/analytics/react"

// Local Data
import data from "../data/portfolio.json";
import portfolioData from "../data/portfolio.json";

export default function Home() {
    // Ref
    const workRef = useRef();
    const aboutRef = useRef();
    const textOne = useRef();
    const textTwo = useRef();
    const textThree = useRef();
    const textFour = useRef();
    const textFive = useRef();
    const texSix = useRef()
    const texSeven = useRef()
    const expRef = useRef()
    const skillsRef = useRef()

    // Handling Scroll
    const handleWorkScroll = () => {
        window.scrollTo({
            top: workRef.current.offsetTop,
            left: 0,
            behavior: "smooth",
        });
    };


    const handleExperienceScroll = () => {
        window.scrollTo({
            top: expRef.current.offsetTop,
            left: 0,
            behavior: "smooth",
        });
    };


    const handleSkillsScroll = () => {
        window.scrollTo({
            top: skillsRef.current.offsetTop,
            left: 0,
            behavior: "smooth",
        });
    };

    useIsomorphicLayoutEffect(() => {
        stagger(
            [textOne.current, textTwo.current, textThree.current, textFour.current, textFive.current, texSix.current, texSeven.current ],
            {y: 40, x: -10, transform: "scale(0.95) skew(10deg)"},
            {y: 0, x: 0, transform: "scale(1)"}
        );
    }, []);

    return (
        <div className={`relative ${data.showCursor && "cursor-none"}`}>
            {data.showCursor && <Cursor/>}
            <Head>
                <title>{data.name}</title>
            </Head>

            <div className="gradient-circle"></div>
            <div className="gradient-circle-bottom"></div>

            <div className="container mx-auto mb-10">
                <Header
                    handleWorkScroll={handleWorkScroll}
                    handleExperienceScroll={handleExperienceScroll}
                    handleSkillsScroll={handleSkillsScroll}
                />
                <div className="laptop:mt-20 mt-10">
                    <div className="mt-5">
                        <h1
                            ref={textOne}
                            className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
                        >
                            {data.headerTaglineOne}
                        </h1>
                        <h1
                            ref={textTwo}
                            className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
                        >
                            {data.headerTaglineTwo}
                        </h1>
                        <h1
                            ref={textThree}
                            className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
                        >
                            {data.headerTaglineThree}
                        </h1>
                        <h1
                            ref={textFour}
                            className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
                        >
                            {data.headerTaglineFour}
                        </h1>

                    </div>
                    <h5
                        ref={textFive}

                        className="text-xl tablet:text-xl laptop:text-xl laptopl:text-xl pl-2.5 text-bold w-full laptop:w-4/5"
                    >
                        {data.headerTaglineFive}
                    </h5>

                    <h5
                        ref={texSix}

                        className="text-xl tablet:text-xl laptop:text-xl laptopl:text-xl pl-2.5 text-bold w-full laptop:w-4/5"
                    >
                        {data.headerTaglineSix}
                    </h5>

                    <h5
                        ref={texSeven}

                        className="text-xl tablet:text-xl laptop:text-xl laptopl:text-xl pl-2.5 text-bold w-full laptop:w-4/5"
                    >
                        {data.headerTaglineSeven}
                    </h5>

                    <Socials className="mt-2 laptop:mt-5"/>
                </div>
                <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={expRef}>
                    <h1 className="text-2xl text-bold">Experiences.</h1>
                    {ExperienceTimeline()}

                </div>
                <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
                    <h1 className="text-2xl text-bold">Projects.</h1>
                    <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
                        {data.projects.map((project) => (
                            <WorkCard
                                key={project.id}
                                img={project.imageSrc}
                                name={project.title}
                                description={project.description}
                                onClick={() => window.open(project.url)}
                            />
                        ))}
                    </div>
                </div>


                {process.env.NODE_ENV === "development" && (
                    <div className="fixed bottom-5 right-5">
                        <Link href="/edit">
                            <Button type="primary">Edit Data</Button>
                        </Link>
                    </div>
                )}
                <div ref={skillsRef}>
                    <SkillsSection resume={portfolioData.resume}/>

                </div>

                <Footer/>
            </div>
        </div>
    )
        ;
}

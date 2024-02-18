import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import SectionTitle from "../component/sectiontitle";
import heroImg from "../assets/hero.png";
import Container from "../component/container";
import Testimonials from "../component/testimonials";
import Benefits from "../component/benefits";
import Footer from "../component/footer";
const Home = () => {
  return (
    <div className="">
      <Navbar isSignin isSignup/>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight ">
            Welcome to <span className="text-indigo-600">CurioCamp</span>
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl ">
            Discover a diverse array of courses designed to fuel your curiosity
          and expand your horizons. Engage with expert instructors and a vibrant
          learning community. Flexible learning options to fit your schedule and
          learning style. Earn certifications and unlock new opportunities.
            </p>
            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <Link
                to="/courses"
                rel="noopener"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-full ">
                View Courses
              </Link>
              <Link
                to="/learningpath"
                rel="noopener"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-full ">
                Custom Path
              </Link>
                
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <img
              src={heroImg}
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
      <SectionTitle
        pretitle="Explore More"
        title="Unlock Knowledge with CurioCamp">
        Embark on a journey of discovery with Curiocamp's curated resources and collaborative study groups, fostering a community-driven approach to learning.
      </SectionTitle>
      <div className="flex flex-col lg:flex-row ">
      <SectionTitle
        pretitle="CurioCamp Benefits"
        title=" Why should you use CurioCamp">
        Curiocamp offers curated, interactive learning experiences with collaborative study groups and personalized recommendations, fostering a vibrant community for lifelong learners. With trusted partnerships and a user-friendly interface, Curiocamp empowers individuals to explore diverse educational content and engage in meaningful discussions, making it the go-to platform for enriching learning journeys.
      </SectionTitle>
      <Benefits/>
      </div>
      
      
      <SectionTitle
        pretitle="Testimonials"
        title="Here's what our customers said">
        Testimonails is a great way to increase the brand trust and awareness.
        Use this section to highlight your popular customers.
      </SectionTitle>
      <Testimonials/>
      <Footer />
    </div>
  );
};
export default Home;
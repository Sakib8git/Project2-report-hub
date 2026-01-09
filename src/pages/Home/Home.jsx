// "use client";

import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import Banner from "../../components/Home/Banner";
import FeaturesSection from "../../components/Home/FeaturesSection";
import HowItWorksSection from "../../components/Home/HowItWorksSection";
import LatestResolvedIssues from "../../components/Home/LatestResolvedIssues";

import Button from "../../components/Shared/Button/Button";
import Container from "../../components/Shared/Container";
import StatisticsSection from "../../components/Home/StatisticsSection";
import TestimonialsSection from "../../components/Home/TestimonialsSection";

const fadeUp = {
  hidden: { opacity: 0, y: 50 }, // niche theke
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
        >
          <Banner />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1 }}
        >
          <LatestResolvedIssues />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1.2 }}
          className="text-center"
        >
          <Button label="All Reports" onClick={() => navigate("/all-issues")} />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1.4 }}
        >
          <FeaturesSection />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1.6 }}
        >
          <HowItWorksSection />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1.8 }}
        >
          <StatisticsSection />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 2 }}
        >
          <TestimonialsSection />
        </motion.div>
      </Container>
    </div>
  );
};

export default Home;

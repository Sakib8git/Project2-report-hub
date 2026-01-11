import React from "react";
import {
  FaUserEdit,
  FaUserShield,
  FaTools,
  FaCheckCircle,
} from "react-icons/fa";
import styled from "styled-components";

const steps = [
  {
    id: 1,
    icon: <FaUserEdit className="text-3xl" />,
    title: "Citizen Reports",
    description: "Citizens submit issues with details, photos, and location.",
    // gradient: "linear-gradient(163deg, #22c55e 0%, #3b82f6 100%)",
    gradientReverse: "linear-gradient(163deg, #3b82f6 0%, #22c55e 100%)",
  },
  {
    id: 2,
    icon: <FaUserShield className="text-3xl" />,
    title: "Admin Assigns",
    description: "Admin reviews and assigns the issue to staff for action.",
    // gradient: "linear-gradient(163deg, #3b82f6 0%, #22c55e 100%)",
    gradientReverse: "linear-gradient(163deg, #22c55e 0%, #3b82f6 100%)",
  },
  {
    id: 3,
    icon: <FaTools className="text-3xl" />,
    title: "Staff Works",
    description: "Staff verifies the issue, updates progress, and resolves it.",
    // gradient: "linear-gradient(163deg, #22c55e 0%, #3b82f6 100%)",
    gradientReverse: "linear-gradient(163deg, #3b82f6 0%, #22c55e 100%)",
  },
  {
    id: 4,
    icon: <FaCheckCircle className="text-3xl" />,
    title: "Issue Resolved",
    description:
      "System updates status and citizens can track resolution anytime.",
    // gradient: "linear-gradient(163deg, #3b82f6 0%, #22c55e 100%)",
    gradientReverse: "linear-gradient(163deg, #22c55e 0%, #3b82f6 100%)",
  },
];

const HowItWorksSection = () => {
  return (
    <StyledWrapper>
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl custom-heading -mt-10">
          How It Works
        </h2>

        <div className="cards">
          {steps.map((step) => (
            <div
              key={step.id}
              className="card"
              style={{ backgroundImage: step.gradient }}
              data-gradient={step.gradientReverse}
            >
              <div className="card2 bg-base-200">
                {step.icon}
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (min-width: 640px) {
    .cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .cards {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .card {
    width: 100%;
    height: 260px;
    border-radius: 20px;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent; /* ✅ thinner border */
    background-origin: border-box;
    background-clip: content-box, border-box;
  }

  .card2 {
    width: 95%;
    height: 95%;
    border-radius: 18px;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
  }

  .card2:hover {
    transform: scale(0.98);
    border-radius: 20px;
  }

  .card:hover {
    box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.3);
    transform: scale(1.05);
    background-image: attr(data-gradient); /* use reverse gradient on hover */
  }

  .cards:hover > .card:not(:hover) {
    filter: blur(6px);
    transform: scale(0.95);
  }
`;

export default HowItWorksSection;

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
    icon: <FaUserEdit className="text-white text-3xl" />,
    title: "Citizen Reports",
    description: "Citizens submit issues with details, photos, and location.",
    color: "red",
  },
  {
    id: 2,
    icon: <FaUserShield className="text-white text-3xl" />,
    title: "Admin Assigns",
    description: "Admin reviews and assigns the issue to staff for action.",
    color: "blue",
  },
  {
    id: 3,
    icon: <FaTools className="text-white text-3xl" />,
    title: "Staff Works",
    description: "Staff verifies the issue, updates progress, and resolves it.",
    color: "green",
  },
  {
    id: 4,
    icon: <FaCheckCircle className="text-white text-3xl" />,
    title: "Issue Resolved",
    description:
      "System updates status and citizens can track resolution anytime.",
    color: "purple",
  },
];

const HowItWorksSection = () => {
  return (
    <StyledWrapper>
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-green-700">
          How It Works
        </h2>

        <div className="cards">
          {steps.map((step) => (
            <div key={step.id} className={`card ${step.color}`}>
              {step.icon}
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cards {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  @media (min-width: 1024px) {
    .cards {
      flex-direction: row;
      justify-content: center;
      align-items: stretch;
    }
  }

  .cards .red {
    background-color: #f43f5e;
  }
  .cards .blue {
    background-color: #3b82f6;
  }
  .cards .green {
    background-color: #22c55e;
  }
  .cards .purple {
    background-color: #9333ea;
  }

  .cards .card {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    min-height: 180px;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    transition: 400ms;
    padding: 20px;
  }

  .cards .card:hover {
    transform: scale(1.1, 1.1);
  }

  .cards:hover > .card:not(:hover) {
    filter: blur(6px);
    transform: scale(0.9, 0.9);
  }
`;

export default HowItWorksSection;
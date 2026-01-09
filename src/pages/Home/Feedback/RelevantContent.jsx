import React from "react";
import styled from "styled-components";

const RelevantContent = () => {
  return (
    <StyledBox>
      <h3 className="heading">Why Your Feedback Matters 💡</h3>
      <p className="text">
        Your comments help us improve the platform and deliver a better
        experience for everyone. Whether it’s a bug report, a suggestion, or
        just your thoughts — we value it all.
      </p>
      <ul className="list">
        <li>✔ Helps us fix issues faster</li>
        <li>✔ Guides new feature development</li>
        <li>✔ Builds a stronger community</li>
      </ul>
    </StyledBox>
  );
};

const StyledBox = styled.div`
  background-color: var(--b1);
  color: var(--bc);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  animation: fadeIn 0.6s ease-in-out;

  .heading {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: var(--in);
  }

  .text {
    font-size: 0.95rem;
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  .list {
    list-style: none;
    padding: 0;
    font-size: 0.9rem;
  }

  .list li {
    margin-bottom: 0.5rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default RelevantContent;
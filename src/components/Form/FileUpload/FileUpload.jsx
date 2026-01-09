import React from "react";
import styled from "styled-components";

const FileUpload = ({ label = "Choose a file", register }) => {
  return (
    <StyledWrapper>
      <div className="container">
        <label htmlFor="arquivo">{label}</label>
        <input
          accept=".jpg, .jpeg, .png, .gif, .pdf"
          className="inpdddut"
          name="arquivo"
          id="arquivo"
          type="file"
          {...register} // react-hook-form register support
        />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    width: 18%;
    padding: 0;
    margin: 0;
  }

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
  }

  .inpdddut[type="file"] {
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    background-color: #1aa3bb;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
  }
`;

export default FileUpload;
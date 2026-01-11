import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/Shared/Button/Button";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import RelevantContent from "./RelevantContent";

const Feedback = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    comment: "",
  });

  // ✅ handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.post(
        "/comments",
        {
          ...formData,
          avatar: user?.photoURL,
        },
        { withCredentials: true } // verifyJWT token send hobe
      );

      if (res.data.insertedId) {
        toast.success("Comment submitted successfully!");
        navigate("/");
        setFormData({
          name: user?.displayName || "",
          email: user?.email || "",
          comment: "",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit comment");
    }
  };

  return (
    <StyledWrapper>
      <div className="card">
        <span className="title">💬 Leave a Comment</span>
        <form className="form" onSubmit={handleSubmit}>
          <div className="group">
            <input
              placeholder="‎"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly // ✅ user name readonly
              required
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="group">
            <input
              placeholder="‎"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly // ✅ user email readonly
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="group">
            <textarea
              placeholder="‎"
              id="comment"
              name="comment"
              rows={5}
              value={formData.comment}
              onChange={handleChange}
              required
            />
            <label htmlFor="comment">Comment</label>
          </div>
          <button label="Submit" type="submit" className="w-full custom-btn2 p-3" >SEND</button>
        </form>
        <RelevantContent />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 1rem;

  .card {
    background-color: var(--b1);
    color: var(--bc);
    border-radius: 1rem;
    padding: 2rem;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.5s ease-in-out;
  }

  .title {
    font-size: 1.75rem;
    font-weight: 700;
    text-align: center;
    color: var(--su);
    margin-bottom: 1.5rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .group {
    position: relative;
  }

  .group input,
  .group textarea {
    width: 100%;
    padding: 1rem 0.75rem;
    border: 1.5px solid var(--border);
    border-radius: 0.75rem;
    background-color: var(--b1);
    color: var(--bc);
    font-size: 1rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: inset 0 0 0 1px rgba(100, 116, 139, 0.1); /* subtle inner border */
  }
  .group input:hover,
  .group textarea:hover {
    border-color: var(--neutral);
  }

  .group textarea {
    resize: none;
    min-height: 120px;
  }

  .group input:focus,
  .group textarea:focus {
    border-color: var(--su);
    box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.2);
  }

  .group label {
    position: absolute;
    top: 50%;
    left: 0.75rem;
    transform: translateY(-50%);
    background-color: var(--b1);
    color: var(--bc);
    padding: 0 0.25rem;
    font-size: 0.875rem;
    pointer-events: none;
    transition: all 0.2s ease;
  }

  .group input:focus + label,
  .group input:not(:placeholder-shown) + label,
  .group textarea:focus + label,
  .group textarea:not(:placeholder-shown) + label {
    top: -0.6rem;
    left: 0.5rem;
    font-size: 0.75rem;
    color: var(--su);
    background-color: var(--b1);
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

export default Feedback;

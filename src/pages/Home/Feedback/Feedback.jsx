import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/Shared/Button/Button";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

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
        navigate("/")
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
          <Button label="Submit" type="submit" className="w-full" />
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: linear-gradient(135deg, #e0f7fa, #f1f8e9);

  .card {
    background-color: #fff;
    border-radius: 16px;
    padding: 30px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.6s ease-in-out;
  }

  .title {
    font-size: 26px;
    font-weight: 700;
    text-align: center;
    color: #2e7d32;
    margin-bottom: 20px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .group {
    position: relative;
  }

  .form .group label {
    font-size: 14px;
    color: #666;
    position: absolute;
    top: -10px;
    left: 12px;
    background-color: #fff;
    padding: 0 4px;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  .form .group input,
  .form .group textarea {
    padding: 12px;
    border-radius: 8px;
    border: 1.5px solid #ccc;
    outline: none;
    width: 100%;
    background-color: transparent;
    font-size: 15px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .form .group input:focus,
  .form .group textarea:focus {
    border-color: #2e7d32;
    box-shadow: 0 0 6px rgba(46, 125, 50, 0.3);
  }

  .form .group textarea {
    resize: none;
    min-height: 120px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default Feedback;

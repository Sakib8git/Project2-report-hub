import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import ManageUsers from "../pages/Dashboard/Admin/ManageUser/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";

import { createBrowserRouter } from "react-router";
import AllIssues from "../pages/AllIssues/AllIssues";
import IssueDetails from "../pages/IssueDetails/IssueDetails";
import MyIssues from "../pages/Dashboard/Citizen/MyIssues/MyIssues";
import ReportIssue from "../pages/Dashboard/Citizen/ReportIssue/ReportIssue";
import CitizenProfile from "../pages/Dashboard/Citizen/CityzenProfile/CitizenProfile";
import AssignedIssues from "../pages/Dashboard/Staff/AssignIssues/AssignIssues";
import StaffProfile from "../pages/Dashboard/Staff/StaffProfile/StaffProfile";
import AdminIssues from "../pages/Dashboard/Admin/AllIssues/AdminIssues";
import ManageStaff from "../pages/Dashboard/Admin/ManageStaff/ManageStaff";
import Payments from "../pages/Dashboard/Admin/Payments/Payments";
import About from "../pages/IssueDetails/About/About";
import Feedback from "../pages/Home/Feedback/Feedback";
import UpdateProfile from "../pages/IssueDetails/UpdateProfile/UpdateProfile";
import BoostPaySuccess from "../pages/PaymentSuccess/BoostPaySuccess/BoostPaySuccess";
import HighSuccess from "../pages/PaymentSuccess/highSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-issues",
        element: <AllIssues />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "feedback",
        element: (
          <PrivateRoute>
            <Feedback />
          </PrivateRoute>
        ),
      },
      {
        path: "boost-pay-success",
        element: <BoostPaySuccess />,
      },
      {
        path: "high-pay-success/:id",
        element: <HighSuccess />,
      },
      {
        path: "/issue-details/:id",
        element: (
          <PrivateRoute>
            <IssueDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },

      // citizen part
      {
        path: "my-issues",
        element: (
          <PrivateRoute>
            <MyIssues />
          </PrivateRoute>
        ),
      },
      {
        path: "report-issue",
        element: (
          <PrivateRoute>
            <ReportIssue />
          </PrivateRoute>
        ),
      },
      {
        path: "cityzen-profile",
        element: (
          <PrivateRoute>
            <CitizenProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      // ----------
      // ---Staff only-----
      {
        path: "assigned-issues",
        element: (
          <PrivateRoute>
            <AssignedIssues />
          </PrivateRoute>
        ),
      },
      {
        path: "staff-profile",
        element: (
          <PrivateRoute>
            <StaffProfile />
          </PrivateRoute>
        ),
      },
      // ------
      // ---Admin only---
      {
        path: "admin-issues",
        element: (
          <PrivateRoute>
            <AdminIssues />
          </PrivateRoute>
        ),
      },

      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-staff",
        element: (
          <PrivateRoute>
            <ManageStaff />
          </PrivateRoute>
        ),
      },

      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <PrivateRoute>
            <Payments />
          </PrivateRoute>
        ),
      },
      // ------
    ],
  },
]);

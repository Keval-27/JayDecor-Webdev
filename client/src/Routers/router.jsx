import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About.jsx";
import InteriorDesign from "../Pages/Services/Interior Design/InteriorDesign.jsx";
import ContactUs from "../Pages/Contact/ContactUs.jsx";
import Projects from "../Pages/Recent projects/Projects.jsx";
import Conceptualization from "../Pages/Services/Conceptualization/Conceptualization.jsx";
import Consultancy from "../Pages/Services/Consultancy/Consultancy.jsx";
import TurnkeyContracting from "../Pages/Services/Trunkey Contracting/TurnkeyContracting.jsx";
import DesignGallery from "../Pages/DesignGallery/DesignGallery.jsx";
import LoginPage from "../Pages/Login Page/LoginPage.jsx";
import SignupPage from "../Pages/Login Page/SignupPage.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminLogin from "../Components/AdminLogin.jsx";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout.jsx";
import ManageProjects from "../Pages/Dashboard/ManageProject/ManageProjects.jsx";
import AddProject from "../Pages/Dashboard/AddProject/AddProject.jsx";
import UpdateProject from "../Pages/Dashboard/EditProject/UpdateProject.jsx";
import Contacts from "../Pages/Dashboard/Contact.jsx";
import UserDashboard from "../Pages/Login Page/UserDashboard.jsx";
import ErrorPage from "../Components/ErrorPage.jsx";
import Consultants from "../Pages/Dashboard/Consultant.jsx";
import AddDesign from "../Pages/Dashboard/Design/AddDesign/AddDesign.jsx";
import ManageDesigns from "../Pages/Dashboard/Design/ManageDesign.jsx";
import UpdateDesign from "../Pages/Dashboard/Design/UpdateDesign.jsx";
import LoginSuccess from "../Components/LoginSuccess.jsx";
import SmartStyleQuiz from "../Components/SmartStyleQuiz.jsx";
import AdminForm from "../Pages/Dashboard/AdminForm.jsx";
const token = localStorage.getItem("token"); // example

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/DesignGallery",
        element: <DesignGallery />,
      },
      {
        path: "/About",
        element: <About />,
      },

      {
        path: "/Projects",
        element: <Projects />,
      },

      /*Contact page*/

      {
        path: "/Contact",
        element: <ContactUs />,
      },

      /*Service page*/
      {
        path: "InteriorDesign",
        element: <InteriorDesign />,
      },

      {
        path: "/Conceptualization",
        element: <Conceptualization />,
      },

      {
        path: "/Consultancy",
        element: <Consultancy />,
      },
      {
        path: "/TurnkeyContracting",
        element: <TurnkeyContracting />,
      },

      /*Login Page*/
      {
        path: "/LoginPage",
        element: <LoginPage />,
      },
      {
        path: "/SignupPage",
        element: <SignupPage />,
      },
      {
        path: "/UserDashboard",
        element: <UserDashboard />,
      },
      {
        path: "/error",
        element: <ErrorPage />,
      },

      {
        path: "/LoginSuccess",
        element: <LoginSuccess />,
      },
      {
        path: "/SmartStyleQuiz",
        element: <SmartStyleQuiz />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "consultants",
        element: (
          <AdminRoute>
            <Consultants />
          </AdminRoute>
        ),
      },
      {
        path: "contacts",
        element: (
          <AdminRoute>
            <Contacts />
          </AdminRoute>
        ),
      },

      // For Projects

      {
        path: "add-new-project",
        element: (
          <AdminRoute>
            <AddProject />
          </AdminRoute>
        ),
      },
      {
        path: "edit-project/:id",
        element: (
          <AdminRoute>
            <UpdateProject />
          </AdminRoute>
        ),
      },
      {
        path: "delete-project",
        element: (
          <AdminRoute>
            <div>dashboard</div>
          </AdminRoute>
        ),
      },
      {
        path: "manage-project",
        element: (
          <AdminRoute>
            <ManageProjects />
          </AdminRoute>
        ),
      },

      // For Designs

      {
        path: "add-new-design",
        element: (
          <AdminRoute>
            <AddDesign />
          </AdminRoute>
        ),
      },

      {
        path: "manage-design",
        element: (
          <AdminRoute>
            <ManageDesigns />
          </AdminRoute>
        ),
      },

      {
        path: "edit-design/:id",
        element: (
          <AdminRoute>
            <UpdateDesign />
          </AdminRoute>
        ),
      },
      {
        path: "create-admin",
        element: (
          <AdminRoute>
            <AdminForm  token={token} />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;

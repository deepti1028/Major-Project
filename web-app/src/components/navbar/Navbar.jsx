import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Storage from "../../utils/storage";

import "./Navbar.css";

const Header = () => {
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState("navbar-home-link"); // State to track active link

  const [isLogin, setIsLogin] = useState(false);

  const handleScrollToSection = (e, sectionId, offset = 100) => {
    e.preventDefault(); // Prevent default link behavior
    navigate("/"); // Navigate to home page first
    console.log("Navigating to home page first");
    // Delay scroll to allow time for the navigation to complete
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        // Calculate position with offset
        const sectionPosition =
          section.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = sectionPosition - offset; // Scroll to slightly above the section

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100); // 100ms delay for smooth transition
  };

  const handleActiveLink = (id) => {
    setActiveLink(id); // Update active link state
  };

  // Use effect to initially set the Home link as active
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/") {
      setActiveLink("navbar-home-link");
    } else if (currentPath === "/auth") {
      setActiveLink("navbar-auth-link");
    } else if (currentPath === "/dashboard") {
      setActiveLink("navbar-dashboard-link");
    }
    const token = Storage.getData("token");
    const stage = Storage.getData("stage");
    if (token && !stage) setIsLogin(true);
  }, []);

  useEffect(() => {
    const token = Storage.getData("token");
    const stage = Storage.getData("stage");
    if (token && !stage) setIsLogin(true);
    else setIsLogin(false);
  }, [Storage.getData("token"), Storage.getData("stage")]);

  // Function to add 'active' class to clicked link and remove from previous link
  useEffect(() => {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      if (link.id === activeLink) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }, [activeLink]); // This effect runs when the `activeLink` state changes

  return (
    <>
      {isLogin ? (
        <>
          <Navbar key="md" expand="md" className="bg-body-danger" sticky="top">
            <Container fluid>
              <Navbar.Brand
                onClick={(e) => {
                  handleActiveLink("navbar-dashboard-link");
                  navigate("/dashboard");
                }}
                className="d-flex align-items-center "
              >
                <img src="/assets/images/logo.svg" alt="Brand Logo" />
                <h1>Trade Alert</h1>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-md`}
                aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title
                    id={`offcanvasNavbarLabel-expand-md`}
                    className="text-color-primary"
                  >
                    <img
                      src="/assets/images/logo.svg"
                      alt="Brand Logo"
                      style={{ height: "50px" }}
                    />
                    Trade Alert
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link
                      as={NavLink}
                      to="/dashboard"
                      onClick={(e) => {
                        handleActiveLink("navbar-dashboard-link");
                      }}
                      id="navbar-dashboard-link"
                    >
                      My Dashboard
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/settings"
                      onClick={(e) => {
                        // handleScrollToSection(e, "news-partner");
                        handleActiveLink("navbar-settings-link");
                      }}
                      id="navbar-settings-link"
                    >
                      Settings
                    </Nav.Link>
                    <Nav.Link
                      onClick={(e) => {
                        Storage.removeData("token");
                        navigate("/");
                      }}
                    >
                      Logout
                    </Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </>
      ) : (
        <Navbar key="md" expand="md" className="bg-body-danger" sticky="top">
          <Container fluid>
            <Navbar.Brand
              onClick={(e) => {
                handleScrollToSection(e, "hero-section");
                handleActiveLink("navbar-home-link");
              }}
              className="d-flex align-items-center "
            >
              <img src="/assets/images/logo.svg" alt="Brand Logo" />
              <h1>Trade Alert</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-md`}
                  className="text-color-primary"
                >
                  <img
                    src="/assets/images/logo.svg"
                    alt="Brand Logo"
                    style={{ height: "50px" }}
                  />
                  Trade Alert
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link
                    id="navbar-home-link"
                    onClick={(e) => {
                      handleScrollToSection(e, "hero-section");
                      handleActiveLink("navbar-home-link");
                    }}
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link
                    onClick={(e) => {
                      handleScrollToSection(e, "about");
                      handleActiveLink("navbar-about-link");
                    }}
                    id="navbar-about-link"
                  >
                    About Us
                  </Nav.Link>
                  <Nav.Link
                    onClick={(e) => {
                      handleScrollToSection(e, "news-partner");
                      handleActiveLink("navbar-news-link");
                    }}
                    id="navbar-news-link"
                  >
                    Our News Partner
                  </Nav.Link>
                  <Nav.Link
                    onClick={(e) => {
                      handleScrollToSection(e, "contact");
                      handleActiveLink("navbar-contact-link");
                    }}
                    id="navbar-contact-link"
                  >
                    Contact Us
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/auth"
                    id="navbar-auth-link"
                    onClick={() => handleActiveLink("navbar-auth-link")}
                  >
                    Register/Login
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default Header;

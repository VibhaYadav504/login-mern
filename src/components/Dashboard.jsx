import React, { useState } from "react";
import {
  FaUserCircle,
  FaShieldAlt,
  FaTachometerAlt,
  FaUserFriends,
  FaQuestionCircle,
  FaSignOutAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaBookOpen,
  FaUserClock,
  FaSearch,
  FaTools,
} from "react-icons/fa";
import { MdPolicy, MdOutlinePublishedWithChanges } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import { LuNotebookText } from "react-icons/lu";
import { PiStudentDuotone } from "react-icons/pi";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [activeStudentPage, setActiveStudentPage] = useState("list");

  const [newStudent, setNewStudent] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);

  const [leadDetails, setLeadDetails] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    Source: "",
    Status: "",
    Assigned_to: "",
    Notes: "",
    Follow_up: "",
    date_created: "",
  });

  const handleChange = (e) => {
    setLeadDetails({
      ...leadDetails,
      [e.target.name]: e.target.value,
    });
  };

  const [searchQuery, setSearchQuery] = useState("");

  const submitLead = (e) => {
    e.preventDefault();
    setStudents([...students, leadDetails]);
    setLeadDetails({
      name: "",
      email: "",
      phone: "",
      city: "",
      address: "",
      Source: "",
      Status: "",
      Assigned_to: "",
      Notes: "",
      Follow_up: "",
      date_created: "",
    });
    setShowLeadForm(false);
  };

  const addStudent = (e) => {
    e.preventDefault();
    if (newStudent.trim() === "") return;
    setStudents([...students, newStudent.trim()]);
    setNewStudent("");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#131212",
      }}
    >
      {/* LEFT SIDEBAR */}
      <aside
        style={{
          width: "180px",
          backgroundColor: "black",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "28px",
              marginBottom: "30px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <FaShieldAlt size={28} color="#09319e" />
            <span>skill</span>
            <span style={{ color: "#09319e" }}>Admin</span>
          </h1>

          {/* Sidebar Menu */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "26px",
              marginTop: "10px",
            }}
          >
            <button onClick={() => setActiveSection("dashboard")} style={menuBtn}>
              <FaTachometerAlt /> Dashboard
            </button>
            <button onClick={() => setActiveSection("students")} style={menuBtn}>
              <FaUserFriends /> Leads
            </button>
          </nav>

          <hr style={{ border: "0.5px solid #333", margin: "20px 0" }} />

          {/* Bottom Menu */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "26px",
              marginTop: "10px",
            }}
          >
            <button style={menuBtn}>
              <FaQuestionCircle /> Support
            </button>
            <button style={menuBtn}>
              <FaSignOutAlt /> Logout
            </button>
            <button style={menuBtn}>
              <MdPolicy /> Privacy Policy
            </button>
          </nav>

          <hr style={{ border: "0.5px solid #333", margin: "25px 0" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <FaUserCircle size={45} color="#09319e" />
          <div>
            <p style={{ margin: 0, fontWeight: "bold" }}>SkillManthan</p>
            <p style={{ margin: 0, fontSize: "12px" }}>Administrator</p>
          </div>
        </div>
      </aside>

      {/* MAIN SECTION */}
      <main
        style={{
          flex: 1,
          padding: "30px",
          overflowY: "auto",
          backgroundColor: "#000",
          color: "white",
        }}
      >
        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#0d0d0d",
              border: "1px solid #333",
              borderRadius: "8px",
              padding: "5px 10px",
              width: "320px",
              gap: "10px",
            }}
          >
            <FaSearch color="#888" size={16} />
            <input
              type="text"
              placeholder="Search students, courses…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "14px",
              }}
            />
          </div>
        </div>

        {activeSection === "dashboard" && (
          <>
            <h2 style={{ fontSize: "30px", fontWeight: "bold" }}>
              Welcome back, SkillManthan!
            </h2>
            <p style={{ color: "gray", marginBottom: "25px" }}>
              Here’s the current overview of your students, teachers, and courses.
            </p>

            {/* Dashboard Cards */}


            <div 
            style={{
               display: "grid", 
               gridTemplateColumns: 
                window.innerWidth <= 600
        ? "repeat(1, 1fr)"
        : window.innerWidth <= 1024
        ? "repeat(2, 1fr)"
        : "repeat(4, 1fr)",
               gap: "22px" 
               }}
               >

              {/* Total Students */}
              <div style={card}>
                <div style={cardHeader}>
                  <FaUsers size={28} color="#00ff6a" />
                  <h3>420</h3>
                </div>
                <p>Total Students</p>
                <p style={{ color: "#00ff6a", fontSize: "13px", marginTop: "6px" }}>
                  30 new this semester
                </p>
              </div>

              {/* Total Teachers */}
              <div style={card}>
                <div style={cardHeader}>
                  <FaChalkboardTeacher size={28} color="#007bff" />
                  <h3>35</h3>
                </div>
                <p>Total Teachers</p>
                <p style={{ color: "#4da6ff", fontSize: "13px", marginTop: "6px" }}>
                  Updated recently
                </p>
              </div>

              {/* Active Courses */}
              <div style={card}>
                <div style={cardHeader}>
                  <FaBookOpen size={28} color="#ffa500" />
                  <h3>50</h3>
                </div>
                <p>Active Courses</p>
                <p style={{ color: "#4da6ff", fontSize: "13px", marginTop: "6px" }}>
                  Increased this year
                </p>
              </div>

              {/* Pending Admissions */}
              <div style={card}>
                <div style={cardHeader}>
                  <FaUserClock size={28} color="#ff4444" />
                  <h3>12</h3>
                </div>
                <p>Pending Admissions</p>
                <p style={{ color: "#ffcc00", fontSize: "13px", marginTop: "6px" }}>
                  Needs review
                </p>
              </div>
            </div>

            {/* Graph + Activities */}
            <div style={{ display: "flex", marginTop: "35px", gap: "25px" }}>
              <div
                style={{
                  flex: 2,
                  backgroundColor: "#0d0d0d",
                  padding: "20px",
                  borderRadius: "12px",
                  height: "300px",
                  border: "2px solid #333",
                }}
              >
                <h3>Student Performance Analytics</h3>
                <p style={{ color: "gray" }}></p>
              </div>

              <div
                style={{
                  flex: 1,
                  backgroundColor: "#0d0d0d",
                  padding: "20px",
                  borderRadius: "12px",
                  height: "300px",
                      height: "auto",
                  border: "2px solid #333",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <h3 style={{ fontSize: "1.2rem" }}>Recent Activities</h3>
                <ul style={{ marginTop: "15px", paddingLeft: "0px" }}>
                  <li
                    style={{

                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      marginBottom: "8px",
                      fontSize: "0.9rem",
                      width: "100%",

                    }}
                  >
                    <PiStudentDuotone size={26} color="#00ff6a" />

                    <span style={{ flex: 1, wordBreak: "break-word" }}>
                      New student admitted – Priya Sharma
                    </span>
                  </li>
                  <hr style={{ border: "1px solid #333" }} />
                  <li
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      marginBottom: "8px",
                      fontSize: "0.9rem",
                      width: "100%",
                    }}
                  >
                    <LuNotebookText size={26} color="#007bff" />

                    <span style={{ flex: 1, wordBreak: "break-word" }}>
                      New course added – Data Structures
                    </span>
                  </li>
                  <hr style={{ border: "1px solid #333" }} />
                  <li
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      marginBottom: "8px",
                      fontSize: "0.9rem",
                      width: "100%",
                    }}
                  >
                    <GrSchedules size={26} color="#ffa500" />

                    <span style={{ flex: 1, wordBreak: "break-word" }}>
                      Exam scheduled – Mathematics
                    </span>
                  </li>

                  <hr style={{ border: "1px solid #333" }} />
                  <li
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "0.9rem",
                      width: "100%",
                    }}
                  >
                    <MdOutlinePublishedWithChanges size={26} color="#ff4444" />

                    <span style={{ flex: 1, wordBreak: "break-word" }}>
                      Result published – Semester 2
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}

        {/* STUDENT SECTION */}
        {activeSection === "students" && (
          <>
            {/* TOP BAR */}
            {activeStudentPage === "list" && (
              <>
                <div
                  style={{
                    display: "flex",

                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  {/* <input
                    type="text"
                    placeholder="Search student..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      padding: "10px",
                     width:"80px",
                      borderRadius: "6px",
                      border: "1px solid #333",
                      backgroundColor: "#0d0d0d",
                      color: "white",
                    }}
                  />*/}

                  {/* OPEN ADD PAGE */}
                  <button
                    onClick={() => setActiveStudentPage("add")}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#292768",
                      border: "none",
                      color: "white",
                      borderRadius: "6px",
                      cursor: "pointer",

                    }}
                  >
                    Add Lead
                  </button>
                </div>

                {/* STUDENTS LIST PAGE */}
                <div
                  style={{
                    backgroundColor: "#0d0d0d",
                    padding: "15px",
                    borderRadius: "10px",
                  }}
                >
                  {students.length === 0 ? (
                    <p style={{ color: "gray" }}></p>
                  ) : (
                    students
                      .filter((s) =>
                        s.name?.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((student, index) => (
                        <p key={index}>
                          👤 {student.name} — {student.phone}
                        </p>
                      ))
                  )}
                </div>
              </>
            )}

            {/* ADD LEAD PAGE */}
            {activeStudentPage === "add" && (
              <div
                style={{
                  backgroundColor: "#0d0d0d",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <h3 style={{ marginBottom: "20px" }}>Add New Lead</h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStudents([...students, leadDetails]);
                    setLeadDetails({
                      name: "",
                      email: "",
                      phone: "",
                      city: "",
                      Source: "",
                      Status: "",
                      Assigned_to: "",
                      Notes: "",
                      Follow_up: "",
                      date_created: "",
                    });
                    setActiveStudentPage("list");
                  }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr", // split into two columns
                    gap: "15px",
                  }}
                >
                  {/* Left column */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={leadDetails.name}
                      onChange={handleChange}
                      style={formInput}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={leadDetails.email}
                      onChange={handleChange}
                      style={formInput}
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={leadDetails.phone}
                      onChange={handleChange}
                      style={formInput}
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={leadDetails.city}
                      onChange={handleChange}
                      style={formInput}
                    />
                    <input
                      type="text"
                      name="Source"
                      placeholder="Source"
                      value={leadDetails.Source}
                      onChange={handleChange}
                      style={formInput}
                    />
                  </div>

                  {/* Right column */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <input
                      type="text"
                      name="Status"
                      placeholder="Status"
                      value={leadDetails.Status}
                      onChange={handleChange}
                      style={formInput}
                    />
                    <input
                      type="text"
                      name="Assigned_to"
                      placeholder="Assigned To"
                      value={leadDetails.Assigned_to}
                      onChange={handleChange}
                      style={formInput}
                    />
                    <textarea
                      name="Notes"
                      placeholder="Notes"
                      value={leadDetails.Notes}
                      onChange={handleChange}
                      style={{ ...formInput, height: "20px" }}
                    />
                    <input
                      type="text"
                      name="Follow_up"
                      placeholder="Follow Up"
                      value={leadDetails.Follow_up}
                      onChange={handleChange}
                      style={formInput}
                    />
                    <input
                      type="date"
                      name="date_created"
                      placeholder="Date Created"
                      value={leadDetails.date_created}
                      onChange={handleChange}
                      style={formInput}
                    />
                  </div>


                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="submit"
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#00ff6a",
                        color: "black",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Save Lead
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveStudentPage("list")}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#ff4444",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

// Reusable Styles
const menuBtn = {
  background: "transparent",
  border: "none",
  color: "white",
  textAlign: "left",
  display: "flex",
  gap: "12px",
  alignItems: "center",
  fontSize: "16px",
  cursor: "pointer",
};

const card = {
  backgroundColor: "#0d0d0d",
  padding: "18px",
  borderRadius: "12px",
  color: "white",
};

const cardHeader = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const formInput = {
  padding: "12px",
  backgroundColor: "#1a1a1a",
  border: "1px solid #333",
  borderRadius: "6px",
  color: "white",
};

export default Dashboard;

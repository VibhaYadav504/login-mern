import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from "react-icons/fi";

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isHover, setIsHover] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const validateForm = () => {
        let newErrors = {};
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Enter a valid email ";
        }
        if (!password.trim()) {
            newErrors.password = "Pasword is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        navigate("/dashboard");
    };

    return (
        <>
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "linear-gradient(135deg,#0c88a7,#4b494e)",
                    padding: "-20px",
                    fontFamily: "Poppins, sans-serif",
                }}
            >
                <h1
                    style={{
                        color: "white",
                        marginBottom: "20px",
                        fontSize: "32px",
                        letterSpacing: "1px",
                        fontWeight: "600",
                        textShadow: "0 3px 8px rgba(0,0,0,0.4)",
                    }}
                >
                    Admin Login
                </h1>
                <div
                style={{
                    width:"220px",
                    height:"3px",
                    background:"white",
                    borderRadius:"2px",
                    marginBottom:"25px",
                      border: "1px solid #333",
                    boxShadow:"0 2px 6px rgba(0,0,0,0.3"
                }}
                ></div>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        width: "270px",
                        minHeight: "320px",
                        background: "#a1bed1",
                        padding: "40px 30px",
                         border: "1px solid #333",
                        borderRadius: "5px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >

                    
                    <div style={{ position: "relative", marginBottom: "20px" }}>
                        <FiMail
                            size={18}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "10px",
                                transform: "translateY(-50%)",
                                color: "white",
                                background: "rgba(0,0,0,0.7)",
                                padding: "5px",
                                borderRadius: "4px",
                            }}
                        />

                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: "230px",
                                padding: "12px 12px 12px 45px",
                                border: "1px solid #333",
                                outline: "none",
                                fontSize: "15px",
                                borderRadius: "0px",
                                background:"#fff"
                            }}
                            required
                        />
                    </div>

                    {errors.email && (
                        <p style={{ color: "red", fontSize: "16px", marginBottom: "10px" }}>
                            {errors.email}
                        </p>
                    )}

                    
                    <div style={{ position: "relative", marginBottom: "20px" }}>
                        <FiLock
                            size={18}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "10px",
                                transform: "translateY(-50%)",
                                color: "white",
                                background: "rgba(0,0,0,0.7)",
                                padding: "5px",
                                borderRadius: "4px",
                            }}
                        />

                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: "230px",
                                padding: "12px 12px 12px 45px",
                                border: "1px solid #333",
                                outline: "none",
                                fontSize: "15px",
                                borderRadius: "0px",
                                background:"#fff"
                            }}
                            required
                        />
                    </div>

                    {errors.password && (
                        <p style={{ color: "red", fontSize: "16px", marginBottom: "10px" }}>
                            {errors.password}
                        </p>
                    )}

                    
                    <button
                        type="submit"
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => {
                            setIsHover(false);
                            setIsActive(false);
                        }}
                        onMouseDown={() => setIsActive(true)}
                        onMouseUp={() => setIsActive(false)}
                        style={{
                            width: "290px",
                            padding: "10px",
                            background: isActive
                                ? "#3d4daa"
                                : isHover
                                    ? "#1e1c3a"
                                    : "#6e8efb",
                            color: "#fff",
                            fontSize: "16px",
                            borderRadius: "0px",
                            border: "none",
                            cursor: "pointer",
                             border: "1px solid #333",
                            transition: "0.3s",
                            transform: isHover ? "scale(1.05)" : "scale(1)",
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </>
    );
};

export default LoginForm;

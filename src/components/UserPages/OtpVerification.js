// // OtpVerification.js
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { verifyOTP, loginSuccess } from "../../Slices/AuthenSlice"; // Import action for OTP verification
// import "../Users.css";
// const OtpVerification = ({ email, password, onBack }) => {
//     const dispatch = useDispatch();
//     const [otp, setOtp] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     const handleOtpVerification = async (e) => {
//         e.preventDefault();
//         setIsLoading(true); // Set loading state before making the API call
//         try {
//             const response = await dispatch(verifyOTP({ email, password, otp })).unwrap();
//             if (response.status === "OK") {
//                 const { data, access_token, refresh_token } = response; // Destructure the result
//                 dispatch(loginSuccess({  user: data , accessToken: access_token, refreshToken: refresh_token }));
//                 alert("OTP verified successfully!");
//             } else {
//                 alert("Invalid OTP");
//             }
//         } catch (error) {
//             console.error("OTP verification error:", error);
//             alert("Error verifying OTP");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="flex">
//             <div className="d-flex align-items-center justify-content-between mb-4">
//                 <button onClick={onBack} className="btn btn-link text-secondary p-0">
//                     <i className="fas fa-arrow-left" />
//                 </button>
//                 <h4 className="text-success-s2 font-weight-bold text-center flex-grow-1 m-0">Verify OTP</h4>
//                 <div style={{ width: "24px" }}></div> {/* Placeholder for spacing */}
//             </div>

//             <form onSubmit={handleOtpVerification}>
//                 <input
//                     type="text"
//                     className="form-control mb-2"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     required
//                 />
//                 <button
//                     type="submit"
//                     className="btn btn-success w-100"
//                     disabled={isLoading}
//                 >
//                     {isLoading ? "Verifying..." : "Verify OTP"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default OtpVerification;

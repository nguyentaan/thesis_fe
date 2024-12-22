// // OtpVerification.js
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { verifyOTP, loginSuccess } from "../../Slices/AuthenSlice"; // Import action for OTP verification

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
//                 dispatch(loginSuccess({ user: data, accessToken: access_token, refreshToken: refresh_token }));
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
//         <div className="flex flex-col p-4">
//             <div className="flex items-center justify-between mb-4">
//                 <button
//                     onClick={onBack}
//                     className="text-gray-500 hover:text-gray-700 p-0"
//                 >
//                     <i className="fas fa-arrow-left" />
//                 </button>
//                 <h4 className="text-teal-600 font-bold text-center flex-grow m-0">
//                     Verify OTP
//                 </h4>
//                 <div style={{ width: "24px" }}></div> {/* Placeholder for spacing */}
//             </div>

//             <form onSubmit={handleOtpVerification} className="flex flex-col space-y-4">
//                 <input
//                     type="text"
//                     className="form-input border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     required
//                 />
//                 <button
//                     type="submit"
//                     className={`w-full px-4 py-2 text-white font-medium rounded ${
//                         isLoading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-600"
//                     }`}
//                     disabled={isLoading}
//                 >
//                     {isLoading ? "Verifying..." : "Verify OTP"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default OtpVerification;

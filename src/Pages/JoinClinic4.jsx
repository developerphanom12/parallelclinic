import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import { FaHeadphones, FaSpinner } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import * as Yup from "yup";
import NewPlayerGlobal from "../components/NewPlayerGlobal";
import AboutLogo from "../assets/AboutLogo.png";
import { useParams } from "react-router-dom";


// Form validation schema
const applicationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  contactNumber: Yup.string()
    .required("Contact number is required")
    .matches(/^[0-9+\-\s]+$/, "Please enter a valid phone number"),
  position: Yup.string().required("Position is required"),
  message: Yup.string(),
  resume: Yup.mixed()
    .required("Resume is required")
    .test("fileType", "Only PDF files are accepted", (value) => {
      if (!value) return true;
      return value && value.type === "application/pdf";
    })
    .test("fileSize", "File is too large (max 5MB)", (value) => {
      if (!value) return true;
      return value && value.size <= 5 * 1024 * 1024; // 5MB limit
    }),
});

// Submit button component with loading state
function SubmitButton({ pending }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-[#A37159] hover:bg-[#C5A184] text-white py-2 px-6 rounded-md transition-all duration-300 disabled:opacity-70 flex items-center justify-center"
    >
      {pending ? (
        <>
          <FaSpinner className="animate-spin mr-2" /> Submitting...
        </>
      ) : (
        "Submit Application"
      )}
    </button>
  );
}

// Form submission loader overlay
function FormLoader() {
  return (
    <div className="fixed inset-0 bg-[#00000047] bg-opacity-50 flex items-center justify-center z-[1001]">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <FaSpinner className="text-[#A37159] text-4xl animate-spin mb-3" />
        <p className="text-[#676F75] font-medium">Submitting your application...</p>
      </div>
    </div>
  );
}

const jobData = [

{
    title: "Medical Tele-Consultants",
    SubHead: "Role Description:",
    items: [
      "Managing patients in an online clinic -providing medical consultations, prescribing medicines and following up with patients based on their online inputs. ",
      "Developing protocols for management of various medical conditions ",
      "Managing clinic & pharmacy operations in compliance with applicable regulations ",
      "Developing & overseeing the implementation of clinical research protocols  ",
      "Interacting with subject experts, clinicians/investigators on various therapeutic, scientific and patient care aspects ",
    ],
  },
];

const JoinClinic4 = () => {
        //   const [displayData, setDisplayData] = useState(jobData[0]);
          const [activePosition, setActivePosition] = useState(0); // Default active position
          const [showForm, setShowForm] = useState(false);
          const [formPending, setFormPending] = useState(false);
          const [submitSuccess, setSubmitSuccess] = useState(false);
          const [submitError, setSubmitError] = useState("");
          const [hasOverflow, setHasOverflow] = useState(false);
          const [validationErrors, setValidationErrors] = useState({});
          const id = useParams()
          const [loading, setLoading] = useState(true);

     
    // Form state
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        contactNumber: "",
        position: "Clinic Director",
        message: "",
    });
    const [resumeFile, setResumeFile] = useState(null);
    const [position, setPosition] = useState("Clinic Director");
    
      // Validate form data
      const validateForm = async () => {
        try {
          await applicationSchema.validate(
            {
              fullName: formData.fullName,
              email: formData.email,
              contactNumber: formData.contactNumber,
              position: formData.position,
              message: formData.message,
              resume: resumeFile
            },
            { abortEarly: false }
          );
          setValidationErrors({});
          return true;
        } catch (err) {
          const errors = {};
          err.inner.forEach((e) => {
            errors[e.path] = e.message;
          });
          setValidationErrors(errors);
          return false;
        }
      };
    
      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate form
        const isValid = await validateForm();
        if (!isValid) {
          return;
        }
    
        setFormPending(true);
        setSubmitError("");
    
        const submitData = new FormData();
        submitData.append("fullName", formData.fullName);
        submitData.append("email", formData.email);
        submitData.append("contactNumber", formData.contactNumber);
        submitData.append("position", formData.position);
        submitData.append("message", formData.message);
    
        if (resumeFile) {
          submitData.append("resume", resumeFile);
        }
    
        try {
          // Replace with your actual API endpoint
          const response = await axios.post('https://api5.phanomprofessionals.com/api/apply', submitData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
    
          console.log("Application submitted successfully!", response.data);
          setSubmitSuccess(true);
          setSubmitError("");
    
          // Reset form after successful submission
          setFormData({
            fullName: "",
            email: "",
            contactNumber: "",
            position: formData.position, // Keep the current position
            message: "",
          });
          setResumeFile(null);
    
          const fileInput = document.getElementById("resume");
          if (fileInput) fileInput.value = "";
    
          // Close form after 3 seconds
          setTimeout(() => {
            setShowForm(false);
            setSubmitSuccess(false);
          }, 3000);
        } catch (error) {
          console.error("Application submission error:", error);
          setSubmitError(
            error.response?.data?.message ||
            "Failed to submit your application. Please try again later."
          );
        } finally {
          setFormPending(false);
        }
      };
    
      // Handle input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
    
        // Clear validation error when field is edited
        if (validationErrors[name]) {
          setValidationErrors(prev => ({
            ...prev,
            [name]: undefined
          }));
        }
      };
    
      // Handle file input change
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          if (file.type === "application/pdf") {
            setResumeFile(file);
            // Clear validation error
            setValidationErrors(prev => ({
              ...prev,
              resume: undefined
            }));
          } else {
            setResumeFile(null);
            setValidationErrors(prev => ({
              ...prev,
              resume: "Only PDF files are accepted"
            }));
          }
        }
      };
  return (

    <div className="relative w-full bg-[#FDF8E5] pl-[5%] lgin-h-[84vh] flex flex-col overflow-y-hidden">
      
      {/* Heading */}
      <div className="text-[#A37159]   w-[80%] sm:w-full ">
        <h1 className="sm:text-[48px] text-[33px] leading-none whitespace-nowrap">
          Join <br className="block sm:hidden" />
          <span className="text-[#C5A184]">Parallel Clinic Team</span>
        </h1>
      </div>
      {/* Content */}

        <div>
          {/* Requirements List */}
          <div className="relative">
            <div
              className="h-auto lg:overflow-y-auto "
            >
              {jobData?.map((section, index) => (
                <div key={index} className=" ">
                  <h2 className="text-[#A37159] text-[20px] font-semibold flex items-start gap-2">
                    <span className="">{section?.index}</span>
                    <span style={{ fontFamily: "libre bodoni" }} className="flex-1">{section?.title}</span>
                  </h2>
                  <h3  className="ml-8 text-[#676F75] text-[18px]"> {section?.SubHead}</h3>
                  <h3 className="ml-8 text-[#676F75] text-[18px]"> {section?.desc}</h3>
                  <ul className="ml-8 text-[#676F75] text-[16px]">
                    {section?.items?.map((item, i) => (
                      <li key={i}>
                        <span className="mr-2">
                          {String.fromCharCode(97 + i)}.
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Show more indicator */}
            {/* {hasOverflow && (
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#FDF8E5] pb-2 pt-6 text-center">
                <span className="text-[#A37159] text-sm font-medium">Scroll to see more</span>
              </div>
            )} */}
          </div>

            {/* <p className="text-[#676F75] mt-2">
              {displayData[0]?.title === "Medical Consultants / Tele-Consultants" ?
                "" : "The position is based at Gurugram, Haryana, India."
              }
             
            </p> */}

          {/* Apply Now Button */}
          <div className="mt-6 flex justify-start">
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#A37159] hover:bg-[#C5A184] text-white py-2 px-4 rounded-md transition-all duration-300 cursor-pointer"
            >
              Convey Your Interest
            </button>
          </div>
        </div>
     

      {/* Bottom Text */}
      <div className="lg:fixed lg:bottom-0 sm:left-0 w-full px-4 sm:px-0 flex flex-col items-center text-center space-y-0.5 z-50 mt-10 sm:mt-0 mb-30 sm:mb-0 ">
        <h2 style={{ fontFamily: "libre bodoni" }} className="text-[#A37159] text-2xl sm:text-[23px] sm:w-[90%] w-[100%] font-bold mt-2">
          Practice World Class Personalized, Molecular-Targeted Precision
          Medicine using Natural Pharmaceutical Ingredients
        </h2>
        {/* <h2 style={{ fontFamily: "libre bodoni" }} className="text-[#A37159] text-2xl sm:text-[23px] font-bold">
          
        </h2> */}
        <p style={{ fontFamily: "roboto flex" }} className="text-[#676F75] text-base sm:text-[16px] sm:w-[60%] lg:w-full">
          Founded on a Deep Understanding of Molecular Basis of Pathophysiology
          of Medical Conditions
        </p>
        <p style={{ fontFamily: "roboto flex" }} className="text-[#676F75] text-base sm:text-[16px] sm:w-[60%] lg:w-full">
          Using Botanical Medicines with Well Documented Molecular Level
          Mechanisms of Actions
        </p>
        <div className="absolute bottom-4 right-8 text-sm text-gray-700">
          {/* <FaHeadphones size={50} className="text-[#DAA57B]" /> */}
          <NewPlayerGlobal />
        </div>
      </div>

      {/* Application Form Popup */}
      {showForm && (
        <div className="fixed inset-0 backdrop-blur-xs bg-[#00000047] bg-opacity-30 flex items-center justify-center z-[1000] p-4">
          {formPending && <FormLoader />}

          <div className="bg-[#FDF8E5] rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Form Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#C5A184]">
              <h2  style={{ fontFamily: "libre bodoni" }} className="text-[#A37159] text-2xl font-semibold">
                About My Self
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-[#A37159] hover:text-[#C5A184] transition-colors cursor-pointer"
                disabled={formPending}
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {/* Success/Error Messages */}
              {submitSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded mb-4 text-sm">
                  <p className="font-medium">
                    Application submitted successfully! We'll contact you soon.
                  </p>
                </div>
              )}

              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                  <p>{submitError}</p>
                </div>
              )}

              {/* Application Form */}
              <form style={{ fontFamily: "roboto flex" }} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name Field */}
                  <div className="sm:col-span-1 col-span-2">
                    <label
                      htmlFor="fullName"
                      className="block text-[#A37159] text-sm font-medium mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-3 py-1.5 border ${validationErrors.fullName
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#C5A184] focus:ring-[#A37159]"
                        } rounded-md focus:outline-none focus:ring-1 text-sm`}
                      placeholder="Enter your full name"
                    />
                    {validationErrors.fullName && (
                      <p className="mt-1 text-xs text-red-500">{validationErrors.fullName}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="sm:col-span-1 col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-[#A37159] text-sm font-medium mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-1.5 border ${validationErrors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#C5A184] focus:ring-[#A37159]"
                        } rounded-md focus:outline-none focus:ring-1 text-sm`}
                      placeholder="Enter your email address"
                    />
                    {validationErrors.email && (
                      <p className="mt-1 text-xs text-red-500">{validationErrors.email}</p>
                    )}
                  </div>

                  {/* Contact Number Field */}
                  <div className="sm:col-span-1 col-span-2">
                    <label
                      htmlFor="contactNumber"
                      className="block text-[#A37159] text-sm font-medium mb-1"
                    >
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className={`w-full px-3 py-1.5 border ${validationErrors.contactNumber
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#C5A184] focus:ring-[#A37159]"
                        } rounded-md focus:outline-none focus:ring-1 text-sm`}
                      placeholder="Enter your contact number"
                    />
                    {validationErrors.contactNumber && (
                      <p className="mt-1 text-xs text-red-500">{validationErrors.contactNumber}</p>
                    )}
                  </div>

                  {/* Position Field */}
                  <div className="sm:col-span-1 col-span-2">
                    <label
                      htmlFor="position"
                      className="block text-[#A37159] text-sm font-medium mb-1"
                    >
                      Position *
                    </label>
                    <select
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className={`w-full px-3 py-1.5 border ${validationErrors.position
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#C5A184] focus:ring-[#A37159]"
                        } rounded-md focus:outline-none focus:ring-1 text-sm`}
                    >
                      <option value="Clinic Director">Clinic Director</option>
                      <option value="Medical Consultant">
                        Medical Consultant
                      </option>
                      <option value="Medical Tele-Consultant">
                        Medical Tele-Consultant
                      </option>
                      <option value="Pharmacist">Pharmacist</option>
                    </select>
                    {validationErrors.position && (
                      <p className="mt-1 text-xs text-red-500">{validationErrors.position}</p>
                    )}
                  </div>

                  {/* Resume Upload */}
                  <div className="col-span-2">
                    <label
                      htmlFor="resume"
                      className="block text-[#A37159] text-sm font-medium mb-1"
                    >
                      Resume (PDF) *
                    </label>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className={`w-full px-3 py-1.5 border ${validationErrors.resume
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#C5A184] focus:ring-[#A37159]"
                        } rounded-md focus:outline-none focus:ring-1 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-[#A37159] file:text-white hover:file:bg-[#C5A184]`}
                    />
                    {resumeFile && (
                      <p className="mt-1 text-xs text-[#676F75]">
                        Selected file: {resumeFile.name}
                      </p>
                    )}
                    {validationErrors.resume && (
                      <p className="mt-1 text-xs text-red-500">{validationErrors.resume}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-[#A37159] text-sm font-medium mb-1"
                    >
                      Why do you want to join Parallel Clinic? (optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="3"
                      className={`w-full px-3 py-1.5 border ${validationErrors.message
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#C5A184] focus:ring-[#A37159]"
                        } rounded-md focus:outline-none focus:ring-1 text-sm`}
                      placeholder="Tell us about yourself and why you're interested in this position"
                    ></textarea>
                    {validationErrors.message && (
                      <p className="mt-1 text-xs text-red-500">{validationErrors.message}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-4 flex justify-center cursor-pointer">
                  <SubmitButton pending={formPending} />
                </div>
              </form>

              {/* Additional Information */}
              <div className="mt-2 text-center text-[#676F75] text-xs">
                <p>
                  For questions, email us at{" "}
                  <a
                    href="mailto:JoinOurTeam@Parallel.Clinic"
                    className="text-[#A37159] hover:underline"
                  >
                    JoinOurTeam@Parallel.Clinic
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
   
  )
}

export default JoinClinic4

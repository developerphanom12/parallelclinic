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
import AboutLogo2 from "../assets/AboutBrown.png";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";


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
    title:
      "Attributes We Are Looking For",
    // SubHead: "We are looking for mature persons with",
    items: [
  "Outstanding articulation and communication skills",
  "Proficiency in using professional video conferences (We are an online clinic!)",
  "Outstanding MS Office capabilities",
  "An eye for detail, attitude for compliance, with a temperament to understand and communicate nuanced issues",
  "Experience of literature search, writing scientific research documents, publications, and blogs would be highly valued",
],

  },
  {
    title: "Practice Personalized Molecular Medicine",

   items: [
  "Parallel Clinic’s therapeutic doctrine is founded on Physicians & Patients working in parallel with personalized, molecular-targeted, precision medicine.",
  "Our molecular-targeted approach is based on a very deep understanding of the molecular pathophysiology of some selected diseases that we treat.",
  "The Natural Pharmaceutical Ingredients (NPIs) used to treat are identified based on their well-characterized ingredients which target the specific diseases stages at molecular level.",
  "The safety and efficacy of these NPI is well elucidated in many scientific journals of international repute - providing them an irrefutable evidence-base, backed by at least decades of human use experience.",
  "Parallel Clinic is making medicine personal & precise. Unlike the one-size-fits-all conventional medicine."
]

  },
  {
    title: "Professional Growth Opportunities",
   items: [
  "Managing large, long term Effectiveness Clinical Trials for natural medicines to create a scientific evidence base in line with US FDA systems",
  "Being part of a team that’s on the forefront of developing unique prescription medicines",
  "Learning thought-leadership skills",
  "Authoring publications and presenting in international fora"
]


  },
  {
    title: "Professional Compensation",
   items: [
  "Best available in the industry, based on qualifications, experience, and skills",
  "Besides, Parallel Clinic offers highly lucrative performance-linked incentives based upon personal & professional attributes."
]

  },
  {
    title: "Medical Director ",
    SubHead: "Role Description:",
    items: [
      "To manage and supervise everyday operations of the clinic with a focus on improving the quality of patient care by ensuring the facilities are well-staffed. ",
      "Oversight of all operations of the clinic, including but not limited to ",
      "Selection of medical, paramedical and support staff ",
      "Responsible for the performance of medical, paramedical and support staff ",
      "Setting SOPs, Treatment Protocols and Standards of Care to be followed in the clinic ",
      "Coordinating the preparation of ",
      "Treatment Protocols, and  ",
      "Standards of Care for all medical conditions managed and treated at the Clinic.  ",
      "Oversight of budget ",
    ],
  },
  {
    title: "Medical Consultants / Tele-Consultants",
    SubHead: "Role Description:",
    items: [
      "Managing patients in an online clinic -providing medical consultations, prescribing medicines and following up with patients based on their online inputs. ",
      "Developing protocols for management of various medical conditions ",
      "Managing clinic & pharmacy operations in compliance with applicable regulations ",
      "Developing & overseeing the implementation of clinical research protocols  ",
      "Interacting with subject experts, clinicians/investigators on various therapeutic, scientific and patient care aspects ",
    ],
  },
  {
    title: "Pharmacists",
    SubHead: "Role Description:",
    desc: "Managing Pharmacy operations, including",
    items: [
      
      "preparing and dispensing medicines (including making extractions & mixtures on natural products) ",
      "storing medicines ",
      "managing inventories",
    ],
  },
];

const JoinClinic = () => {
      const navigate = useNavigate()
      const requirementsRef = useRef(null);
      const [displayData, setDisplayData] = useState(jobData.slice(0, 4));
      const [activePosition, setActivePosition] = useState(0); // Default active position
      const [showForm, setShowForm] = useState(false);
      const [formPending, setFormPending] = useState(false);
      const [submitSuccess, setSubmitSuccess] = useState(false);
      const [submitError, setSubmitError] = useState("");
      const [hasOverflow, setHasOverflow] = useState(false);
      const [validationErrors, setValidationErrors] = useState({});
       const [currentLogo, setCurrentLogo] = useState(AboutLogo);
       const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo(prev => (prev === AboutLogo ? AboutLogo2 : AboutLogo));
    }, 800);

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const toggleSection = (sectionIndex) => {
  setOpenSections(prev => ({...prev ,[sectionIndex]: !prev[sectionIndex]
  }));
};

       // Form state
        const [formData, setFormData] = useState({
          fullName: "",
          email: "",
          contactNumber: "",
          position: "Medical Director",
          message: "",
        });
        const [resumeFile, setResumeFile] = useState(null);
     
//   const handleClick = (btnIndex) => {
//     if (btnIndex === 1) {
//       setDisplayData([jobData[3]]);
//       setFormData((prev) => ({ ...prev, position: "Medical Director" }));
//     } else if (btnIndex === 2) {
//       setDisplayData([jobData[4]]);
//       setFormData((prev) => ({ ...prev, position: "Medical Consultant" }));
//     } else if (btnIndex === 3) {
//       setDisplayData([jobData[4]]);
//       setFormData((prev) => ({ ...prev, position: "Medical Tele-Consultant" }));
//     } else if (btnIndex === 4) {
//       setDisplayData([jobData[5]]);
//       setFormData((prev) => ({ ...prev, position: "Pharmacist" }));
//     }
//     setActivePosition(btnIndex);

//     if (window.innerWidth <= 768) {
//       console.log("📱 Trying to scroll to top...");
//       gsap.to(window, {
//         scrollTo: { y: 0 },
//         duration: 1,
//         ease: "power2.out",
//       });
//     }
//   };

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
    <div className="relative w-full bg-[#FDF8E5] lgin-h-[84vh] flex flex-col overflow-y-hidden">
      
      {/* Heading */}
      <div className="text-[#A37159] mt-[10px] pl-[5%] w-[80%] flex justify-center items-center mb-4 sm:w-full ">
        <h1 className="sm:text-[48px] text-[33px] leading-none whitespace-nowrap">
          Join <br className="block sm:hidden" />
          <span className="text-[#C5A184]">Parallel Clinic Team</span>
        </h1>
      </div>
      {/* Content */}

      <div className="flex flex-col-reverse md:flex-row sm:h-[55vh]">
  {/* Left Column (70%, scrollable) */}
  <div className="w-full md:w-[50%] md:overflow-y-auto p-4">
    <div className="relative">
      <div
        ref={requirementsRef}
        className="h-auto lg:overflow-y-auto sm:pl-[6%] w-full lg:w-[90%]"
      >
        {displayData?.map((section, index) => (
          <div key={index} className="pb-2">
            <div 
              className="text-[#A37159] text-[20px] font-semibold flex items-start gap-1 justify-between cursor-pointer"
              onClick={() => toggleSection(index)}
            >
              <h2 style={{ fontFamily: "libre bodoni" }} className="flex items-start gap-2 w-[93%]">
                <span className="">{section?.index}</span>
                <span className="flex-1">{section?.title}</span>
              </h2>
             
              <div className="w-[7%] ">

              {openSections[index] ? (
                <FaChevronUp size={20} className="text-[#A37159] lg:mr-[15%] " />
              ) : (
                <FaChevronDown size={20} className="text-[#A37159] lg:mr-[15%]  " />
              )}
              </div>
              
            </div>
            
            {openSections[index] && (
              <div className="mt-3 ml-8 transition-all duration-300 ease-in-out">
                {section?.SubHead && (
                  <h3 style={{ fontFamily: "roboto flex" }} className="text-[#676F75] text-[18px] mb-2">
                    {section?.SubHead}
                  </h3>
                )}
                
                {section?.desc && (
                  <h3 style={{ fontFamily: "roboto flex" }} className="text-[#676F75] text-[18px] mb-2 pr-2">
                    {section?.desc}
                  </h3>
                )}
                
                <ul style={{ fontFamily: "roboto flex" }} className="text-[#676F75] text-[18px] pr-2">
                  {section?.items?.map((item, i) => (
                    <li key={i} className=" flex">
                      <span className="mr-2 ">
                        {String.fromCharCode(97 + i)}.
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

       <p style={{ fontFamily: "libre bodoni" }} className="text-[#A37159] sm:pl-2 sm:pr-6 mt-2 ">
  All positions offer long-term growth opportunities and expect a minimum 2 years’ engagement commitment. <br />
  Please send your resume by Email to{" "}
  <a href="mailto:JoinOurTeam@ParallelClinic.com" className="">
    JoinOurTeam@ParallelClinic.com
  </a>
</p>

      </div>
    
    </div>
  </div>

  {/* Right Column (30%, fixed) */}
  <div style={{ fontFamily: "libre bodoni" }} className="w-full md:w-[50%] p-4  sticky top-0 overflow-y-auto sm:ml-4">
    <h4 className=" text-[#A37159] text-[24px]">Inviting</h4>
    <h4 className=" text-[#A37159] text-[24px]">Ayurvedic Doctors &</h4>
    <h4 className=" text-[#A37159] text-[24px]">Conventional / Allopathic Doctors</h4>
      <div onClick={()=>navigate("/joinparallelclinic/clinicdirector")} className="flex gap-2 items-center cursor-pointer">
        <img src={currentLogo} alt="icon" />
        <ul className="hover:text-[#A37159] hover:text-[25px] text-[#848688] text-[24px] pt-1">Medical Director</ul>
      </div>
      <div onClick={()=>navigate("/joinparallelclinic/medicalconsultants")} className="flex gap-2 items-center cursor-pointer">
        <img src={currentLogo} alt="icon" />
        <ul className="hover:text-[#A37159] hover:text-[25px] text-[#848688] text-[24px] pt-1">Medical Consultants</ul>
      </div>
      <div onClick={()=>navigate("/joinparallelclinic/medicalteleconsultants")} className="flex gap-2 items-center cursor-pointer">
        <img src={currentLogo} alt="icon" />
        <ul className="hover:text-[#A37159] hover:text-[25px] text-[#848688] text-[24px] pt-1">Medical Tele-Consultants</ul>
      </div>
      <div onClick={()=>navigate("/joinparallelclinic/pharmacists")} className="flex gap-2 items-center cursor-pointer">
        <img src={currentLogo} alt="icon" />
        <ul className="hover:text-[#A37159] hover:text-[25px] text-[#848688] text-[24px] pt-1">Pharmacists</ul>
      </div>
      {/* <ul></ul>
      <ul></ul>
      <ul></ul> */}
  </div>
</div>
     

      {/* Bottom Text */}
      <div className="sm:fixed sm:bottom-0 sm:left-0 w-full px-4 sm:px-0 flex flex-col items-center text-center space-y-0.5 mt-2 sm:mt-0  sm:mb-0 ">
        <h2 style={{ fontFamily: "libre bodoni" }} className="text-[#A37159] text-2xl sm:text-[23px] font-bold mt-2">
          Practice World Class Personalized, Molecular-Targeted Precision
          Medicine using Natural Pharmaceutical Ingredients
        </h2>
        {/* <h2 style={{ fontFamily: "libre bodoni" }} className="text-[#A37159] text-2xl sm:text-[23px] font-bold">
          
        </h2> */}
        <p style={{ fontFamily: "roboto flex" }} className="text-[#676F75] text-base sm:text-[16px]  lg:w-full">
          Founded on a Deep Understanding of Molecular Basis of Pathophysiology
          of Medical Conditions
        </p>
        <p style={{ fontFamily: "roboto flex" }} className="text-[#676F75] text-base sm:text-[16px]  lg:w-full">
          Using Botanical Medicines with Well Documented Molecular Level
          Mechanisms of Actions
        </p>
      </div>

      {/* Application Form Popup */}
      {showForm && (
        <div className="fixed inset-0 backdrop-blur-xs bg-[#00000047] bg-opacity-30 flex items-center justify-center z-[1000] p-4">
          {formPending && <FormLoader />}

          <div className="bg-[#FDF8E5] rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Form Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#C5A184]">
              <h2 className="text-[#A37159] text-2xl font-semibold">
                Apply for {formData.position}
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
              <form onSubmit={handleSubmit}>
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
                      <option value="Medical Director">Medical Director</option>
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

export default JoinClinic

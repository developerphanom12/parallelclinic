import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaHeadphones } from "react-icons/fa6";

export const conditionSections = [
  {
    title: "Cancer Treatment Side Effects",
    index: "1.",
    items: [
      "Oral Mucositis (CIOM/RIOM)",
      "Nausea & Vomiting (CINV/RINV)",
      "Skin Rashes (chemo rashes / radiation dermatitis / erythema / desquamation)",
      "Cancer-Related Fatigue (CRF)",
      "Pain",
      "Neuropathy (chemo / radiation-induced)",
      "Diarrhea"
    ]
  },
  {
    title: "Post-Cancer Management",
    index: "b.",
    items: [
      "Late Effects of Cancer Treatment",
      "Chemo-Brain (Difficulty remembering or processing information)",
      "Fatigue & Weakness",
      "Neuropathy (CIPN) (nerve damage that causes tingling, burning, weakness or numbness in hands and/or feet)"
    ]
  },
  {
    title: "Geriatric Conditions (Elderly Patients)",
    index: "h.",
    items: [
      "Dry Skin",
      "Joint Pain",
      "Muscle Pain",
      "Bowel Movement Disorders"
    ]
  },
  {
    title: "Pre-Diabetes / Obesity / NLP-1 Agonism",
    index: "f.",
    items: ["Metabolic Disorders"]
  },
  {
    title: "Brain & Memory Function",
    index: "h.",
    items: ["Cognitive Function (brain memory, attention, problem-solving, decision-making)"]
  },
  {
    title: "Pediatric Conditions (Children)",
    index: "6.",
    items: [
      "Atopic Dermatitis",
      "Low Immunity (frequent illnesses)",
      "Respiratory Distress Conditions (wheezing, asthma, etc.)"
    ]
  },
  {
    title: "Liver Disorders",
    index: "7.",
    items: [
      "Fatty Liver",
      "Hepatitis",
      "Cirrhosis",
      "Low Appetite"
    ]
  },
  {
    title: "Skin Conditions",
    index: "viii.",
    items: [
      "Acne",
      "Dermatitis",
      "Skin Infections",
      "Psoriasis",
      "Pigmentation"
    ]
  },
  {
    title: "Immunity Disorders",
    index: "f.",
    items: ["Psoriasis", "Recurrent Infections"]
  },
  {
    title: "Kidney Health",
    index: "i.",
    items: ["Chronic Kidney Disease (Non-Kidney Disorders)"]
  },
  {
    title: "Reproductive & Sexual Health",
    index: "k.",
    items: [
      "Dysmenorrhea & Pre-menopause syndrome",
      "Polycystic ovary syndrome (PCOS)",
      "Infertility issues",
      "Erectile dysfunction",
      "Ovarian insufficiency",
      "Sexual dysfunction (Men & Women)"
    ]
  }
];


const MedicalCondition = () => {
  const cursorRef = useRef(null);

  const leftColumn = conditionSections.slice(0, 5);  // first 5 sections
  const rightColumn = conditionSections.slice(5, 11); // next 6 sections


  // Mouse follower
  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCircle = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    const checkMouseLeaveDocument = (e) => {
      if (!e.relatedTarget && !e.toElement) {
        gsap.to(cursor, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
        });
      }
    };

    window.addEventListener("mousemove", moveCircle);
    document.addEventListener("mouseout", checkMouseLeaveDocument);

    return () => {
      document.removeEventListener("mouseout", checkMouseLeaveDocument);
      window.removeEventListener("mousemove", moveCircle);
    };
  }, []);

  return (
    <div className="relative w-full bg-[#FDF8E5] sm:min-h-[84vh] flex flex-col">
      {/* Cursor */}
      <div
        ref={cursorRef}
        className="w-12 h-12 border border-[#C5A184] rounded-full fixed top-0 left-0 z-[999]"
      />

      {/* Content */}
      <div className="w-full px-2 sm:px-16 sm:h-[70vh] h-full">
        {/* Heading */}
        <div className="text-[#A37159] flex items-start w-full mb-2 pl-[2%]">
          <h1 className="sm:text-[55px] text-[33px] w-[80%] sm:w-auto leading-none">Medical Conditions<br className="block sm:hidden" /><span className="text-[#C5A184]">{" "}Managed by Parallel Clinic</span></h1>
        </div>

        {/* Medical Conditions List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4 px-4 sm:px-8">
          {/* Left Column */}
          <div>
            {leftColumn.map((section, index) => (
              <div key={index} className="">
                <p className="text-[#A37159] text-[18px] font-semibold">
                  <span className="mr-2">{section.index}</span>
                  {section.title}
                </p>
                <ul className="ml-8 text-[#676F75] text-[12px]">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <span className="mr-2">{String.fromCharCode(97 + i)}.</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div>
            {rightColumn.map((section, index) => (
              <div key={index} className="">
                <p className="text-[#A37159] text-[18px] font-semibold">
                  <span className="mr-2">{section.index}</span>
                  {section.title}
                </p>
                <ul className="ml-8 text-[#676F75] text-[12px]">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <span className="mr-2">{String.fromCharCode(97 + i)}.</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
      {/* Bottom Right Text */}
      <div className="absolute bottom-0 right-8 text-sm text-gray-700">
        <FaHeadphones size={50} className="text-[#DAA57B]" />
      </div>
    </div>
  );
};

export default MedicalCondition;

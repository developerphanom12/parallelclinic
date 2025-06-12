import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaHeadphones } from "react-icons/fa6";
import Heading from "../components/Heading";
import NewPlayerGlobal from "../components/NewPlayerGlobal";

export const conditionSections = [
  {
    title: "Cancer Treatment Side Effects",
    startCharCode: 97, // 'a'
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
    index: "2",
    startCharCode: 99, // 'c'
    items: [
      "Late Effects of Cancer Treatment",
      "Chemo-Brain (Difficulty remembering or processing information)",
      "Fatigue & Weakness",
      "Neuropathy (CIPN) (nerve damage that causes tingling, burning, weakness or numbness in hands and/or feet)",
      "Rehabilitation",
    ]
  },
  {
    title: "Geriatric Conditions (Elderly Patients)",
    startCharCode: 97, // 'a'
    index: "3.",
    items: [
      "Dry Skin",
      "Joint Pain",
      "Muscle Pain",
      "Memory impairment",
      "Prostatitis",
    ]
  },
  {
    title: "Pre-Diabetes / Obesity / NLP-1 Agonism",
    startCharCode: 103, // 'g'
    index: "4.",
    items: ["Metabolic Disorders"]
  },
  {
    title: "Brain & Memory Function",
    startCharCode: 105, // 'i'
    index: "5.",
    items: ["Cognitive Function (brain memory, attention, problem-solving, decision-making)"]
  },
  {
    title: "Pediatric Conditions (Children)",
    startCharCode: 97, // 'a'
    index: "6.",
    items: [
      "Atopic Dermatitis",
      "Low Immunity (frequent illnesses)",
      "Respiratory Distress Conditions (wheezing, asthma, etc.)"
    ]
  },
  {
    title: "Liver Disorders",
    startCharCode: 97, // 'a'
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
    startCharCode: 97, // 'a'
    index: "8.",
    items: [
      "Acne",
      "Dermatitis",
      "Skin Infections",
      "Psoriasis",
      "Dry Skin"
    ]
  },
  {
    title: "Immunity Disorders",
    startCharCode: 103, // 'g'
    index: "9.",
    items: ["Psoriasis", "Frequent Infections"]
  },
  {
    title: "Kidney Health",
    startCharCode: 106, // 'j'
    index: "10.",
    items: ["Early-stage Chronic Kidney Disorders"]
  },
  {
    title: "Reproductive & Sexual Health",
    startCharCode: 108, // 'i'
    index: "11.",
    items: [
      "Dysmenorrhea; Post-menopausal syndrome",
      "Polycystic ovary syndrome (PCOS)",
      "Endometriosis",
      "Uterine fibroids",
      "Ovarian insufficiency",
      "Sexual dysfunction (Men & Women)"
    ]
  }
];


const MedicalCondition = () => {

  const leftColumn = conditionSections.slice(0, 5);  // first 5 sections
  const rightColumn = conditionSections.slice(5, 11); // next 6 sections

  const toRoman = (num) => {
  const romans = [
    ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
    ["C", 100],  ["XC", 90],  ["L", 50],  ["XL", 40],
    ["X", 10],   ["IX", 9],   ["V", 5],   ["IV", 4], ["I", 1],
  ];
  let result = "";
  for (const [roman, value] of romans) {
    while (num >= value) {
      result += roman;
      num -= value;
    }
  }
  return result.toLowerCase();
};

  return (
    <div className="relative w-full bg-[#FDF8E5] sm:min-h-[84vh] flex flex-col">
      {/* Content */}
<div className="w-full px-4 sm:px-16 hide-scrollbar relative flex flex-col mt-6  sm:mt-2 sm:h-[calc(100vh-5rem)] ">
      <Heading firstText="Medical Conditions" secondText="Managed by Parallel Clinic" />

        {/* Medical Conditions List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4 sm:mb-0 mt-6 ">
          {/* Left Column */}
          <div>
            {leftColumn.map((section, index) => (
              <div key={index} className="leading-tight">
                <p style={{ fontFamily: "libre bodoni" }} className="text-[#A37159] text-[18px] font-semibold">
                  <span className="mr-2">{section.index}</span>
                  {section.title}
                </p>
                <ul style={{ fontFamily: "roboto flex" }} className="ml-8 text-[#676F75] text-[12px]">
                  {section.items.map((item, i) => (
                   <li key={i} className="flex items-baseline">
                  <span className="mr-2 flex-shrink-0 w-2">{toRoman(i + 1)}.</span>
                  <span className="block">{item}</span>
                </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div>
            {rightColumn.map((section, index) => (
              <div key={index} className="leading-tight">
                <p style={{ fontFamily: "libre bodoni" }} className="text-[#A37159] text-[18px] font-semibold">
                  <span className="mr-2">{section.index}</span>
                  {section.title}
                </p>
                <ul style={{ fontFamily: "roboto flex" }} className="ml-8 text-[#676F75] text-[12px]">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <span className="mr-2 inline-block w-2 ">
                      {/* {String.fromCharCode(( 97) + i)}. */}
                       {toRoman(i + 1)}.
                        </span>
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
      {/* <div className="absolute bottom-0 right-8 text-sm text-gray-700"> */}
        {/* <FaHeadphones size={50} className="text-[#DAA57B]" /> */}
        {/* <NewPlayerGlobal/>
      </div> */}

     {/* <div className="sm:fixed sm:bottom-0 sm:left-0  w-full">
  <div className="flex justify-end text-sm text-gray-700 p-2">
    <NewPlayerGlobal />
  </div>
</div> */}
    {/* <FaHeadphones size={50} className="text-[#DAA57B]" /> */}


    </div>
  );
};

export default MedicalCondition;

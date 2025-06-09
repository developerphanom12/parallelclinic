

// export default AboutClinic;
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaHeadphones } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import NewPlayerGlobal from "../components/NewPlayerGlobal";

const faqs = [
  {
    question: "What is special about Parallel Clinic",
    answer: [
      "Parallel Clinic’s therapeutic doctrine is founded on Physicians & Patients working in Parallel, offering Personalized, Molecular-Targeted, Precision Medicine using Natural Pharmaceutical Ingredients (NPIs).",

      "A significant fact is that approximately 90% of all current medications are effective for only 30~50% of the patients who take them!",

      "Our Molecular-Targeted approach is based on a very deep understanding of the molecular pathophysiology of diseases that we treat. The NPIs used to treat are selected based on their well-characterized ingredients which target the specific disease stages at molecular level. The safety as well as efficacy of these NPIs is well elucidated in large number of scientific journals of international repute – providing them an irrefutable evidence-base, backed by at least decades of human use experience.",

      "Parallel Clinic is Making Your Medicine Personal & Precise. Unlike the one-size-fits-all conventional medicine. In several situations, we may advise patients receiving treatment from Parallel Clinic to continue to take the medicines prescribed by their allopathic/conventional doctors. We encourage patients to inform their conventional doctors about receiving treatment from Parallel Clinic. We are glad to provide succinct scientific information about the effects of our medicines to their conventional doctors."
    ]
  },
  {
    question: "What kind of medicines are used by Parallel Clinic?",
    answer: ["We treat patients by dispensing unique medicines that are formulated using Natural Pharmaceutical Ingredients (NPIs), mostly botanicals.These NPIs are processed, extracted and formulated in our specialized pharmacy in a highly scientific manner, personalized for precise molecular targeting of the patient's disease condition and stage."],
  },
  {
    question: "How does Parallel Clinic use Personalized, Precision Medicine?",
    answer: [
      "Our personalized, precision medicine is a distinguished approach in which the treatment for each patient is personalized based on that patient's specific clinical signs and symptoms, way of life, family history, environmental variables, and behavioral characteristics.",

      "Parallel Clinic's personalized medicine methodology necessitates that patients work together with our physicians - in parallel. The patient-interactions constantly inform our physicians, and patients have an active say in their own treatment. Through active participation, people are better able to comprehend their health conditions and therapies, which also promotes treatment plan adherence and more honest dialogue between patients and our healthcare providers.",

      "Regular monitoring for treatment management is integral to our personalized medicine approach. Patients are encouraged to discuss their progress with the physicians, and to provide feedback through dedicated Apps.. Parallel Clinic also has a dedicated app where the patients are regularly tracked as follow-up until the condition is resolved or, over a long term to prevent recurrence of the condition.",

      "Personalized medicine aims to understand the biomarkers and molecular processes underlying an individual’s clinical condition, susceptibility to certain medical conditions based on their family history, and their higher or lower receptivity to certain types of treatments and medicines. Our physicians make more informed decisions on risk assessment, prevention, diagnosis, and treatment of their medical conditions to formulate and dispense personalized, precise medicines for each patient.",

      "This approach also helps our Physicians to develop preventive care programs and therapies personalized for each patient, leading to better health outcomes, minimizing the possible side effects of unnecessary treatments. This avoids the suffering and costs associated with prolonged trial-and-error attempts to treat medical conditions using conventional medicine.",

      "Parallel Clinic's personalized medicine approach to therapeutics is predictive, preventive, personalized and participatory, aiming to fully cure, or to limit the worsening of the disease conditions.",

    ]
  },
  {
    question: "How does Parallel Clinic practice Molecular Medicine?",
    answer: ["Parallel Clinic brings a paradigm shift in how we approach disease treatment, distinct from traditional methods to a more nuanced and scientific understanding of the molecular framework of health and disease. We use biomarker-driven care by preparing & dispensing personalized medicines that are formulated using very precisely chosen NPIs.",

      "Our approach is founded on identifying and understanding the molecular deviations that lead to various disease conditions, to improve patient care and treatment outcomes. The molecular medicine concepts are used to plan interventions by identifying the precise Natural Pharmaceutical Ingredients that would address the cellular and molecular phenomena."],
  },
  {
    question: "What is Parallel Clinic doing for research and improvement of its therapies?",
    answer: ["All medical institutions conduct research to improve patient outcomes and to innovate. Parallel Clinic is pursuing Real World Evidence (RWE) clinical studies to refine and add to the current substantial clinical evidence about the usage and potential benefits or risks of NPIs being used to make medicines dispensed to its patients. These RWE studies routinely collect data relating to patient's health status and/or the delivery of health care. The clinic data facilitates continual improvement of therapies as well as innovation.",

      "Importantly, our research does not use patient identifiers, keeping your personal identity data absolutely secure and confidential. Only anonymized data is used for research which speeds up medical progress by creating innovative therapies and precision-based clinical studies to test therapies adapted to individual patients."
    ]
  },
  {
    question: "Does Parallel Clinic use steroids to treat patients?",
    answer: [
      <>Typically, the medicines used by Parallel Clinic <strong>do not contain any added:</strong></>,
      "a. Steroids,",
      "b. Heavy metals,",
      "c. Chemical or biological drugs used in conventional (allopathic) medicine,",
      "d. Alcohol, or",
      "e. Artificial sweeteners or flavors.",
      "Some excipients (such as preservatives, thickening agents, etc.) may be the only non-natural ingredients in the medicines prepared and dispensed by us. However, these excipients comply with the specifications prescribed under applicable regulations."
    ]

  },
  {
    question: "What is the evidence of safety and efficacy of the natural ingredients in Parallel Clinic medicines?",
    answer: ["Each NPI used by Parallel Clinic to make medicines has a voluminous evidence base, backed by publications in international peer-reviewed journals. Most of this evidence is based on prior human use over at least several decades.",

      "The scientific evidence of safety and efficacy of NPIs includes enumeration of their mechanism of actions at the molecular level."],
  },
  {
    question: "Can I tell my doctor that I'm taking treatment from Parallel Clinic also?",
    answer: ["Sure. In fact, we would encourage that you keep your doctor informed about all the medicines you are taking. Typically, conventional (allopathic) doctors may say that they do not know about these medicines. While that statement and position is right from their perspective - Parallel Clinic have specialists who have a deep, scientific understanding of these medicines and the molecular pathophysiology of the diseases treated by us."],
  },
  {
    question: "Will the medicines given by Parallel Clinic also treat the patients' cancer?",
    answer: [
      "No. We do not offer treatment for cancer.",
      "For cancer patients - Parallel Clinic is focused on treating medical conditions that emerge due to conventional cancer treatment like chemotherapy and/or radiotherapy. These include:",
      "a. Oral Mucositis (CIOM/RIOM)",
      "b. Nausea & Vomiting (CINV/RINV)",
      "c. Skin Rashes (chemo rashes, radiation dermatitis, erythema, desquamation)",
      "d. Cancer-Related Fatigue (CRF)",
      "e. Pain",
      "f. Neuropathy (chemo/radiation-induced)",
      "g. Diarrhea",
      "h. Chemo-Brain (Difficulty remembering or processing information)",
      "i. Diarrhea or Constipation",
      "j. Neuropathy (CIPN) (nerve damage that causes tingling, burning, weakness or numbness in hands and/or feet)",
      "k. Post-cancer treatment management & rehabilitation",
      "We are actively working on creating an evidence base which will inform the global healthcare community whether treating above conditions with our medicines is also helping in improving cancer treatment outcomes of patients.",
      <>While this may turn out to be a positive collateral outcome - <strong> presently we do not have adequate evidence to make any claims about treating cancer. </strong>
      </>
    ]

  },
  {
    question: "Who are the people behind Parallel Clinic?",
    answer: "Parallel Clinic has been set up by a team of veteran scientists. The team includes Clinical Pharmacologists, Pharmaceutical Scientists, PhDs, Medical Doctors qualified in allopathic medicine and Medical Doctors qualified in ayurvedic medicine. Our leadership has experience of global clinical drug development for clients based in highly regulated territories including the USA, Canada, EU, UK and Japan",
  },
  {
    question: "Why are these therapies not used more frequently? Why are these medicines not available in the market?",
    answer: ["We believe that the lack of patentability does not leave these natural products very attractive for modern pharma companies which thrive on patents.",]
  },
  {
    question: "What is the regulatory status of the natural ingredients used by Parallel Clinic in medicines?",
    answer: [<>US FDA's position about these medicines is stated as "not presently considered to be part of conventional medicine", where "conventional medicine" refers to the allopathic medicine system.</>,

    <>US National Center for Complementary and Alternative Medicine (NCCAM) interprets “complementary” medicine as being used together with conventional (allopathic) medicine, whereas “alternative” medicine is used in place of conventional medicine.</>,

      "By that definition - Parallel Clinic treats patients using natural products (mostly botanicals) as complementary medicines.",
    <>Further, the US FDA defines a botanical drug product as consisting of "vegetable materials, which may include plant materials, algae, macroscopic fungi, or combinations thereof."</>,
      "FDA states that a botanical drug product may be available as (but not limited to) a solution (e.g., tea), powder, tablet, capsule, elixir, topical, or injection. Botanical drug products often have unique features, for example, complex mixtures, lack of a distinct active ingredient, and substantial prior human use.",

    <><strong>Canada</strong>, on the other hand, regulates these medicines under Natural Health Products Regulations.</>,
    <><strong>India</strong> regulations classify and regulate most of these medicines under Drugs & Cosmetics Act as ayurvedic medicines.</>

    ]
  },
  {
    question: "Can I continue to take medicines prescribed by my cancer specialist?",
    answer: ["Yes, absolutely. Parallel Clinic does not treat cancer. You must continue to take all the medicines given by your cancer specialist.",]
  },
  {
    question: "Does Parallel Clinic use herbal medicines?",
    answer: ["Yes and no. Herbal is a nuanced term, often misrepresented or misused.",

      "Botany defines herbs as plants that do not have a woody stem, and they die down at the end of a growing season. Accordingly, while all herbs are botanicals and all botanicals are natural products - the reverse may not be true in all cases.",

      "Some natural ingredients used in Parallel Clinic medicines may have come from trees (which, by definition, are not herbs). Or, the ingredients used may include honey (which is 100% natural yet may not be classified as a botanical product since it is collected by honeybees). Some other ingredients may be bio-identical, e.g., hyaluronic acid which is present in human body in abundance, or Natural Moisturizing Factors (NMFs) present in the top layer of skin which are a collection of water-soluble compounds top like amino acids, urea, lactic acid and various other humectants that are obviously not herbs."
    ]
  },

];

const AboutClinic = () => {
  const cursorRef = useRef(null);
  const [showButton, setShowButton] = useState(true);
  const scrollContainerRef = useRef(null); 
  const [openIndex, setOpenIndex] = useState(null);

  const half = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, half);
  const rightFaqs = faqs.slice(half);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

  useEffect(() => {
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      // Check if we're at the bottom of the container
      const isBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
      
      // Check if there's content to scroll
      const hasScrollableContent = container.scrollHeight > container.clientHeight;
      
      // Only show the button if there's content to scroll and we're not at the bottom
      setShowButton(hasScrollableContent && !isBottom);
      
      // Debug logs
      console.log("Container height:", container.clientHeight);
      console.log("Content height:", container.scrollHeight);
      console.log("Scroll position:", container.scrollTop);
      console.log("Has scrollable content:", hasScrollableContent);
    }
  };

  const container = scrollContainerRef.current;
  if (container) {
    // Initial check
    handleScroll();
    
    // Add scroll event listener
    container.addEventListener("scroll", handleScroll);
  }

  return () => {
    if (container) {
      container.removeEventListener("scroll", handleScroll);
    }
  };
}, []);


  return (
    <div className="relative w-full bg-[#FDF8E5] min-h-[84vh] flex flex-col">
      {/* Cursor */}
      <div
        ref={cursorRef}
        className="w-12 h-12 border border-[#C5A184] rounded-full fixed top-0 left-0 z-[999] pointer-events-none"
      />
      <div className="text-[#A37159] flex sm:fixed top-12 justify-center items-center w-full ">
          <h1 className="sm:text-[55px] text-[33px] leading-none">About <span className="text-[#C5A184]">Parallel Clinic</span></h1>
        </div>
    <div ref={scrollContainerRef} className="sm:h-[60vh] md:h-[70vh] lg:h-[80vh] sm:mt-10 mt-4 sm:overflow-y-scroll sm:overflow-x-hidden pb-10 hide-scrollbar relative">
       {showButton && (
  <div className="hidden sm:block fixed top-[60%] right-6 z-50 text-center">
    <button
      onClick={() => {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }}
      className="bg-transparent text-[#A37159] "
    >
      Scroll to see more
    </button>
  </div>
)}


      {/* Top Section from AboutClinic2 */}
      <div className="w-[100vw] flex flex-col items-center justify-center">
        
        <div className="w-[90vw] flex flex-col items-center text-center">
          <p style={{ fontFamily: "libre bodoni"}} className="mt-2 sm:text-[30px] text-[25px] text-[#A37159] font-light leading-relaxed">
            Parallel Clinic offers Personalized, Molecular-Targeted,<br />
            Precision Medicine using Natural Pharmaceutical Ingredients (NPIs).
          </p>

          <div style={{ fontFamily: "libre bodoni"}}  className="flex items-center justify-center mt-2 sm:text-[30px] text-[20px] text-[#A37159] font-light text-center leading-snug">
            <span className="lg:text-[80px] sm:text-[120px] text-[150px] leading-none -mt-2">{'{'}</span>
            <p className="mx-4 leading-snug">
              Approximately 90% of all current medications are effective for <br />
              only 30~50% of the patients who take them!
            </p>
            <span className="lg:text-[80px] sm:text-[120px] text-[150px] leading-none -mt-2">{'}'}</span>
          </div>

          <div className="sm:mt-2 mt-4 text-[#A37159] leading-none">
            <h3 style={{ fontFamily: "MyFont" }} className="text-[#A37159] text-[25px] lg:mb-0 mb-4">Parallel Clinic's therapeutic doctrine is founded on Physicians & Patients working in Parallel.</h3>
            <div className="text-[17px] lg:space-y-0.5 gap-4 lg:gap-2  flex flex-col justify-center items-center w-full">
              <p className="w-[100%] leading-0.5">
                Our Molecular-Targeted approach is based on a deep understanding of the molecular pathophysiology of diseases that we treat
              </p>
              <p className="w-[100%] leading-0">
                The NPIs used are selected based on their well-characterized constituents that target specific disease stages at molecular level
              </p>
              <p className="leading-0">
                Safety and efficacy of these NPIs is well-documented in scientific journals of international repute and <br /> these Evidence-based medicines backed by decades of human use experience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - FAQs from AboutClinic */}
      <div className="flex flex-col w-full px-6 sm:px-16 gap-2 flex-grow mt-8 ">
        <div className="text-[#A37159] flex flex-col items-start w-full pl-[2%]">
          <h2 className="text-[#A37159] text-2xl sm:text-3xl font-light pt-2">Information Hub: Your Questions. Our Answers.</h2>
        </div>

        <div className="lg:w-full flex sm:flex-row flex-col gap-7 mt-6 lg:mt-0 text-[#5C8A8A] text-[18px] pb-2 md:pb-30">
          <div className="flex-1 flex flex-col h-[50vh] overflow-y-auto hide-scrollbar">
            <div className="px-6  sm:h-[50vh]  hide-scrollbar">
              {leftFaqs?.map((faq, index) => (
                <div key={index} className="py-2 sm:py-[7px]">
                  <div
                    className={`cursor-pointer text-[#5C8A8A] text-[18px] ${openIndex === index ? "text-[#A37159]" : ""} hover:text-[#A37159] transition flex justify-between w-[100%]`}
                    onClick={() => toggleAnswer(index)}
                  >
                    <div>
                      {index + 1}. {faq.question}
                    </div>
                    <div className="w-[5%] ">
                      {openIndex === index ? (
                        <RiArrowDropDownLine size={30} className="transform rotate-180" />
                      ) : (
                        <RiArrowDropDownLine size={30} className="" />
                      )}
                    </div>
                  </div>
                  {openIndex === index && (
                    <div style={{ marginTop: "8px", color: "#374151", fontSize: "16px" }}>
                      {Array.isArray(faq.answer) ? (
                        faq.answer.map((para, i) => (
                          <p key={i} style={{ marginBottom: "8px", marginLeft: "20px" }}>{para}</p>
                        ))
                      ) : (
                        <p style={{ marginBottom: "8px", marginLeft: "20px" }}>{faq.answer}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="px-6 sm:h-[50vh] hide-scrollbar">
              {rightFaqs.map((faq, index) => {
                const actualIndex = half + index;
                return (
                  <div key={index} className="py-2 sm:py-[7px]">
                    <p
                      className={`cursor-pointer text-[#5C8A8A] text-[18px] ${openIndex === actualIndex ? "text-[#A37159]" : ""} hover:text-[#A37159] transition flex justify-between w-[100%]`}
                      onClick={() => toggleAnswer(actualIndex)}
                    >
                      <div>
                        {actualIndex + 1}. {faq.question}
                      </div>
                      <div className="w-[5%] ">
                        {openIndex === actualIndex ? (
                          <RiArrowDropDownLine size={30} className="transform rotate-180" />
                        ) : (
                          <RiArrowDropDownLine size={30} className="" />
                        )}
                      </div>
                    </p>
                    {openIndex === actualIndex && (
                      <div style={{ marginTop: "8px", color: "#374151", fontSize: "16px" }}>
                        {Array.isArray(faq.answer) ? (
                          faq.answer.map((para, i) => (
                            <p key={i} style={{ marginBottom: "8px", marginLeft: "20px" }}>{para}</p>
                          ))
                        ) : (
                          <p style={{ marginBottom: "8px", marginLeft: "20px" }}>{faq.answer}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* <div className="">Scroll For more</div> */}
          </div>
        </div>
      </div>

     


    </div>

   

      {/* Bottom Text */}
      <div className="sm:fixed sm:bottom-0 sm:left-0 w-full px-4 sm:px-0 flex flex-col items-center text-center z-50 mt-10 mb-30 sm:mb-0 sm:mt-0 bg-[#FDF8E5] ">
        
        <h2 style={{ fontFamily: "libre bodoni" }} className="text-[#A37159] text-2xl sm:text-[30px] font-semibold leading-tight mt-2">
          Making Your Medicine Personal & Precise.
        </h2>
        <h2 style={{ fontFamily: "libre bodoni" }} className="text-[#A37159] text-2xl sm:text-[23px] sm:w-[60%] lg:w-fullfont-bold leading-tight">
          World Class Personalized Targeted Precision Medicine using Natural Pharmaceutical Ingredients
        </h2>
        {/* <h2 style={{ fontFamily: "libre bodoni" }} className="text-[#A37159] text-2xl sm:text-[23px] font-bold leading-tight">
          using Natural Pharmaceutical Ingredients
        </h2> */}
        <p className="text-[#676F75] text-base sm:text-[16px] leading-tight sm:w-[60%] lg:w-full">
          Founded on a Clear Understanding of Molecular Basis of Pathophysiology of Medical Conditions
        </p>
        <p className="text-[#676F75] text-base sm:text-[16px] leading-tight sm:w-[60%] lg:w-full">
          Using Botanical Medicines with Well Documented Molecular Level Mechanisms of Actions
        </p>
        <div className="absolute bottom-4 right-8 text-sm text-gray-700">
          {/* <FaHeadphones size={50} className="text-[#DAA57B]" /> */}
          <NewPlayerGlobal/>
        </div>
      </div>
    </div>
  );
};

export default AboutClinic;


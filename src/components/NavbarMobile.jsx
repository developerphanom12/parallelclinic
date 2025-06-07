import { IoMenu, IoClose } from "react-icons/io5";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

export default function NavbarMobile({ open, setOpen }) {
  const menuRef = useRef(null);
  const navItemsRef = useRef([]);
  const navigate = useNavigate();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About Parallel Clinic", path: "/about" },
    { label: "Medical Conditions", path: "/medicalconditions" },
    { label: "Join Parallel Clinic Team", path: "/joinparallelclinic" },
  ];

  useEffect(() => {
    if (open) {
      gsap.fromTo(menuRef.current, { x: "100%" }, { x: "0%", duration: 0.4 });
      gsap.fromTo(
        navItemsRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.2 }
      );
    } else {
      gsap.to(menuRef.current, { x: "100%", duration: 0.3 });
    }
  }, [open]);

  const handleNav = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <nav className="relative z-50">
      <div
        ref={menuRef}
        style={{ fontFamily: "MyFontNavbar" }}
        className="fixed top-0 right-0 h-full w-[75%] sm:w-[60%] bg-[#5C4033] text-white translate-x-full lg:hidden z-[999]"
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <IoClose
            size={32}
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          />
        </div>

        <ul className="flex flex-col text-right items-end gap-6 px-6 text-2xl font-medium mt-10">
          {navLinks.map((link, idx) => (
            <li
              key={link.label}
              ref={(el) => (navItemsRef.current[idx] = el)}
              onClick={() => handleNav(link.path)}
              className="cursor-pointer"
            >
              {link.label}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

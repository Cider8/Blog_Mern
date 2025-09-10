// import { useEffect, useState } from "react";

// export default function DarkModeToggle() {
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("theme") === "dark"
//   );

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [darkMode]);

//   return (
//     <button
//       onClick={() => setDarkMode(!darkMode)}
//       className="px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900"
//     >
//       {darkMode ? "☀️ Light" : "🌙 Dark"}
//     </button>
//   );
// }

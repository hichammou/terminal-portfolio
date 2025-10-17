const heading = `
╔══════════════════════════════════════════════╗
║            MY EDUCATION BACKGROUND           ║
╚══════════════════════════════════════════════╝
`;

function Education() {
  return (
    <div>
      <pre className="font-jetbrains bg-gradient-to-r from-red to-indigo-500 bg-clip-text text-transparent">
        {heading}
      </pre>
      <ul className="mt-2 space-y-3">
        <li className="flex flex-col">
          <span className="text-red">
            Specialized Technician Diploma in web development | 2022 ~ 2024
          </span>
          <span>Mixed Vocational Training Center, Agadir</span>
        </li>

        <li className="flex flex-col">
          <span className="text-red">
            University Diploma of Technology in Bio-Industrial Engineering |
            2018 ~ 2021
          </span>
          <span> Higher School of Technology, Agadir</span>
        </li>
        <li className="flex flex-col">
          <span className="text-red">
            Baccalaureate in Physical Sciences | 2018
          </span>
          <span>Argan Highschool, Tiznit</span>
        </li>
      </ul>
    </div>
  );
}

export default Education;

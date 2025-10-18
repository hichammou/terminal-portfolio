const heading = `
╔══════════════════════════════════════════════╗
║                 MY SKILLS                    ║
╚══════════════════════════════════════════════╝
`;

const skills = `
💻 LANGUAGES
────────────
JS    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  JavaScript
TS    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  TypeScript
PY    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  Python
go    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  Go
PHP   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  PHP

⚙️  FRAMEWORKS
──────────────
REACT     ⚛️   React / React Native
NEXTJS    ▶️   Next.js
NODEJS    🌿   Node.js / Express
Laravel   🎵   Laravel PHP

🗄️ DATABASES
─────────────
MONGODB   🍃   NoSQL Document DB
MYSQL     🐬   Relational SQL DB
POSTGRES  🐘   SQL Object-Relational DB

🌐 NETWORKING
──────────────
TCP/IP     📡   Core Internet Protocols
DNS        🌍   Domain Name System
HTTP/HTTPS 🔒   Web Communication
SSH        🔐   Secure Remote Access
NAT        🔄   Network Address Translation
DHCP       🧠   Dynamic Host Configuration Protocol
NGINX      ⚙️   Reverse Proxy / Load Balancer

🐳 DEVOPS
──────────
DOCKER    🐋   Docker
GITHUB    🧩   GitHub Actions
LINUX     🐧   Linux VPS Deployments

📦 TOOLS
────────
VSCODE    💼   VS Code
POSTMAN   📬   API Testing
GIT       🔧   Version Control
`;

function Skills() {
  return (
    <div className="space-y-2">
      <pre className="font-jetbrains bg-gradient-to-r from-blue from-20% to-pink-light to-80% bg-clip-text text-transparent">
        {heading}
      </pre>
      <pre className="font-jetbrains">{skills}</pre>
    </div>
  );
}

export default Skills;

import { FaEnvelope, FaGithub, FaLinkedin} from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold mb-6" style={{ color: "var(--brand)" }}>Contact</h1>
      <p className="mb-8" style={{ color: "var(--muted)" }}>
        Feel free to reach out for collaboration, research discussions, or just to say hello!
      </p>
      <div className="space-y-4">
        <a 
          href="mailto:brunson@example.com" 
          className="flex items-center gap-3 p-4 rounded-xl card card-hover transition"
        >
          <FaEnvelope className="text-xl" style={{ color: "var(--brand)" }} />
          <span style={{ color: "var(--text)" }}>brunson@example.com</span>
        </a>
        <a 
          href="https://github.com/Brunson" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl card card-hover transition"
        >
          <FaGithub className="text-xl" style={{ color: "var(--brand)" }} />
          <span style={{ color: "var(--text)" }}>github.com/Brunson</span>
        </a>
        <a 
          href="https://www.linkedin.com/in/brunson" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl card card-hover transition"
        >
          <FaLinkedin className="text-xl" style={{ color: "var(--brand)" }} />
          <span style={{ color: "var(--text)" }}>linkedin.com/in/brunson</span>
        </a>
      </div>
    </main>
  );
}



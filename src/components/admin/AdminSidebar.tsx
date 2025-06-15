
import { User2, FileText, Workflow, Bell, ListTodo } from "lucide-react";

export function AppSidebar({ sections, activeSection, onSectionChange }) {
  return (
    <aside className="bg-white shadow-md w-64 min-h-screen flex flex-col">
      <div className="px-4 py-6 font-bold text-lg border-b text-blue-800">
        Admin Digital
      </div>
      <nav className="mt-4 flex-1">
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                className={`w-full flex items-center gap-2 px-4 py-2 rounded font-medium text-left transition ${
                  activeSection === section.id
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-blue-50"
                }`}
                onClick={() => onSectionChange(section.id)}
              >
                {section.id === "content" && <FileText />}
                {section.id === "employees" && <User2 />}
                {section.id === "workflow" && <Workflow />}
                {section.id === "notifications" && <Bell />}
                {section.id === "tasks" && <ListTodo />}
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

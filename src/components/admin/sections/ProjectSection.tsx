
import { useState } from "react";
import DesignLayoutEditor from "./DesignSection/DesignLayoutEditor";
import DesignLogoEditor from "./DesignSection/DesignLogoEditor";
import DesignColorsEditor from "./DesignSection/DesignColorsEditor";
import DesignCarouselEditor from "./DesignSection/DesignCarouselEditor";
import CatalogSection from "./ProjectSection/CatalogSection";

const MAIN_MENUS = [
  { id: "project-layout", label: "Layout" },
  {
    id: "project-catalog",
    label: "Catálogo",
    children: [
      { id: "catalog-piscinas", label: "Piscinas" },
      { id: "catalog-banheiras", label: "Banheiras" },
      { id: "catalog-spa", label: "Spas" },
      { id: "catalog-equipamentos", label: "Equipamentos" },
    ]
  },
  { id: "project-logo", label: "Logo" },
  { id: "project-colors", label: "Cores do Site" },
  { id: "project-carousel", label: "Imagens do Carrossel" },
];

export function ProjectSection() {
  const [activeMain, setActiveMain] = useState("project-layout");
  const [activeCatalog, setActiveCatalog] = useState<string>("catalog-piscinas");

  return (
    <div>
      <div className="flex gap-3 mb-6 flex-wrap">
        {MAIN_MENUS.map(menu =>
          menu.children ? (
            <div className="relative group" key={menu.id}>
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeMain === menu.id
                    ? "bg-aqua text-white shadow"
                    : "bg-slate-100 text-premium-black hover:bg-aqua-light"
                }`}
                onClick={() => setActiveMain(menu.id)}
                type="button"
              >
                {menu.label}
              </button>
              {/* Submenu drop */}
              <div className={`absolute z-10 bg-white border shadow-lg rounded-lg mt-1 left-0 w-44
                ${activeMain === menu.id ? "block" : "hidden"} group-hover:block`}
              >
                {menu.children.map(child => (
                  <button
                    className={`block w-full text-left px-4 py-2 transition-all ${
                      activeCatalog === child.id
                        ? "bg-aqua text-white"
                        : "hover:bg-aqua-light"
                    }`}
                    key={child.id}
                    onClick={() => {
                      setActiveCatalog(child.id);
                      setActiveMain(menu.id);
                    }}
                    type="button"
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              key={menu.id}
              type="button"
              onClick={() => setActiveMain(menu.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeMain === menu.id
                  ? "bg-aqua text-white shadow"
                  : "bg-slate-100 text-premium-black hover:bg-aqua-light"
              }`}
            >
              {menu.label}
            </button>
          )
        )}
      </div>
      <div className="bg-white rounded-xl shadow-soft p-6 max-w-3xl mx-auto min-h-[320px]">
        {activeMain === "project-layout" && <DesignLayoutEditor />}
        {activeMain === "project-logo" && <DesignLogoEditor />}
        {activeMain === "project-colors" && <DesignColorsEditor />}
        {activeMain === "project-carousel" && <DesignCarouselEditor />}
        {activeMain === "project-catalog" && (
          <CatalogSection activeCatalog={activeCatalog} />
        )}
      </div>
    </div>
  );
}

export default ProjectSection;

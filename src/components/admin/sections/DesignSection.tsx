
import { useState } from "react";
import DesignLogoEditor from "./DesignSection/DesignLogoEditor";
import DesignLayoutEditor from "./DesignSection/DesignLayoutEditor";
import DesignColorsEditor from "./DesignSection/DesignColorsEditor";
import DesignCarouselEditor from "./DesignSection/DesignCarouselEditor";

const designMenus = [
  { id: "design-logo", label: "Logo" },
  { id: "design-layout", label: "Layout" },
  { id: "design-colors", label: "Cores do Site" },
  { id: "design-carousel", label: "Imagens do Carrossel" },
];

export function DesignSection() {
  const [activeMenu, setActiveMenu] = useState(designMenus[0].id);

  return (
    <div>
      <div className="flex gap-3 mb-6">
        {designMenus.map((menu) => (
          <button
            key={menu.id}
            type="button"
            onClick={() => setActiveMenu(menu.id)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeMenu === menu.id
                ? "bg-aqua text-white shadow"
                : "bg-slate-100 text-premium-black hover:bg-aqua-light"
            }`}
          >
            {menu.label}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-soft p-6 max-w-2xl mx-auto min-h-[320px]">
        {activeMenu === "design-logo" && <DesignLogoEditor />}
        {activeMenu === "design-layout" && <DesignLayoutEditor />}
        {activeMenu === "design-colors" && <DesignColorsEditor />}
        {activeMenu === "design-carousel" && <DesignCarouselEditor />}
      </div>
    </div>
  );
}

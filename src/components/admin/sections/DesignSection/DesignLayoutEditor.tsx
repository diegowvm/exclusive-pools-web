
import { useState } from "react";
export default function DesignLayoutEditor() {
  // Simulação dos layouts disponíveis
  const [layout, setLayout] = useState("layout1");
  const [changed, setChanged] = useState(false);

  function handleChange(val: string) {
    setLayout(val);
    setChanged(true);
  }
  function handleSave() {
    setChanged(false);
    // Salvar modificação no backend!
  }
  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Escolher layout do site</h3>
      <div className="flex gap-5 mb-5">
        <label>
          <input type="radio" checked={layout === "layout1"} onChange={() => handleChange("layout1")} />
          <span className="ml-2">Layout Clássico</span>
        </label>
        <label>
          <input type="radio" checked={layout === "layout2"} onChange={() => handleChange("layout2")} />
          <span className="ml-2">Layout Moderno</span>
        </label>
      </div>
      <button
        onClick={handleSave}
        className={`px-5 py-2 rounded-lg font-semibold bg-aqua text-white transition-all ${changed ? "" : "opacity-70 cursor-not-allowed"}`}
        disabled={!changed}
      >Salvar Alterações</button>
    </div>
  );
}

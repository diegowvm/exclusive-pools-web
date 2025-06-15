
import { useState } from "react";
export default function DesignColorsEditor() {
  const [primary, setPrimary] = useState("#00cfc1");
  const [secondary, setSecondary] = useState("#99f6e4");
  const [changed, setChanged] = useState(false);

  function handleSave() {
    setChanged(false);
    // Aqui você salvaria as cores no backend ou contexto global
  }
  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Editar cores principais</h3>
      <div className="flex gap-6 mb-5">
        <div>
          <label className="block font-semibold mb-1">Cor principal</label>
          <input type="color" value={primary} onChange={e => { setPrimary(e.target.value); setChanged(true); }} className="w-12 h-12 rounded border" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Cor secundária</label>
          <input type="color" value={secondary} onChange={e => { setSecondary(e.target.value); setChanged(true); }} className="w-12 h-12 rounded border" />
        </div>
      </div>
      <button
        onClick={handleSave}
        className={`px-5 py-2 rounded-lg font-semibold bg-aqua text-white transition-all ${changed ? "" : "opacity-70 cursor-not-allowed"}`}
        disabled={!changed}
      >Salvar Alterações</button>
    </div>
  );
}

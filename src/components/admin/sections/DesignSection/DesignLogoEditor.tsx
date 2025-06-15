
import { useState } from "react";
export default function DesignLogoEditor() {
  const [logo, setLogo] = useState("/lovable-uploads/placeholder-logo.png");
  const [preview, setPreview] = useState(logo);
  const [changed, setChanged] = useState(false);

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setChanged(true);
    }
  }

  function handleSave() {
    setLogo(preview);
    setChanged(false);
    // Aqui se conectaria ao backend para salvar!
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Editar Logo</h3>
      <div className="flex items-center gap-4 mb-4">
        <img src={preview} alt="Logo atual" className="h-20 w-20 object-contain bg-slate-50 rounded-lg border" />
        <input type="file" accept="image/*" onChange={handleLogoChange} className="block" />
      </div>
      <button
        onClick={handleSave}
        className={`mt-3 px-5 py-2 rounded-lg font-semibold bg-aqua text-white transition-all ${changed ? "" : "opacity-70 cursor-not-allowed"}`}
        disabled={!changed}
      >
        Salvar Alterações
      </button>
    </div>
  );
}

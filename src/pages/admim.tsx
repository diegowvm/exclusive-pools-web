import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://knrsjxphbczcfzamiawj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtucnNqeHBoYmN6Y2Z6YW1pYXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MjA0OTUsImV4cCI6MjA2NTM5NjQ5NX0.R9ZtGqB1uHhKWKqffqMLH-SQFnrEpUB_gd22SUCrf6w"
);

export default function AdminPanel() {
  const [isLogged, setIsLogged] = useState(false);
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    valor: "",
    imagem_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [editando, setEditando] = useState(false);

  // Login simples
  function login(e) {
    e.preventDefault();
    const user = e.target.user.value;
    const pass = e.target.pass.value;
    if (user === "admimexclusive" && pass === "piscinas123") {
      setIsLogged(true);
    } else {
      alert("Login inválido");
    }
  }

  useEffect(() => {
    if (isLogged) {
      loadContent();
    }
  }, [isLogged]);

  async function loadContent() {
    const { data, error } = await supabase
      .from("conteudo_site")
      .select("*")
      .single();
    if (data) setForm(data);
    if (error) console.error(error);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("conteudo_site")
      .update(form)
      .eq("id", form.id);
    setLoading(false);
    if (error) return alert("Erro ao salvar: " + error.message);
    alert("Dados atualizados com sucesso!");
    setEditando(false);
  }

  async function uploadImage(e) {
    const file = e.target.files[0];
    const filename = Date.now() + "-" + file.name;
    const { data, error } = await supabase.storage
      .from("imagens")
      .upload(filename, file);
    if (error) return alert("Erro ao enviar imagem");
    const { data: url } = supabase.storage
      .from("imagens")
      .getPublicUrl(filename);
    setForm({ ...form, imagem_url: url.publicUrl });
  }

  if (!isLogged) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <form
          onSubmit={login}
          className="bg-white p-6 rounded shadow-md w-80 space-y-4"
        >
          <h1 className="text-xl font-bold text-center">Painel Admin</h1>
          <input
            name="user"
            placeholder="Usuário"
            className="w-full p-2 border rounded"
          />
          <input
            name="pass"
            placeholder="Senha"
            type="password"
            className="w-full p-2 border rounded"
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Painel de Administração</h1>

      <div className="bg-white p-6 rounded shadow-md space-y-4">
        <img
          src={form.imagem_url}
          alt="Imagem atual"
          className="w-full max-h-80 object-cover rounded"
        />
        <input type="file" onChange={uploadImage} className="w-full" />

        <input
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          className="w-full border p-2 rounded"
          placeholder="Título"
        />
        <textarea
          value={form.descricao}
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          className="w-full border p-2 rounded"
          placeholder="Descrição"
        />
        <input
          value={form.valor}
          onChange={(e) => setForm({ ...form, valor: e.target.value })}
          className="w-full border p-2 rounded"
          placeholder="Valor"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-500 text-white p-2 px-4 rounded hover:bg-green-600"
        >
          {loading ? "Salvando..." : "Salvar alterações"}
        </button>
      </div>
    </div>
  );
}

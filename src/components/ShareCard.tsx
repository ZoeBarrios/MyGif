import { toast } from "react-toastify";
export default function ShareCard(urlObjecto: { url: string }) {
  const { url } = urlObjecto;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success("Copiado al portapapeles");
  };
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-white text-black p-10 rounded">
        <input
          value={url}
          readOnly={true}
          className="py-2 w-48 rounded border border-black mb-2"
        />
        <button
          onClick={handleCopy}
          className="block mx-auto bg-blue-500 rounded px-2"
        >
          Copy
        </button>
      </div>
    </div>
  );
}

"use client";
import React, { useRef, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Download } from "lucide-react";

interface Guest {
  name: string;
  diaperSize: string;
}

interface InviteCardProps {
  guest: Guest;
  event: {
    date: string;
    location: string;
  };
}

const diaperSizes = ["RN", "P", "M", "G", "XG", "XXG"];

const InviteCard: React.FC<InviteCardProps> = ({ guest, event }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadAsImage = async () => {
    if (!cardRef.current) return;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `convite_cha_de_bebe_${guest.name}.png`;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <div>
      <div
        ref={cardRef}
        className="w-96 h-[800px] mx-auto my-8 relative bg-transparent rounded-t-full overflow-hidden"
      >
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#faf7f2]/80 to-transparent z-[5]" />

        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('/banner.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 1,
          }}
        />

        <div className="relative h-full p-8 flex flex-col items-center justify-between">
          <div className="text-center space-y-4 mt-32">
            <h2 className="text-4xl font-bold text-[#6d5a43] font-serif mb-6">
              Chá do Luiz Otávio
            </h2>
            <p className="text-2xl text-[#6d5a43] font-serif font-bold">
              Olá, {guest.name}!
            </p>
          </div>

          <div className="mt-3 text-center space-y-6 bg-[#faf7f2]/90 p-8 rounded-2xl shadow-md w-80 mx-auto">
            <p className="text-[#6d5a43] text-xl font-bold">
              A vida esta preste a ficar ainda mais alegre! <br/> venha celebrar conosco!
            </p>

            <div className="space-y-3">
              <p className="font-semibold text-[#6d5a43]">Data:</p>
              <p className="text-[#6d5a43] text-xl font-medium">{event.date}</p>

              <p className="font-semibold text-[#6d5a43] mt-4">Local:</p>
              <p className="text-[#6d5a43] text-xl font-medium">{event.location}</p>
            </div>

            <div className="mt-6 bg-[#6d5a43]/10 p-2 rounded-lg text-xl">
              <p className="text-[#6d5a43] font-medium">
                Sugestão de presente: <b>fralda</b> tamanho:
                <span className="font-bold ml-2 text-[#8b7355]">
                  {guest.diaperSize}
                </span><br/>
                + um <b>mimo</b>!
              </p>
            </div>
          </div>

          <p className="text-[#8b7355] text-sm mt-4 italic font-bold">
            Sua presença é muito especial para nós!
          </p>
        </div>
      </div>
      <div className=" flex flex-col items-center gap-3 z-10 px-4">
        <Button
          onClick={downloadAsImage}
          className="font-serif w-full max-w-[280px] bg-[#6d5a43]/90 hover:bg-[#6d5a43] text-white rounded-full py-6 flex items-center justify-center gap-2 backdrop-blur-sm transition-all duration-300 shadow-lg"
        >
          <Download size={20} />
          Baixar Convite
        </Button>
      </div>
    </div>
  );
};

const InviteGenerator: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [newGuest, setNewGuest] = useState<Guest>({
    name: "",
    diaperSize: "P",
  });
  const event = {
    date: "8 de Fevereiro às 16:00",
    location: "A Rua professora Maria Flora Pausewang - Salão 2, Trindade, Florianópolis - SC, 88036-020",
  };

  const addGuest = () => {
    if (newGuest.name.trim()) {
      setGuests([...guests, newGuest]);
      setNewGuest({ name: "", diaperSize: "P" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 space-y-6 bg-[#faf7f2]/95 p-8 rounded-2xl shadow-md">
        <h1 className="text-4xl font-bold text-[#6d5a43] text-center font-serif">
          Gerador de Convites - Chá de Bebê
        </h1>

        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Nome do convidado"
            value={newGuest.name}
            onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
            className="border-[#6d5a43] focus:ring-[#6d5a43] text-lg font-serif"
          />
          <select
            className="border rounded-lg p-3 text-[#6d5a43] border-[#6d5a43] bg-white/80 text-lg font-serif"
            value={newGuest.diaperSize}
            onChange={(e) =>
              setNewGuest({ ...newGuest, diaperSize: e.target.value })}
          >
            {diaperSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <Button
            onClick={addGuest}
            className="bg-[#6d5a43] hover:bg-[#8b7355] text-white font-medium text-lg py-6 font-serif"
          >
            Adicionar Convidado
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {guests.map((guest, index) => (
          <InviteCard key={index} guest={guest} event={event} />
        ))}
      </div>
    </div>
  );
};

export default InviteGenerator;

import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function MobileWhatsAppButton() {
  const whatsappUrl = buildWhatsAppUrl({ type: "general" });

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#C9A24A] px-5 py-4 text-sm font-bold text-[#0B0B0B] shadow-xl shadow-black/20 transition hover:bg-[#E6C875] lg:hidden"
    >
      <MessageCircle size={20} />
      WhatsApp
    </a>
  );
}
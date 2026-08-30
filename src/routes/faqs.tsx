import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/faqs")({
  component: FAQsPage,
});

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  category: string;
  items: FAQItem[];
};

const FAQ_DATA: FAQCategory[] = [
  {
    category: "Orders & Delivery",
    items: [
      {
        question: "How long does nationwide delivery take in Pakistan?",
        answer:
          "Domestic deliveries within major cities (Lahore, Karachi, Islamabad, Rawalpindi) typically take 2-4 business days. Other cities across Pakistan take 3-5 business days via TCS or Leopard courier.",
      },
      {
        question: "Do you offer free delivery?",
        answer:
          "Yes! FREE delivery is automatically unlocked on all nationwide orders above PKR 3,000.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, NOORÉ ships worldwide via DHL Express. International delivery takes 6-9 business days.",
      },
    ],
  },
  {
    category: "Fabric & Collections",
    items: [
      {
        question: "What is included in an unstitched 3-piece lawn suit?",
        answer:
          "Each 3-piece unstitched lawn suit includes 3.0 meters printed/embroidered lawn shirt fabric, 2.5 meters dyed trouser fabric, and 2.5 meters chiffon, organza or silk dupatta, along with embroidered necklines or hem borders.",
      },
      {
        question: "How do I care for embroidered chiffon and silk garments?",
        answer:
          "We recommend dry cleaning all embellished, chiffon, and silk garments to preserve thread integrity and color brilliance.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        question: "What is your return & exchange policy?",
        answer:
          "We offer a 7-day hassle-free exchange policy for any unused item with original tags intact. If you receive a damaged or incorrect piece, our team will exchange it free of charge.",
      },
      {
        question: "How do I initiate an exchange?",
        answer:
          "Contact customer support via WhatsApp at +92 300 1234567 or email care@noore.pk with your order reference number.",
      },
    ],
  },
  {
    category: "Payments",
    items: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept Cash on Delivery (COD) across Pakistan, Visa & Mastercard debit/credit cards, and mobile wallet payments via JazzCash and Easypaisa.",
      },
    ],
  },
];

function FAQsPage() {
  const [openItems, setOpenItems] = useState<string[]>(["Orders & Delivery-0"]);

  const toggleItem = (key: string) => {
    setOpenItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-14 space-y-12">
      <div className="text-center space-y-2">
        <span className="label-eyebrow text-accent">FREQUENTLY ASKED QUESTIONS</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground uppercase">
          Got Questions? We Have Answers.
        </h1>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Find instant answers to common questions about orders, fabrics, sizing, shipping and returns.
        </p>
      </div>

      <div className="space-y-10">
        {FAQ_DATA.map((catGroup) => (
          <div key={catGroup.category} className="space-y-4">
            <h2 className="font-serif text-2xl text-primary border-b border-border pb-2 uppercase">
              {catGroup.category}
            </h2>

            <div className="divide-y divide-border border border-border bg-[var(--ivory)]">
              {catGroup.items.map((item, idx) => {
                const key = `${catGroup.category}-${idx}`;
                const isOpen = openItems.includes(key);

                return (
                  <div key={idx} className="p-4">
                    <button
                      type="button"
                      onClick={() => toggleItem(key)}
                      className="flex w-full items-center justify-between text-left text-xs font-semibold text-foreground uppercase tracking-wider"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle size={15} className="text-accent shrink-0" />
                        {item.question}
                      </span>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {isOpen && (
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground pl-6">
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

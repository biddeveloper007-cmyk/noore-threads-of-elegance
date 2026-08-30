import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 sm:py-14 space-y-12">
      <div className="border-b border-border pb-8 text-center sm:text-left">
        <span className="label-eyebrow text-accent">WE ARE HERE FOR YOU</span>
        <h1 className="font-serif text-3xl tracking-tight text-foreground sm:text-5xl uppercase">
          Help &amp; Support
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl">
          Have a question about fabric, sizing, order tracking or custom styling? Contact our dedicated customer care team.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact Info & Flagships */}
        <div className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="border border-border bg-[var(--ivory)] p-5 space-y-2">
              <MessageCircle className="h-6 w-6 text-accent" />
              <h3 className="text-xs font-semibold uppercase">WhatsApp</h3>
              <p className="text-[0.7rem] text-muted-foreground">+92 300 1234567</p>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-[0.65rem] font-bold text-primary underline uppercase"
              >
                Chat Now
              </a>
            </div>

            <div className="border border-border bg-[var(--ivory)] p-5 space-y-2">
              <Mail className="h-6 w-6 text-accent" />
              <h3 className="text-xs font-semibold uppercase">Email</h3>
              <p className="text-[0.7rem] text-muted-foreground">care@noore.pk</p>
              <a
                href="mailto:care@noore.pk"
                className="inline-block text-[0.65rem] font-bold text-primary underline uppercase"
              >
                Send Email
              </a>
            </div>

            <div className="border border-border bg-[var(--ivory)] p-5 space-y-2">
              <Phone className="h-6 w-6 text-accent" />
              <h3 className="text-xs font-semibold uppercase">Phone</h3>
              <p className="text-[0.7rem] text-muted-foreground">+92 42 345 6789</p>
              <span className="text-[0.65rem] text-muted-foreground">Mon-Sat: 10am-7pm</span>
            </div>
          </div>

          {/* Flagship Locations */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl uppercase border-b border-border pb-3">
              Flagship Stores
            </h2>

            <div className="space-y-4 text-xs">
              <div className="border border-border bg-card p-4 flex gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <h4 className="font-semibold uppercase text-foreground">Lahore Flagship Boutique</h4>
                  <p className="text-muted-foreground mt-0.5">MM Alam Road, Gulberg III, Lahore, Pakistan</p>
                  <p className="text-muted-foreground">Timing: 11:00 AM - 9:30 PM (Daily)</p>
                </div>
              </div>

              <div className="border border-border bg-card p-4 flex gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <h4 className="font-semibold uppercase text-foreground">Karachi Studio</h4>
                  <p className="text-muted-foreground mt-0.5">Zamzama Commercial Area, Phase V, DHA, Karachi</p>
                  <p className="text-muted-foreground">Timing: 11:30 AM - 10:00 PM (Daily)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <Reveal>
          <div className="border border-border bg-[var(--ivory)] p-6 sm:p-8 space-y-6">
            <h2 className="font-serif text-2xl uppercase border-b border-border pb-3">
              Send Us A Message
            </h2>

            {submitted ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                <h3 className="font-serif text-xl">Message Sent Successfully</h3>
                <p className="text-xs text-muted-foreground">
                  Thank you for reaching out. Our customer care team will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs label-eyebrow text-foreground mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-border bg-card px-3 py-2.5 text-xs focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs label-eyebrow text-foreground mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-border bg-card px-3 py-2.5 text-xs focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs label-eyebrow text-foreground mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Order Inquiry, Styling advice, etc."
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-border bg-card px-3 py-2.5 text-xs focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs label-eyebrow text-foreground mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-border bg-card px-3 py-2.5 text-xs focus:border-primary focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary py-3.5 text-xs tracking-[0.2em] text-primary-foreground uppercase hover:bg-[var(--emerald-dark)]"
                >
                  SUBMIT INQUIRY
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

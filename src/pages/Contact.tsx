import { useState } from "react";
import { StaticPageLayout } from "@/components/site/StaticPageLayout";
import { toast } from "sonner";
import { Mail, MessageSquare, MapPin } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`InstantTool message from ${name || "Visitor"}`);
    const body = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
    window.location.href = `mailto:hello@instanttool.in?subject=${subject}&body=${body}`;
    toast.success("Opening your email app…");
  };

  return (
    <StaticPageLayout
      title="Contact InstantTool.in – Get in Touch"
      description="Contact the InstantTool.in team for feedback, partnerships, bug reports or feature requests."
      canonical="/contact"
      h1="Contact Us"
    >
      <p>
        We love hearing from our users. Whether you spotted a bug, want a new
        calculator added, or just want to say hi — reach out using the form
        below or any of the channels listed.
      </p>

      <div className="not-prose grid gap-3 sm:grid-cols-3 my-6">
        {[
          { icon: Mail, label: "Email", value: "hello@instanttool.in" },
          { icon: MessageSquare, label: "Support", value: "support@instanttool.in" },
          { icon: MapPin, label: "Location", value: "Bengaluru, India" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-primary"><Icon className="h-4 w-4" /><span className="text-xs font-bold uppercase tracking-wider">{label}</span></div>
            <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="not-prose grid gap-3 mt-6">
        <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name"
          className="rounded-lg border border-border bg-background px-4 py-3 text-sm" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Your email"
          className="rounded-lg border border-border bg-background px-4 py-3 text-sm" />
        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} required placeholder="Your message" rows={6}
          className="rounded-lg border border-border bg-background px-4 py-3 text-sm" />
        <button type="submit" className="rounded-lg gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-95">
          Send Message
        </button>
      </form>
    </StaticPageLayout>
  );
};

export default Contact;

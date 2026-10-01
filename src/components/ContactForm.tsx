import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { DUR, EASE, VIEWPORT, staggerParent } from "@/lib/motion";

interface ContactFormProps {
  hideTitle?: boolean;
}

const fieldVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
};

export const ContactForm = ({ hideTitle }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<{ type: "" | "success" | "error"; message: string }>({
    type: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    setSending(true);
    try {
      const response = await fetch("https://formspree.io/f/mpwqynrn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message.");
      }
    } catch {
      setStatus({ type: "error", message: "Failed to send message. Try again later." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!hideTitle && <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>}
      <motion.form
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={staggerParent(0.07)}
        onSubmit={handleSubmit}
        className="space-y-6"
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={fieldVariants}>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              required
            />
          </motion.div>
          <motion.div variants={fieldVariants}>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              required
            />
          </motion.div>
        </div>

        <motion.div variants={fieldVariants}>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number (Optional)
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
          />
        </motion.div>

        <motion.div variants={fieldVariants}>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
            required
          />
        </motion.div>

        <motion.div variants={fieldVariants}>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={(event) => setFormData({ ...formData, message: event.target.value })}
            required
          />
        </motion.div>

        <AnimatePresence>
          {status.message && (
            <motion.div
              key={status.message}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DUR.fast, ease: EASE }}
              role="status"
              aria-live="polite"
              className={`p-3 text-center rounded-md border text-sm ${
                status.type === "success"
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                  : "bg-destructive/10 text-destructive border-destructive/30"
              }`}
            >
              {status.message}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={fieldVariants}>
          <Button type="submit" className="w-full" disabled={sending}>
            {sending ? "Sending…" : "Send Message"}
          </Button>
        </motion.div>
      </motion.form>
    </div>
  );
};

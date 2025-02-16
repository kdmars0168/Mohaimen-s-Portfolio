import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface ContactFormProps {
  hideTitle?: boolean;
}

export const ContactForm = ({ hideTitle }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields.',
      });
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/mpwqynrn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error('Failed to send message.');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Try again later.',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!hideTitle && (
        <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
      )}
      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number (Optional)
          </label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="message"
            rows={6}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          />
        </div>

        {/* Success / Error Messages */}
        {status.message && (
          <div
            className={`p-3 text-center rounded-md ${
              status.type === 'success'
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {status.message}
          </div>
        )}

        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </motion.form>
    </div>
  );
};

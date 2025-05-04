import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SplineScene from "./SplineScene";

const ContactSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We'll get back to you as soon as possible.",
      });
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get in <span className="text-neon">Touch</span>
            </h2>
            <p className="text-gray-400 mb-8">
              Have questions about our AI trading platform? Our team is here to
              help you maximize your trading potential.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-dark-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-neon" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Email Us</h3>
                  <p className="text-gray-400">support@tradescribeai.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-dark-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-neon" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Call Us</h3>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-dark-100 p-3 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-neon" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Live Chat</h3>
                  <p className="text-gray-400">Available 24/7 for Pro users</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -z-10 w-64 h-64 bg-neon/20 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="bg-dark-100 border border-white/10 rounded-xl p-8 relative">
              <h3 className="text-xl font-semibold text-white mb-6">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    className="bg-dark-200 border-white/10 focus:border-neon"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    className="bg-dark-200 border-white/10 focus:border-neon"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    className="bg-dark-200 border-white/10 focus:border-neon min-h-[120px]"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-neon text-dark-300 hover:bg-neon/80"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-dark-300 border-r-transparent animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Phone, Mail, CheckCircle, ArrowRight } from "lucide-react";

const bookingSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  serviceType: z.string().min(1, "Please select a service type"),
  poolSize: z.string().optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  postalCode: z.string().optional(),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const serviceTypes = ["New Pool Construction", "Pool Renovation", "Weekly Maintenance", "Equipment Repair", "Fibreglass Repairs", "Marbelite Repairs", "Eco-Friendly Solutions", "Pool Safety Systems", "Heating Solutions", "Automation Systems", "Water Features", "Tiling & Coping"];
const poolSizes = ["Small (< 20m²)", "Medium (20-40m²)", "Large (40-60m²)", "Extra Large (> 60m²)", "Not Sure"];

const whyUs = [
  "15+ years of industry experience",
  "Fully licensed and insured",
  "Free consultations and quotes",
  "Eco-friendly and sustainable options",
  "24/7 emergency support",
  "Competitive pricing and financing options",
];

export default function Booking() {
  const [formData, setFormData] = useState({ customerName: "", email: "", phone: "", serviceType: "", poolSize: "", address: "", city: "", postalCode: "", preferredDate: "", preferredTime: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const fieldName = e.target.name;
    setFormData({ ...formData, [fieldName]: e.target.value });
    if (validationErrors[fieldName]) {
      setValidationErrors(prev => { const n = { ...prev }; delete n[fieldName]; return n; });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setValidationErrors({});
    try {
      const validatedData = bookingSchema.parse(formData);
      const response = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(validatedData) });
      if (!response.ok) throw new Error("Failed to submit booking");
      toast.success("Booking Submitted Successfully!", { description: "We'll contact you shortly to confirm your appointment.", duration: 5000 });
      setIsSuccess(true);
      setFormData({ customerName: "", email: "", phone: "", serviceType: "", poolSize: "", address: "", city: "", postalCode: "", preferredDate: "", preferredTime: "", message: "" });
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        err.errors.forEach(e => { if (e.path[0]) errors[e.path[0].toString()] = e.message; });
        setValidationErrors(errors);
        toast.error("Validation Error", { description: "Please check the form and fix any errors.", duration: 4000 });
      } else {
        toast.error("Booking Failed", { description: "Unable to submit your booking. Please try again or contact us directly.", duration: 5000 });
        setError("Failed to submit booking. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const field = (key: string) => validationErrors[key] ? "border-red-400 focus:border-red-400" : "border-slate-200 dark:border-slate-700";

  return (
    <section id="contact" className="py-28 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 mb-4 block">
            Book an Appointment
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
            Ready to Get Started?
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-fuchsia-500 bg-clip-text text-transparent">
              Let&apos;s Make It Happen
            </span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Schedule a free consultation. We&apos;ll visit your property, discuss your vision
            and provide a detailed quote.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">

          {/* Form — takes 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Book Your Consultation</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">We&apos;ll get back to you within 24 hours</p>
              </div>

              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-fuchsia-50 dark:bg-fuchsia-950/30 border border-fuchsia-200 dark:border-fuchsia-800 rounded-2xl flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400 flex-shrink-0" />
                  <p className="text-fuchsia-800 dark:text-fuchsia-300 text-sm font-medium">
                    Booking submitted! We&apos;ll contact you soon.
                  </p>
                </motion.div>
              )}
              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl">
                  <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="customerName" className="text-slate-700 dark:text-slate-300 text-sm font-medium">Full Name *</Label>
                    <Input id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} placeholder="John Doe" required className={`rounded-xl ${field("customerName")}`} />
                    {validationErrors.customerName && <p className="text-xs text-red-500">{validationErrors.customerName}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 text-sm font-medium">Email Address *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required className={`rounded-xl ${field("email")}`} />
                    {validationErrors.email && <p className="text-xs text-red-500">{validationErrors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300 text-sm font-medium">Phone Number *</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+27 12 345 6789" required className={`rounded-xl ${field("phone")}`} />
                    {validationErrors.phone && <p className="text-xs text-red-500">{validationErrors.phone}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="serviceType" className="text-slate-700 dark:text-slate-300 text-sm font-medium">Service Type *</Label>
                    <Select id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleChange} required className={`rounded-xl ${field("serviceType")}`}>
                      <option value="">Select a service</option>
                      {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                    {validationErrors.serviceType && <p className="text-xs text-red-500">{validationErrors.serviceType}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="poolSize" className="text-slate-700 dark:text-slate-300 text-sm font-medium">Pool Size (optional)</Label>
                  <Select id="poolSize" name="poolSize" value={formData.poolSize} onChange={handleChange} className="rounded-xl border-slate-200 dark:border-slate-700">
                    <option value="">Select pool size</option>
                    {poolSizes.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="address" className="text-slate-700 dark:text-slate-300 text-sm font-medium">Street Address *</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main Street" required className={`rounded-xl ${field("address")}`} />
                  {validationErrors.address && <p className="text-xs text-red-500">{validationErrors.address}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="city" className="text-slate-700 dark:text-slate-300 text-sm font-medium">City *</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleChange} placeholder="Johannesburg" required className={`rounded-xl ${field("city")}`} />
                    {validationErrors.city && <p className="text-xs text-red-500">{validationErrors.city}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="postalCode" className="text-slate-700 dark:text-slate-300 text-sm font-medium">Postal Code</Label>
                    <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="2000" className="rounded-xl border-slate-200 dark:border-slate-700" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="preferredDate" className="text-slate-700 dark:text-slate-300 text-sm font-medium">Preferred Date *</Label>
                    <Input id="preferredDate" name="preferredDate" type="date" value={formData.preferredDate} onChange={handleChange} min={new Date().toISOString().split("T")[0]} required className={`rounded-xl ${field("preferredDate")}`} />
                    {validationErrors.preferredDate && <p className="text-xs text-red-500">{validationErrors.preferredDate}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="preferredTime" className="text-slate-700 dark:text-slate-300 text-sm font-medium">Preferred Time *</Label>
                    <Select id="preferredTime" name="preferredTime" value={formData.preferredTime} onChange={handleChange} required className={`rounded-xl ${field("preferredTime")}`}>
                      <option value="">Select time</option>
                      <option value="08:00-10:00">08:00 – 10:00</option>
                      <option value="10:00-12:00">10:00 – 12:00</option>
                      <option value="12:00-14:00">12:00 – 14:00</option>
                      <option value="14:00-16:00">14:00 – 16:00</option>
                      <option value="16:00-18:00">16:00 – 18:00</option>
                    </Select>
                    {validationErrors.preferredTime && <p className="text-xs text-red-500">{validationErrors.preferredTime}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-slate-700 dark:text-slate-300 text-sm font-medium">Additional Information</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more about your project..." rows={3} className="rounded-xl border-slate-200 dark:border-slate-700" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-[15px] transition-all duration-200 shadow-md shadow-blue-600/25"
                >
                  {isSubmitting ? "Submitting…" : "Schedule Consultation"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right panel — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Contact Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-7 text-white">
              <h3 className="text-xl font-bold mb-1">Get in Touch</h3>
              <p className="text-blue-200 text-sm mb-7">We&apos;re here to bring your pool dreams to life</p>
              <div className="space-y-5">
                {[
                  { icon: Phone, label: "Phone", value: "+27 649 806 086", href: "tel:+27649806086" },
                  { icon: Mail, label: "Email", value: "dennytech84@gmail.com", href: "mailto:dennytech84@gmail.com" },
                  { icon: MapPin, label: "Location", value: "South Africa & African Region", href: undefined },
                  { icon: Clock, label: "Hours", value: "Mon–Fri 8:00–18:00 · Sat 9:00–15:00", href: undefined },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-blue-200 text-xs mb-0.5">{label}</div>
                      {href ? (
                        <a href={href} className="text-white text-sm hover:text-blue-200 transition-colors break-all">{value}</a>
                      ) : (
                        <div className="text-white text-sm">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl p-7 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5">Why Choose DC Tech Pools?</h3>
              <ul className="space-y-3">
                {whyUs.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-fuchsia-50 dark:bg-fuchsia-950/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-fuchsia-600 dark:text-fuchsia-400" />
                    </div>
                    <span className="text-slate-600 dark:text-slate-400 text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

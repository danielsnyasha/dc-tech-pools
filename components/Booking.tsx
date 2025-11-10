"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Phone, Mail, User, CheckCircle } from "lucide-react";

// Zod validation schema
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

const serviceTypes = [
  "New Pool Construction",
  "Pool Renovation",
  "Weekly Maintenance",
  "Equipment Repair",
  "Fibreglass Repairs",
  "Marbelite Repairs",
  "Eco-Friendly Solutions",
  "Pool Safety Systems",
  "Heating Solutions",
  "Automation Systems",
  "Water Features",
  "Tiling & Coping",
];

const poolSizes = [
  "Small (< 20m²)",
  "Medium (20-40m²)",
  "Large (40-60m²)",
  "Extra Large (> 60m²)",
  "Not Sure",
];

export default function Booking() {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    serviceType: "",
    poolSize: "",
    address: "",
    city: "",
    postalCode: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const fieldName = e.target.name;
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
    // Clear validation error for this field when user starts typing
    if (validationErrors[fieldName]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setValidationErrors({});

    try {
      // Validate form data with Zod
      const validatedData = bookingSchema.parse(formData);

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit booking");
      }

      // Show success toast
      toast.success("Booking Submitted Successfully!", {
        description: "We'll contact you shortly to confirm your appointment. Check your email for details.",
        duration: 5000,
      });

      setIsSuccess(true);

      // Clear form data
      setFormData({
        customerName: "",
        email: "",
        phone: "",
        serviceType: "",
        poolSize: "",
        address: "",
        city: "",
        postalCode: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
      });

      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Handle validation errors
        const errors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            errors[error.path[0].toString()] = error.message;
          }
        });
        setValidationErrors(errors);
        toast.error("Validation Error", {
          description: "Please check the form and fix any errors.",
          duration: 4000,
        });
      } else {
        // Show error toast
        toast.error("Booking Failed", {
          description: "Unable to submit your booking. Please try again or contact us directly.",
          duration: 5000,
        });
        setError("Failed to submit booking. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-blue-50 via-emerald-50 to-purple-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-6 py-2 bg-white rounded-full shadow-lg"
          >
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              BOOK AN APPOINTMENT
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Get Started?
            <br />
            <span className="text-gradient">Let's Make It Happen</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Schedule a free consultation with our pool experts. We'll visit your property, discuss your vision,
            and provide a detailed quote.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-2xl border-0 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-3xl text-gray-900 dark:text-white">Book Your Consultation</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <p className="text-green-800 font-medium">
                      Booking submitted successfully! We'll contact you soon.
                    </p>
                  </motion.div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Full Name *</Label>
                      <Input
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className={validationErrors.customerName ? "border-red-500" : ""}
                      />
                      {validationErrors.customerName && (
                        <p className="text-sm text-red-600 mt-1">{validationErrors.customerName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className={validationErrors.email ? "border-red-500" : ""}
                      />
                      {validationErrors.email && (
                        <p className="text-sm text-red-600 mt-1">{validationErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+27 12 345 6789"
                        required
                        className={validationErrors.phone ? "border-red-500" : ""}
                      />
                      {validationErrors.phone && (
                        <p className="text-sm text-red-600 mt-1">{validationErrors.phone}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Service Type *</Label>
                      <Select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        required
                        className={validationErrors.serviceType ? "border-red-500" : ""}
                      >
                        <option value="">Select a service</option>
                        {serviceTypes.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </Select>
                      {validationErrors.serviceType && (
                        <p className="text-sm text-red-600 mt-1">{validationErrors.serviceType}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="poolSize">Pool Size (if applicable)</Label>
                    <Select
                      id="poolSize"
                      name="poolSize"
                      value={formData.poolSize}
                      onChange={handleChange}
                    >
                      <option value="">Select pool size</option>
                      {poolSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main Street"
                      required
                      className={validationErrors.address ? "border-red-500" : ""}
                    />
                    {validationErrors.address && (
                      <p className="text-sm text-red-600 mt-1">{validationErrors.address}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Johannesburg"
                        required
                        className={validationErrors.city ? "border-red-500" : ""}
                      />
                      {validationErrors.city && (
                        <p className="text-sm text-red-600 mt-1">{validationErrors.city}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="2000"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate">Preferred Date *</Label>
                      <Input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        required
                        className={validationErrors.preferredDate ? "border-red-500" : ""}
                      />
                      {validationErrors.preferredDate && (
                        <p className="text-sm text-red-600 mt-1">{validationErrors.preferredDate}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredTime">Preferred Time *</Label>
                      <Select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        required
                        className={validationErrors.preferredTime ? "border-red-500" : ""}
                      >
                        <option value="">Select time</option>
                        <option value="08:00-10:00">08:00 - 10:00</option>
                        <option value="10:00-12:00">10:00 - 12:00</option>
                        <option value="12:00-14:00">12:00 - 14:00</option>
                        <option value="14:00-16:00">14:00 - 16:00</option>
                        <option value="16:00-18:00">16:00 - 18:00</option>
                      </Select>
                      {validationErrors.preferredTime && (
                        <p className="text-sm text-red-600 mt-1">{validationErrors.preferredTime}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Information</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your project..."
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    size="xl"
                    className="w-full font-bold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Schedule Consultation"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-600 to-emerald-600 dark:from-blue-700 dark:to-emerald-700 text-white">
              <CardHeader>
                <CardTitle className="text-3xl">Get in Touch</CardTitle>
                <CardDescription className="text-white/80">
                  We're here to answer your questions and bring your pool dreams to life
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <a href="tel:+27649806086" className="hover:text-blue-200 transition-colors">
                      +27 649 806 086
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a
                      href="mailto:dennytech84@gmail.com"
                      className="hover:text-blue-200 transition-colors"
                    >
                      dennytech84@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Location</h3>
                    <p className="text-white/90">South Africa & African Region</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                    <p className="text-white/90">Mon - Fri: 8:00 AM - 6:00 PM</p>
                    <p className="text-white/90">Sat: 9:00 AM - 3:00 PM</p>
                    <p className="text-white/90">Sun: Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Why Choose DC Tech Pools?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "15+ years of industry experience",
                  "Fully licensed and insured",
                  "Free consultations and quotes",
                  "Eco-friendly and sustainable options",
                  "24/7 emergency support",
                  "Competitive pricing and financing options",
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

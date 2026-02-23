'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const ROSE_PINK = '#D86A8C';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Visit Our Greenhouse',
      details: ['123 Garden Street', 'Green City, GC 12345', 'United States'],
      action: 'Get Directions',
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Call Us',
      details: ['+1 (555) 123-BUDS', '+1 (555) 123-2837', 'Toll-free support'],
      action: 'Call Now',
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Us',
      details: [
        'hello@wildbudsbotonics.com',
        'support@wildbudsbotonics.com',
        'We reply within 24 hours',
      ],
      action: 'Send Email',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Business Hours',
      details: [
        'Monday - Friday: 8AM - 6PM',
        'Saturday: 9AM - 5PM',
        'Sunday: 10AM - 4PM',
      ],
      action: 'View Calendar',
    },
  ];

  const faqs = [
    {
      question: 'How do you ensure plants arrive healthy?',
      answer:
        'We use specialized packaging with moisture control and temperature regulation. Each plant is carefully secured and shipped with detailed care instructions.',
    },
    {
      question: "What's your plant guarantee policy?",
      answer:
        "We offer a 30-day healthy plant guarantee. If your plant doesn't thrive, we'll replace it or provide a full refund with our plant care support.",
    },
    {
      question: 'Do you offer plant care consultations?',
      answer:
        'Yes! Our plant experts are available for virtual consultations to help you choose the right plants and provide ongoing care guidance.',
    },
    {
      question: 'Can I visit your greenhouse in person?',
      answer:
        'Absolutely! We welcome visitors to our greenhouse. Please call ahead to schedule a visit.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions about plants or need care advice? We’re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600">
                      We’ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name *</Label>
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange('name', e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange('email', e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Phone</Label>
                        <Input
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange('phone', e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Subject *</Label>
                        <Select
                          onValueChange={(v) =>
                            handleInputChange('subject', v)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select topic" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="plant-care">
                              Plant Care
                            </SelectItem>
                            <SelectItem value="order">
                              Order Inquiry
                            </SelectItem>
                            <SelectItem value="shipping">
                              Shipping
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Message *</Label>
                      <Textarea
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange('message', e.target.value)
                        }
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full text-white hover:opacity-90"
                      style={{ backgroundColor: ROSE_PINK }}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, i) => (
              <Card key={i} className="hover:shadow-lg transition">
                <CardContent className="p-6 flex gap-4">
                  <div style={{ color: ROSE_PINK }}>{info.icon}</div>
                  <div>
                    <h3 className="font-semibold mb-2">{info.title}</h3>
                    {info.details.map((d, j) => (
                      <p key={j} className="text-sm text-gray-600">
                        {d}
                      </p>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 hover:text-white"
                      style={{
                        borderColor: ROSE_PINK,
                        color: ROSE_PINK,
                      }}
                    >
                      {info.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {faqs.map((f, i) => (
            <Card key={i} className="hover:shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{f.question}</h3>
                <p className="text-sm text-gray-600">{f.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
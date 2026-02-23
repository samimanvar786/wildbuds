import Image from 'next/image';
import { Leaf, Users, Award, Heart, Truck, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const ROSE_PINK = '#D86A8C';

export default function AboutPage() {
  const values = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Sustainability",
      description:
        "We're committed to eco-friendly practices and sustainable growing methods that protect our planet.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Quality Care",
      description:
        "Every plant receives individual attention and care to ensure it arrives healthy and thriving.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description:
        "Building a community of plant lovers who share knowledge, tips, and their growing journey.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description:
        "We maintain the highest standards in plant quality, customer service, and botanical expertise.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & Head Botanist",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio:
        "With over 15 years in botanical research, Sarah founded Wild Buds to share her passion for plants.",
    },
    {
      name: "Michael Chen",
      role: "Plant Care Specialist",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio:
        "Michael ensures every plant meets our quality standards and provides expert care guidance.",
    },
    {
      name: "Emma Rodriguez",
      role: "Customer Experience Manager",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio:
        "Emma leads our customer service team, ensuring every plant parent has an amazing experience.",
    },
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "500+", label: "Plant Varieties" },
    { number: "15+", label: "Years Experience" },
    { number: "99%", label: "Plant Survival Rate" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Wild Buds Botanics
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate plant enthusiasts dedicated to bringing nature into
            your home. Since 2009, we've been growing relationships with plants.
          </p>
        </div>

        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Wild Buds Botanics began as a small greenhouse operation in Sarah's backyard. 
              What started as a personal passion for rare and exotic plants quickly grew into 
              a mission to make high-quality plants accessible to everyone.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we're proud to be one of the leading online plant retailers, known for 
              our exceptional plant quality, expert care guides, and commitment to customer 
              satisfaction. Every plant that leaves our greenhouse is hand-selected and 
              carefully prepared for its journey to your home.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe that plants have the power to transform spaces and lives. Whether 
              you're a seasoned plant parent or just starting your green journey, we're here 
              to support you every step of the way.
            </p>
          </div>

          <Image
            src="https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
            alt="Our greenhouse"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These values guide how we grow plants and relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition">
                <CardContent className="p-6">
                  <div
                    className="mb-4 flex justify-center"
                    style={{ color: ROSE_PINK }}
                  >
                    {v.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{v.title}</h3>
                  <p className="text-gray-600">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div
          className="rounded-lg p-8 mb-16"
          style={{ backgroundColor: ROSE_PINK }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-white mb-2">
                  {s.number}
                </div>
                <div className="text-white/90">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate plant experts ready to help you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((m, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition">
                <CardContent className="p-6">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{m.name}</h3>
                  <p
                    className="font-medium mb-3"
                    style={{ color: ROSE_PINK }}
                  >
                    {m.role}
                  </p>
                  <p className="text-gray-600 text-sm">{m.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            To inspire people to create healthy living spaces through plants.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[Truck, Shield, Heart].map((Icon, i) => (
              <div key={i} className="flex justify-center gap-3">
                <Icon className="h-6 w-6" style={{ color: ROSE_PINK }} />
                <span className="font-medium">
                  {i === 0
                    ? 'Fast Delivery'
                    : i === 1
                    ? 'Plant Guarantee'
                    : 'Lifetime Support'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Plant Journey?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of happy plant parents today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-white hover:opacity-90"
              style={{ backgroundColor: ROSE_PINK }}
            >
              Shop Plants Now
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="hover:text-white"
              style={{ borderColor: ROSE_PINK, color: ROSE_PINK }}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
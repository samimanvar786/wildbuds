import Image from 'next/image';
import { Leaf, Users, Award, Heart, Truck, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  const values = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Sustainability",
      description: "We're committed to eco-friendly practices and sustainable growing methods that protect our planet."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Quality Care",
      description: "Every plant receives individual attention and care to ensure it arrives healthy and thriving."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description: "Building a community of plant lovers who share knowledge, tips, and their growing journey."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "We maintain the highest standards in plant quality, customer service, and botanical expertise."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & Head Botanist",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "With over 15 years in botanical research, Sarah founded Wild Buds to share her passion for plants."
    },
    {
      name: "Michael Chen",
      role: "Plant Care Specialist",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Michael ensures every plant meets our quality standards and provides expert care guidance."
    },
    {
      name: "Emma Rodriguez",
      role: "Customer Experience Manager",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Emma leads our customer service team, ensuring every plant parent has an amazing experience."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "500+", label: "Plant Varieties" },
    { number: "15+", label: "Years Experience" },
    { number: "99%", label: "Plant Survival Rate" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Wild Buds Botanics
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're passionate plant enthusiasts dedicated to bringing the beauty and benefits 
            of nature into your home. Since 2009, we've been cultivating relationships between 
            people and plants, one leaf at a time.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
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
          
          <div className="relative">
            <Image
              src="https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
              alt="Our greenhouse"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These core values guide everything we do, from how we grow our plants 
              to how we serve our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-[#03312f] mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-[#03312f] rounded-lg p-8 mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our passionate team of plant experts is here to help you succeed 
              in your plant parenting journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#03312f] font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              To inspire and enable people to create beautiful, healthy living spaces through 
              the power of plants. We're committed to providing the highest quality plants, 
              expert guidance, and exceptional service to help every customer succeed in 
              their plant journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center gap-3">
                <Truck className="h-6 w-6 text-[#03312f]" />
                <span className="font-medium">Fast, Safe Delivery</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Shield className="h-6 w-6 text-[#03312f]" />
                <span className="font-medium">Plant Health Guarantee</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Heart className="h-6 w-6 text-[#03312f]" />
                <span className="font-medium">Lifetime Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Plant Journey?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of happy plant parents who trust Wild Buds Botanics 
            for their green companions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#03312f] hover:bg-[#024a46]">
              Shop Plants Now
            </Button>
            <Button variant="outline" size="lg" className="border-[#03312f] text-[#03312f] hover:bg-[#03312f] hover:text-white">
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
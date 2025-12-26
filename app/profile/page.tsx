'use client';

import { useState } from 'react';
import Image from 'next/image';
import { User, Mail, Phone, MapPin, Calendar, Edit, Camera, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: '123 Garden Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    bio: 'Plant enthusiast and nature lover. I enjoy creating green spaces and caring for my indoor garden.',
    joinDate: '2023-01-15',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
  });

  const [editData, setEditData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const stats = [
    { label: 'Orders Placed', value: '24', color: 'text-blue-600' },
    { label: 'Plants Purchased', value: '47', color: 'text-green-600' },
    { label: 'Wishlist Items', value: '12', color: 'text-purple-600' },
    { label: 'Reviews Written', value: '18', color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your account information and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 mx-auto relative rounded-full overflow-hidden">
                      <Image
                        src={profileData.avatar}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 rounded-full w-8 h-8 p-0 bg-[#03312f] hover:bg-[#024a46]"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {profileData.first_name} {profileData.last_name}
                  </h2>
                  <p className="text-gray-600 mb-4">{profileData.email}</p>
                  
                  <Badge className="mb-4 bg-green-100 text-green-800">
                    Member since {new Date(profileData.joinDate).getFullYear()}
                  </Badge>
                  
                  <p className="text-sm text-gray-600 mb-6">{profileData.bio}</p>
                  
                  {!isEditing && (
                    <Button 
                      onClick={handleEdit}
                      className="w-full bg-[#03312f] hover:bg-[#024a46]"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Account Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className={`text-2xl font-bold ${stat.color}`}>
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Personal Information</CardTitle>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancel}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSave}
                          className="bg-[#03312f] hover:bg-[#024a46]"
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first_name">First Name</Label>
                        {isEditing ? (
                          <Input
                            id="first_name"
                            value={editData.first_name}
                            onChange={(e) => handleInputChange('first_name', e.target.value)}
                          />
                        ) : (
                          <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                            <User className="h-4 w-4 text-gray-500" />
                            <span>{profileData.first_name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="last_name">Last Name</Label>
                        {isEditing ? (
                          <Input
                            id="last_name"
                            value={editData.last_name}
                            onChange={(e) => handleInputChange('last_name', e.target.value)}
                          />
                        ) : (
                          <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                            <User className="h-4 w-4 text-gray-500" />
                            <span>{profileData.last_name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={editData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                          />
                        ) : (
                          <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span>{profileData.email}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            value={editData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                        ) : (
                          <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span>{profileData.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Address</Label>
                        {isEditing ? (
                          <Input
                            id="address"
                            value={editData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                          />
                        ) : (
                          <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{profileData.address}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          {isEditing ? (
                            <Input
                              id="city"
                              value={editData.city}
                              onChange={(e) => handleInputChange('city', e.target.value)}
                            />
                          ) : (
                            <div className="p-2 border rounded-md bg-gray-50">
                              <span>{profileData.city}</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="state">State</Label>
                          {isEditing ? (
                            <Input
                              id="state"
                              value={editData.state}
                              onChange={(e) => handleInputChange('state', e.target.value)}
                            />
                          ) : (
                            <div className="p-2 border rounded-md bg-gray-50">
                              <span>{profileData.state}</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="pincode">PIN Code</Label>
                          {isEditing ? (
                            <Input
                              id="pincode"
                              value={editData.pincode}
                              onChange={(e) => handleInputChange('pincode', e.target.value)}
                            />
                          ) : (
                            <div className="p-2 border rounded-md bg-gray-50">
                              <span>{profileData.pincode}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      {isEditing ? (
                        <Textarea
                          id="bio"
                          value={editData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          rows={4}
                        />
                      ) : (
                        <div className="p-3 border rounded-md bg-gray-50">
                          <span>{profileData.bio}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Account Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                    <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Member since {new Date(profileData.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
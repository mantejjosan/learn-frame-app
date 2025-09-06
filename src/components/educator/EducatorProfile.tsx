import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Bell, Shield, Globe, Star, Users, BookOpen, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EducatorProfile = () => {
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    title: "Senior Software Engineer & Educator",
    bio: "Passionate educator with 10+ years of experience in software development and teaching. Specializing in React, JavaScript, and modern web technologies.",
    location: "San Francisco, CA",
    website: "https://sarahjohnson.dev",
    linkedin: "linkedin.com/in/sarahjohnson",
    twitter: "@sarahcodes",
    yearsExperience: "10+",
    specialties: ["React", "JavaScript", "TypeScript", "Node.js"]
  });

  const [notifications, setNotifications] = useState({
    newEnrollments: true,
    courseQuestions: true,
    courseReviews: true,
    paymentUpdates: true,
    marketingEmails: false,
    platformUpdates: true
  });

  const [newSpecialty, setNewSpecialty] = useState("");
  const { toast } = useToast();

  const handleProfileUpdate = () => {
    toast({
      title: "Profile updated",
      description: "Your educator profile has been saved successfully."
    });
  };

  const handleNotificationUpdate = () => {
    toast({
      title: "Preferences updated",
      description: "Your notification preferences have been saved."
    });
  };

  const addSpecialty = () => {
    if (newSpecialty && !profile.specialties.includes(newSpecialty)) {
      setProfile(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty]
      }));
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (specialty: string) => {
    setProfile(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="teaching">Teaching Info</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Basic Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your public profile information that students will see
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">
                    JPG, GIF or PNG. Max size 2MB.
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={profile.title}
                    onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell students about your background and expertise..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={profile.linkedin}
                    onChange={(e) => setProfile(prev => ({ ...prev, linkedin: e.target.value }))}
                    placeholder="linkedin.com/in/yourprofile"
                  />
                </div>
              </div>

              <Button onClick={handleProfileUpdate}>
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teaching" className="space-y-6">
          {/* Teaching Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Teaching Information
              </CardTitle>
              <CardDescription>
                Share your teaching background and specialties
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Years of Experience</Label>
                <Select 
                  value={profile.yearsExperience} 
                  onValueChange={(value) => setProfile(prev => ({ ...prev, yearsExperience: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Specialties & Expertise</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profile.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {specialty}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-destructive" 
                        onClick={() => removeSpecialty(specialty)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a specialty (e.g., React, Python, Design)"
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSpecialty()}
                  />
                  <Button variant="outline" size="icon" onClick={addSpecialty}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Educator Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Your Teaching Impact</CardTitle>
              <CardDescription>
                See how you're making a difference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
                <div className="text-center">
                  <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-sm text-muted-foreground">Courses Created</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose what notifications you'd like to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Enrollments</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when students enroll in your courses
                    </p>
                  </div>
                  <Switch
                    checked={notifications.newEnrollments}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, newEnrollments: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Course Questions</p>
                    <p className="text-sm text-muted-foreground">
                      When students ask questions in your courses
                    </p>
                  </div>
                  <Switch
                    checked={notifications.courseQuestions}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, courseQuestions: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Course Reviews</p>
                    <p className="text-sm text-muted-foreground">
                      When students leave reviews for your courses
                    </p>
                  </div>
                  <Switch
                    checked={notifications.courseReviews}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, courseReviews: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Payment Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Earnings reports and payment notifications
                    </p>
                  </div>
                  <Switch
                    checked={notifications.paymentUpdates}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, paymentUpdates: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Platform Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Important platform news and feature updates
                    </p>
                  </div>
                  <Switch
                    checked={notifications.platformUpdates}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, platformUpdates: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-muted-foreground">
                      Tips for growing your courses and promotional content
                    </p>
                  </div>
                  <Switch
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, marketingEmails: checked }))
                    }
                  />
                </div>
              </div>

              <Button onClick={handleNotificationUpdate}>
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Privacy
              </CardTitle>
              <CardDescription>
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Enable Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Connected Accounts
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Download My Data
              </Button>
              <div className="border-t pt-4">
                <Button variant="destructive" className="w-full justify-start">
                  Delete Account
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  This will permanently delete your account and all associated data. This action cannot be undone.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducatorProfile;
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Users, DollarSign, Eye, Edit, Trash2, MoreHorizontal, Loader2, Upload, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { api, getUserSession, Course } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const EducatorCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    price: 999,
    course_cover_image_key: "",
    is_published: false
  });
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();
  const userSession = getUserSession();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      if (!userSession || userSession.userType !== 'educator') return;
      
      // Get courses for the current educator
      const response = await api.getCourses({ 
        educator_id: userSession.user.id // Using id instead of educator_id since we're in localStorage mode
      });
      
      if (response.success && response.data) {
        setCourses(response.data);
      } else {
        // If no courses found, initialize with empty array
        setCourses([]);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to fetch courses"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userSession?.user?.id) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please upload an image file (JPEG, PNG, etc.)"
      });
      return;
    }

    // Set preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      // Include user ID in the path for better organization and security
      const filePath = `user_${userSession.user.id}/${fileName}`;

      const { error } = await supabase.storage
        .from('courses')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('courses')
        .getPublicUrl(filePath);

      setNewCourse(prev => ({
        ...prev,
        course_cover_image_key: publicUrl
      }));

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message || "Failed to upload image. Please try again."
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
    setNewCourse(prev => ({
      ...prev,
      course_cover_image_key: ""
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userSession || userSession.userType !== 'educator') return;
    
    // Basic validation
    if (!newCourse.title || !newCourse.description || !newCourse.course_cover_image_key) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields and upload a cover image"
      });
      return;
    }
    
    setIsCreating(true);
    try {
      const courseId = crypto.randomUUID();
      
      // Create course with localStorage
      const newCourseData = {
        ...newCourse,
        course_id: courseId,
        educator_id: userSession.user.id,
        price: Number(newCourse.price),
        is_published: Boolean(newCourse.is_published)
      };
      
      // This will save to localStorage
      const response = await api.createCourse(newCourseData);
      
      // Show success message
      toast({
        title: "Success",
        description: "Course created successfully"
      });
      
      // Reset form and refresh course list
      setIsCreateDialogOpen(false);
      setNewCourse({ 
        title: "", 
        description: "", 
        price: 999, 
        course_cover_image_key: "",
        is_published: false 
      });
      
      // Refresh the course list
      fetchCourses();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create course"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const stats = [
    {
      title: "Total Students",
      value: courses.reduce((sum, course) => sum + course.enrollment_count, 0).toLocaleString(),
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Total Revenue",
      value: new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(courses.reduce((sum, course) => sum + (course.price * course.enrollment_count), 0)),
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Published Courses",
      value: courses.filter(course => course.is_published).length.toString(),
      icon: Eye,
      color: "text-primary"
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">My Courses</h2>
          <p className="text-muted-foreground">Create and manage your course content</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Course
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>
                Add a new course to your teaching portfolio
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                    className="col-span-3"
                    placeholder="e.g., Introduction to Web Development"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                    className="col-span-3"
                    rows={4}
                    placeholder="Provide a detailed description of your course"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price (₹) <span className="text-red-500">*</span>
                  </Label>
                  <div className="col-span-3 relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">₹</span>
                    <Input
                      id="price"
                      type="number"
                      value={newCourse.price}
                      onChange={(e) => setNewCourse({...newCourse, price: parseFloat(e.target.value) || 0})}
                      className="pl-8"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <Label className="text-right pt-2">
                    Cover Image <span className="text-red-500">*</span>
                  </Label>
                  <div className="col-span-3 space-y-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                      disabled={isUploading}
                    />
                    
                    {previewUrl || newCourse.course_cover_image_key ? (
                      <div className="relative group">
                        <img
                          src={previewUrl || `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/courses/${newCourse.course_cover_image_key}`}
                          alt="Course cover preview"
                          className="w-full h-48 object-cover rounded-md border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={removeImage}
                          disabled={isUploading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div 
                        className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG, JPEG up to 5MB
                          </p>
                        </div>
                      </div>
                    )}
                    {isUploading && (
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Uploading image...
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="published" className="text-right">
                    Publish Now
                  </Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={newCourse.is_published}
                      onCheckedChange={(checked) => setNewCourse({...newCourse, is_published: checked})}
                    />
                    <span className="text-sm text-muted-foreground">
                      {newCourse.is_published ? 'Course will be published' : 'Save as draft'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Course"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Course Management</CardTitle>
          <CardDescription>
            Monitor performance and manage your courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.course_id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={course.is_published ? "default" : "secondary"}
                    >
                      {course.is_published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>{course.enrollment_count.toLocaleString()}</TableCell>
                  <TableCell className="font-medium">₹{(course.price * course.enrollment_count).toLocaleString('en-IN')}</TableCell>
                  <TableCell>
                    {course.star_rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span>{course.star_rating.toFixed(1)}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No ratings yet</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(course.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Course
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Course
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Course
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              New to teaching? Here are some helpful resources
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Course Creation Guide
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Best Practices
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Video Recording Tips
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
            <CardDescription>
              Track how your courses are performing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Average Rating</span>
              <span className="font-medium">4.7/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Course Completion Rate</span>
              <span className="font-medium">68%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Student Satisfaction</span>
              <span className="font-medium">94%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EducatorCourses;
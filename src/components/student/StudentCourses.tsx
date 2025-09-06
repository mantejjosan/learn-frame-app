import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlayCircle, Clock, BookOpen, Filter } from "lucide-react";

const StudentCourses = () => {
  const enrolledCourses = [
    {
      id: 1,
      title: "React Development Masterclass",
      instructor: "John Smith",
      progress: 65,
      duration: "12 hours",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      category: "Programming",
      level: "Intermediate"
    },
    {
      id: 2,
      title: "Digital Marketing Essentials",
      instructor: "Sarah Johnson",
      progress: 30,
      duration: "8 hours",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      category: "Marketing",
      level: "Beginner"
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      instructor: "Mike Chen",
      progress: 90,
      duration: "10 hours",
      thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400",
      category: "Design",
      level: "Advanced"
    }
  ];

  const availableCourses = [
    {
      id: 4,
      title: "Python for Data Science",
      instructor: "Dr. Emma Wilson",
      price: "$79",
      rating: 4.8,
      students: "12,450",
      thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400",
      category: "Programming",
      level: "Intermediate"
    },
    {
      id: 5,
      title: "Graphic Design Fundamentals",
      instructor: "Alex Rodriguez",
      price: "$49",
      rating: 4.6,
      students: "8,230",
      thumbnail: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400",
      category: "Design",
      level: "Beginner"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Enrolled Courses Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">My Courses</h2>
          <Badge variant="secondary">{enrolledCourses.length} enrolled</Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
                    <PlayCircle className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                <CardDescription>by {course.instructor}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary rounded-full h-2 transition-all" 
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                  <Badge variant="outline" className="text-xs">
                    {course.level}
                  </Badge>
                </div>
                <Button className="w-full">Continue Learning</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Available Courses Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Discover More Courses</h2>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                <CardDescription>by {course.instructor}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{course.price}</span>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-muted-foreground">({course.students})</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {course.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {course.level}
                  </Badge>
                </div>
                <Button className="w-full">Enroll Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentCourses;
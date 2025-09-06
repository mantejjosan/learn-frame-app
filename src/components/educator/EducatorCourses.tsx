import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Users, DollarSign, Eye, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const EducatorCourses = () => {
  const courses = [
    {
      id: 1,
      title: "React Development Masterclass",
      status: "Published",
      students: 245,
      revenue: "$2,450",
      rating: 4.8,
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      status: "Draft",
      students: 0,
      revenue: "$0",
      rating: null,
      lastUpdated: "2024-02-01"
    },
    {
      id: 3,
      title: "Modern CSS Techniques",
      status: "Published",
      students: 156,
      revenue: "$1,560",
      rating: 4.6,
      lastUpdated: "2024-01-20"
    }
  ];

  const stats = [
    {
      title: "Total Students",
      value: courses.reduce((sum, course) => sum + course.students, 0).toLocaleString(),
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Total Revenue",
      value: `$${courses.reduce((sum, course) => sum + parseFloat(course.revenue.replace('$', '').replace(',', '')), 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Published Courses",
      value: courses.filter(course => course.status === "Published").length.toString(),
      icon: Eye,
      color: "text-primary"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">My Courses</h2>
          <p className="text-muted-foreground">Create and manage your course content</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Course
        </Button>
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
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={course.status === "Published" ? "default" : "secondary"}
                    >
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{course.students.toLocaleString()}</TableCell>
                  <TableCell className="font-medium">{course.revenue}</TableCell>
                  <TableCell>
                    {course.rating ? (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span>{course.rating}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No ratings yet</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {course.lastUpdated}
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
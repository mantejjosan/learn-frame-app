import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Star, 
  ThumbsUp, 
  MessageCircle,
  Download 
} from "lucide-react";

const EducatorAnalytics = () => {
  const overviewStats = [
    {
      title: "Total Views",
      value: "24,567",
      change: "+12.5%",
      icon: Eye,
      color: "text-blue-600"
    },
    {
      title: "Active Students",
      value: "1,234",
      change: "+8.2%",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Completion Rate",
      value: "68.4%",
      change: "+5.1%",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Average Rating",
      value: "4.7",
      change: "+0.2",
      icon: Star,
      color: "text-yellow-600"
    }
  ];

  const coursePerformance = [
    {
      course: "React Development Masterclass",
      students: 245,
      completion: 72,
      rating: 4.8,
      revenue: "$2,450",
      engagement: 85
    },
    {
      course: "Modern CSS Techniques",
      students: 156,
      completion: 64,
      rating: 4.6,
      revenue: "$1,560",
      engagement: 78
    },
    {
      course: "Advanced JavaScript Concepts",
      students: 89,
      completion: 58,
      rating: 4.5,
      revenue: "$890",
      engagement: 71
    }
  ];

  const recentActivity = [
    {
      type: "enrollment",
      student: "John Smith",
      course: "React Development Masterclass",
      time: "2 hours ago"
    },
    {
      type: "completion",
      student: "Sarah Johnson",
      course: "Modern CSS Techniques", 
      time: "4 hours ago"
    },
    {
      type: "review",
      student: "Mike Chen",
      course: "React Development Masterclass",
      time: "6 hours ago",
      rating: 5
    },
    {
      type: "question",
      student: "Emma Wilson",
      course: "Advanced JavaScript Concepts",
      time: "8 hours ago"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Track your course performance and student engagement</p>
        </div>
        <Select defaultValue="30days">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change} from last period</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Course Performance</TabsTrigger>
          <TabsTrigger value="students">Student Insights</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Over Time</CardTitle>
                <CardDescription>Your earnings for the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Revenue chart placeholder</p>
                    <p className="text-xs text-muted-foreground">Chart library integration needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enrollment Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Student Enrollments</CardTitle>
                <CardDescription>New student registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Enrollment chart placeholder</p>
                    <p className="text-xs text-muted-foreground">Chart library integration needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest student interactions with your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      {activity.type === "enrollment" && <Users className="h-5 w-5 text-blue-500" />}
                      {activity.type === "completion" && <ThumbsUp className="h-5 w-5 text-green-500" />}
                      {activity.type === "review" && <Star className="h-5 w-5 text-yellow-500" />}
                      {activity.type === "question" && <MessageCircle className="h-5 w-5 text-purple-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {activity.student}
                        {activity.type === "enrollment" && " enrolled in "}
                        {activity.type === "completion" && " completed "}
                        {activity.type === "review" && " reviewed "}
                        {activity.type === "question" && " asked a question in "}
                        <span className="text-primary">{activity.course}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.time}
                        {activity.rating && ` • ${activity.rating} stars`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Performance Metrics</CardTitle>
              <CardDescription>Compare how your courses are performing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coursePerformance.map((course, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{course.course}</h4>
                      <Badge variant="outline">{course.students} students</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Completion</p>
                        <p className="text-lg font-medium">{course.completion}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <p className="text-lg font-medium">{course.rating}★</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="text-lg font-medium">{course.revenue}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Engagement</p>
                        <p className="text-lg font-medium">{course.engagement}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Demographics chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Beginner</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Intermediate</span>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Advanced</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Retention Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">82%</div>
                  <p className="text-sm text-muted-foreground">of students complete courses</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>How students interact with your content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Average Session Time</span>
                  <span className="font-medium">24 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Questions Asked</span>
                  <span className="font-medium">156 this month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Discussion Participation</span>
                  <span className="font-medium">67%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Resource Downloads</span>
                  <span className="font-medium">1,234</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Content</CardTitle>
                <CardDescription>Most viewed lessons and resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Introduction to React</span>
                    <div className="flex items-center gap-2">
                      <Eye className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">2,345</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">React Hooks Deep Dive</span>
                    <div className="flex items-center gap-2">
                      <Eye className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">1,987</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">State Management</span>
                    <div className="flex items-center gap-2">
                      <Eye className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">1,654</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducatorAnalytics;
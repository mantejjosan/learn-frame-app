import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Users, Percent, Plus, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EducatorBillings = () => {
  const { toast } = useToast();

  // Format currency to Indian Rupees
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const earnings = [
    {
      id: 1,
      course: "React Development Masterclass",
      student: "John Smith",
      amount: 9900, // Storing in paise for accurate calculations
      commission: 6930,
      date: "2024-02-15",
      status: "Completed"
    },
    {
      id: 2,
      course: "Modern CSS Techniques",
      student: "Sarah Johnson",
      amount: 7900,
      commission: 5530,
      date: "2024-02-14",
      status: "Completed"
    },
    {
      id: 3,
      course: "React Development Masterclass",
      student: "Mike Chen",
      amount: 9900,
      commission: 6930,
      date: "2024-02-13",
      status: "Pending"
    }
  ];

  const coupons = [
    {
      id: 1,
      code: "REACT2024",
      discount: "20%",
      uses: 45,
      maxUses: 100,
      expires: "2024-03-31",
      status: "Active"
    },
    {
      id: 2,
      code: "NEWSTUDENT",
      discount: "15%",
      uses: 23,
      maxUses: 50,
      expires: "2024-06-30",
      status: "Active"
    },
    {
      id: 3,
      code: "SUMMER2023",
      discount: "25%",
      uses: 100,
      maxUses: 100,
      expires: "2023-08-31",
      status: "Expired"
    }
  ];

  const stats = [
    {
      title: "Total Revenue",
      value: formatINR(1245000), // ₹12,45,000
      change: "+15% from last month",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Pending Payout",
      value: formatINR(245000), // ₹2,45,000
      change: "+5% from last month",
      icon: TrendingUp,
      color: "text-blue-600"
    },
    {
      title: "Total Sales",
      value: "156",
      change: "+23 this month",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Average Order",
      value: formatINR(8750), // ₹8,750
      change: "+5% from last month",
      icon: Percent,
      color: "text-orange-600"
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied!",
      description: `Coupon code ${code} has been copied to your clipboard.`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Sales & Earnings</h2>
        <p className="text-muted-foreground">Track your revenue and manage promotional codes</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="earnings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="coupons">Coupon Codes</TabsTrigger>
          <TabsTrigger value="analytics">Sales Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="earnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Earnings</CardTitle>
              <CardDescription>
                Your latest course sales and commission earnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Sale Amount</TableHead>
                    <TableHead>Your Commission</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {earnings.map((earning) => (
                    <TableRow key={earning.id}>
                      <TableCell className="font-medium">{earning.course}</TableCell>
                      <TableCell>{earning.student}</TableCell>
                      <TableCell>{formatINR(earning.amount)}</TableCell>
                      <TableCell className="font-medium text-green-600">
                        {formatINR(earning.commission)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {earning.date}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={earning.status === "Completed" ? "default" : "secondary"}
                        >
                          {earning.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coupons" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Coupon Management</h3>
              <p className="text-sm text-muted-foreground">
                Create and manage promotional codes for your courses
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Coupon
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Coupons</CardTitle>
              <CardDescription>
                Manage your promotional codes and track their usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell className="font-mono font-medium">
                        {coupon.code}
                      </TableCell>
                      <TableCell className="font-medium">{coupon.discount}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{coupon.uses}/{coupon.maxUses}</span>
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary rounded-full h-2" 
                              style={{ width: `${(coupon.uses / coupon.maxUses) * 100}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{coupon.expires}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            coupon.status === "Active" 
                              ? "default" 
                              : coupon.status === "Expired" 
                                ? "destructive" 
                                : "secondary"
                          }
                        >
                          {coupon.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCopyCode(coupon.code)}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Create Coupon Form */}
          <Card>
            <CardHeader>
              <CardTitle>Create New Coupon</CardTitle>
              <CardDescription>
                Generate a new promotional code for your courses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="couponCode">Coupon Code</Label>
                  <Input id="couponCode" placeholder="MYCOUPON2024" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount Percentage</Label>
                  <Input id="discount" type="number" placeholder="20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxUses">Maximum Uses</Label>
                  <Input id="maxUses" type="number" placeholder="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expires">Expiration Date</Label>
                  <Input id="expires" type="date" />
                </div>
              </div>
              <Button>Create Coupon</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>
                Detailed insights into your sales performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Sales analytics charts and graphs would be displayed here.</p>
                <p className="text-sm">Integration with charting library needed for detailed analytics.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducatorBillings;
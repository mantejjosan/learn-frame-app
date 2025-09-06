import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, CreditCard, Calendar } from "lucide-react";

const StudentBillings = () => {
  const purchases = [
    {
      id: "INV-001",
      course: "React Development Masterclass",
      date: "2024-01-15",
      amount: "$99.00",
      status: "Completed",
      paymentMethod: "Credit Card"
    },
    {
      id: "INV-002",
      course: "Digital Marketing Essentials",
      date: "2024-01-20",
      amount: "$79.00",
      status: "Completed",
      paymentMethod: "PayPal"
    },
    {
      id: "INV-003",
      course: "UI/UX Design Principles",
      date: "2024-02-05",
      amount: "$129.00",
      status: "Completed",
      paymentMethod: "Credit Card"
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "Credit Card",
      last4: "4242",
      brand: "Visa",
      isDefault: true
    },
    {
      id: 2,
      type: "PayPal",
      email: "student@example.com",
      isDefault: false
    }
  ];

  const totalSpent = purchases.reduce((sum, purchase) => 
    sum + parseFloat(purchase.amount.replace('$', '')), 0
  );

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +$79.00 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Purchased</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{purchases.length}</div>
            <p className="text-xs text-muted-foreground">
              All time purchases
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Badge className="bg-success text-success-foreground">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              No active subscriptions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Purchase History */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
          <CardDescription>
            View and download receipts for your course purchases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell className="font-mono text-sm">
                    {purchase.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {purchase.course}
                  </TableCell>
                  <TableCell>{purchase.date}</TableCell>
                  <TableCell>{purchase.paymentMethod}</TableCell>
                  <TableCell className="font-medium">
                    {purchase.amount}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {purchase.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Receipt
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Manage your saved payment methods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">
                      {method.type}
                      {method.type === "Credit Card" && ` ****${method.last4}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {method.type === "Credit Card" ? method.brand : method.email}
                    </p>
                  </div>
                  {method.isDefault && (
                    <Badge variant="secondary">Default</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentBillings;
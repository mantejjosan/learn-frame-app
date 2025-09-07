import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import companyInfo from "@/company";
import { api } from "@/lib/api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call the actual login API
      const response = await api.login({
        email: formData.email,
        password: formData.password
      });

      // Handle both old and new response formats
      if (response.success === false) {
        throw new Error(response.message || 'Login failed');
      }

      // Handle old format (without success field)
      if (!response.success && (response as any).message === 'Login successful') {
        const { user, session } = response as any;
        const userType = user?.user_metadata?.role || 'student';

        // Store user session
        const sessionData = {
          user: {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || user.email,
            photo: user.user_metadata?.photo || ''
          },
          token: session?.access_token || '',
          userType
        };
        localStorage.setItem('userSession', JSON.stringify(sessionData));

        toast({
          title: "Welcome!",
          description: `Signed in as ${user.user_metadata?.name || user.email}`,
          variant: "default"
        });

        // Navigate based on user type
        navigate(userType === "student" ? "/student" : "/educator");
        return;
      }

      // Handle new format
      if (response.success) {
        const { user, userType } = response.data;

        toast({
          title: "Welcome!",
          description: `Signed in as ${user.name}`,
          variant: "default"
        });

        // Navigate based on user type
        navigate(userType === "student" ? "/student" : "/educator");
      }
      
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "An error occurred during login."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/placeholder.svg" alt="Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {companyInfo.name}
            </span>
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
            </div>

          

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Create one now
              </Link>
            </p>
          </div>

          <div className="mt-4">
            <Button variant="ghost" className="w-full" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
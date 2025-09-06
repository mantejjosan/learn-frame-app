import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, CreditCard, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const StudentSidebar = () => {
  const navItems = [
    { 
      title: "My Courses", 
      href: "/student/courses", 
      icon: BookOpen,
      description: "Enrolled courses"
    },
    { 
      title: "Billings", 
      href: "/student/billings", 
      icon: CreditCard,
      description: "Purchase history"
    },
    { 
      title: "Profile", 
      href: "/student/profile", 
      icon: User,
      description: "Account settings"
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
            EduPlatform
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Student Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                <Icon className="h-4 w-4" />
                <div className="flex flex-col">
                  <span>{item.title}</span>
                  <span className="text-xs opacity-70">{item.description}</span>
                </div>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link to="/">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default StudentSidebar;
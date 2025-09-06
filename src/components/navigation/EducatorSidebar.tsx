import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, CreditCard, TrendingUp, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import companyInfo from "@/company";

const EducatorSidebar = () => {
  const navItems = [
    { 
      title: "Courses", 
      href: "/educator/courses", 
      icon: BookOpen,
      description: "Manage your courses"
    },
    { 
      title: "Billings", 
      href: "/educator/billings", 
      icon: CreditCard,
      description: "Sales & earnings"
    },
    { 
      title: "Analytics", 
      href: "/educator/analytics", 
      icon: TrendingUp,
      description: "Performance insights"
    },
    { 
      title: "Profile", 
      href: "/educator/profile", 
      icon: User,
      description: "Account settings"
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <img src="/placeholder.svg" alt="Logo" className="h-8 w-8" />
          <div>
            <h1 className="text-lg font-bold text-foreground">{companyInfo.name}</h1>
            <p className="text-sm text-muted-foreground">Educator Portal</p>
          </div>
        </div>
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

export default EducatorSidebar;
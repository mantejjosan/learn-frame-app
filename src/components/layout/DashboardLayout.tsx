import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, Bell, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  title: string;
  showSearch?: boolean;
}

const DashboardLayout = ({ children, sidebar, title, showSearch = true }: DashboardLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Top Bar */}
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center gap-4 px-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                {sidebar}
              </SheetContent>
            </Sheet>
            
            <div className="flex-1">
              <h1 className="font-semibold">{title}</h1>
            </div>
            
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>
      </div>

      {/* Desktop Layout */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 min-h-screen border-r bg-background">
          {sidebar}
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Desktop Header */}
          <header className="hidden lg:flex sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6 w-full">
              <h1 className="text-xl font-semibold">{title}</h1>
              
              <div className="flex-1" />
              
              {showSearch && (
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search courses..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon" asChild>
                <Link to="/">
                  <LogOut className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            {showSearch && (
              <div className="lg:hidden p-4 border-b bg-background">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            <div className="p-4 lg:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Alternative approach */}
      {/* This would replace the sidebar on mobile if preferred */}
    </div>
  );
};

export default DashboardLayout;
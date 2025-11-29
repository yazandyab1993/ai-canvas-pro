import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, LogOut, Sparkles, Shield } from "lucide-react";
import type { User } from "@supabase/supabase-js";

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminAccess();
  }, [navigate]);

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    setUser(session.user);

    // Check if user has admin role
    const { data: roleData, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .single();

    if (error || !roleData) {
      toast.error("ليس لديك صلاحيات الوصول لهذه الصفحة");
      navigate("/dashboard");
      return;
    }

    setIsAdmin(true);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 glass-effect sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">لوحة الإدارة</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="glass-effect"
            >
              العودة للوحة المستخدم
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="hover:bg-secondary/50"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Card */}
          <Card className="glass-effect p-8 border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">لوحة التحكم</h1>
                <p className="text-muted-foreground">
                  إدارة المستخدمين، الطلبات، والإعدادات
                </p>
              </div>
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass-effect p-6 border-border/50">
              <h3 className="text-lg font-semibold mb-2">إجمالي المستخدمين</h3>
              <p className="text-4xl font-bold gradient-text">0</p>
            </Card>
            <Card className="glass-effect p-6 border-border/50">
              <h3 className="text-lg font-semibold mb-2">الطلبات النشطة</h3>
              <p className="text-4xl font-bold gradient-text">0</p>
            </Card>
            <Card className="glass-effect p-6 border-border/50">
              <h3 className="text-lg font-semibold mb-2">الطلبات المكتملة</h3>
              <p className="text-4xl font-bold gradient-text">0</p>
            </Card>
          </div>

          {/* Coming Soon */}
          <Card className="glass-effect p-12 border-border/50 text-center">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">قريباً</h2>
            <p className="text-muted-foreground">
              سيتم إضافة وظائف الإدارة الكاملة قريباً
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, LogOut, Sparkles, Image, Video, Coins } from "lucide-react";
import type { User } from "@supabase/supabase-js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentType, setContentType] = useState<"image" | "video">("image");
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        loadCredits(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadCredits = async (userId: string) => {
    const { data, error } = await supabase
      .from("credits")
      .select("balance")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error loading credits:", error);
    } else {
      setCredits(data?.balance || 0);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.error("الرجاء إدخال وصف للمحتوى");
      return;
    }

    setIsSubmitting(true);
    toast.info("سيتم إضافة هذه الوظيفة قريباً");
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 glass-effect sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">AI Studio</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border/50">
              <Coins className="w-5 h-5 text-primary" />
              <span className="font-bold">{credits}</span>
              <span className="text-sm text-muted-foreground">رصيد</span>
            </div>
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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Card */}
          <Card className="glass-effect p-8 border-border/50">
            <h1 className="text-3xl font-bold mb-2">
              مرحباً، <span className="gradient-text">{user?.email}</span>
            </h1>
            <p className="text-muted-foreground">
              ابدأ بإنشاء محتوى مذهل باستخدام الذكاء الاصطناعي
            </p>
          </Card>

          {/* Generation Form */}
          <Card className="glass-effect p-8 border-border/50">
            <h2 className="text-2xl font-bold mb-6">توليد محتوى جديد</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type Selection */}
              <div className="space-y-2">
                <Label>نوع المحتوى</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setContentType("image")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      contentType === "image"
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    <Image className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold">صورة</p>
                    <p className="text-sm text-muted-foreground mt-1">10 رصيد</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentType("video")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      contentType === "video"
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    <Video className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold">فيديو</p>
                    <p className="text-sm text-muted-foreground mt-1">50 رصيد</p>
                  </button>
                </div>
              </div>

              {/* Prompt Input */}
              <div className="space-y-2">
                <Label htmlFor="prompt">وصف المحتوى</Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="صف المحتوى الذي تريد توليده..."
                  className="bg-secondary/50 min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || credits < (contentType === "image" ? 10 : 50)}
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري التوليد...
                  </>
                ) : (
                  <>
                    <Sparkles className="ml-2 w-5 h-5" />
                    توليد {contentType === "image" ? "صورة" : "فيديو"}
                  </>
                )}
              </Button>

              {credits < (contentType === "image" ? 10 : 50) && (
                <p className="text-sm text-destructive text-center">
                  رصيدك غير كافٍ. تحتاج إلى {contentType === "image" ? 10 : 50} رصيد
                </p>
              )}
            </form>
          </Card>

          {/* Info Card */}
          <Card className="glass-effect p-6 border-border/50 bg-accent/10">
            <p className="text-sm text-center">
              <span className="font-semibold">ملاحظة:</span> المحتوى المولّد يتم حفظه لمدة 7 أيام، الرجاء تحميله قبل انتهاء المدة
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

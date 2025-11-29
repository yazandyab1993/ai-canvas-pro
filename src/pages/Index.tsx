import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2, Zap, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard");
    });
  }, [navigate]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">AI Studio</span>
          </div>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/auth")}
              className="hover:bg-secondary/50"
            >
              تسجيل الدخول
            </Button>
            <Button
              onClick={() => navigate("/auth")}
              className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow"
            >
              ابدأ مجاناً
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              حوّل أفكارك إلى{" "}
              <span className="gradient-text">واقع مرئي</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              منصة احترافية لتوليد الصور والفيديوهات باستخدام الذكاء الاصطناعي.
              صمم، أنشئ، وشارك محتوى مذهل في ثوانٍ معدودة.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow text-lg px-8"
              >
                <Sparkles className="ml-2 w-5 h-5" />
                ابدأ الإنشاء الآن
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="glass-effect text-lg px-8"
              >
                اكتشف الإمكانيات
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto">
            <div className="glass-effect rounded-2xl p-8 hover:shadow-glow transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 mx-auto">
                <Wand2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">توليد ذكي</h3>
              <p className="text-muted-foreground">
                استخدم أحدث تقنيات الذكاء الاصطناعي لتوليد صور وفيديوهات عالية الجودة
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8 hover:shadow-glow transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">سرعة فائقة</h3>
              <p className="text-muted-foreground">
                احصل على نتائج مذهلة في ثوانٍ معدودة بفضل البنية التحتية القوية
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8 hover:shadow-glow transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">أمان وخصوصية</h3>
              <p className="text-muted-foreground">
                محتواك محفوظ بأعلى معايير الأمان مع حذف تلقائي بعد 7 أيام
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 glass-effect rounded-3xl p-12 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">
              جاهز لإنشاء{" "}
              <span className="gradient-text">محتوى رائع</span>؟
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">
              انضم الآن وابدأ رحلتك في عالم الإبداع بالذكاء الاصطناعي
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow text-lg px-10"
            >
              <Sparkles className="ml-2 w-5 h-5" />
              ابدأ مجاناً
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              ملاحظة: المحتوى المولّد يتم حفظه لمدة 7 أيام، الرجاء تحميله قبل انتهاء المدة
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 mt-20 border-t border-border/50">
          <div className="text-center text-muted-foreground">
            <p>© 2024 AI Studio. جميع الحقوق محفوظة.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;

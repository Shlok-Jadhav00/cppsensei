import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="min-h-screen py-16 bg-muted/30">
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
              Plans & Access
            </h1>
            <p className="text-xl text-muted-foreground">Simple, honest pricing for learners</p>
          </div>

          <div className="bg-card p-8 rounded-xl border border-border shadow-sm text-center">
            <div className="text-6xl mb-4">🥋</div>
            <h2 className="text-3xl font-bold mb-4">Free Forever</h2>
            <p className="text-muted-foreground mb-6">
              Cpp Sensei is completely free to use! We're building more features to make your learning journey even better.
            </p>
            <div className="space-y-3 mb-8">
              {["Unlimited code explanations", "AI chat assistant", "All tutorials included", "No credit card required"].map((feature, i) => (
                <div key={i} className="flex items-center justify-center gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Button size="lg" onClick={() => navigate('/')}>Start Coding Free</Button>
            <p className="text-sm text-muted-foreground mt-4">More features coming soon! 🚀</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;

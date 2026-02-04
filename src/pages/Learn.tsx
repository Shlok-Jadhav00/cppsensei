import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const Learn = () => {
  return (
    <Layout>
      <section className="min-h-screen py-16 bg-muted/30">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
              Learn with Cpp Sensei
            </h1>
            <p className="text-xl text-muted-foreground">Interactive tutorials designed for absolute beginners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: "📚", title: "Learn C++ from Scratch", desc: "Start your coding journey with zero prior knowledge required" },
              { icon: "🔍", title: "Line by Line Explanations", desc: "Understand every single line of code in simple English" },
              { icon: "💬", title: "Input & Output with cin/cout", desc: "Master how to get input and display output in C++" },
              { icon: "🔄", title: "Variables & Loops", desc: "Learn how to store data and repeat actions efficiently" }
            ].map((item, i) => (
              <div key={i} className="bg-card p-6 rounded-xl border border-border shadow-sm text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                <Button>Start Learning</Button>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-xl p-8 border border-border">
            <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { num: 1, icon: "⌨️", title: "Type Your Code", desc: "Write or paste your C++ code in the editor" },
                { num: 2, icon: "🔍", title: 'Click "Explain"', desc: "Let the AI analyze your code" },
                { num: 3, icon: "📖", title: "Read Explanations", desc: "Get beginner-friendly breakdowns" },
                { num: 4, icon: "💬", title: "Chat with Sensei", desc: "Ask questions anytime" }
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mb-2 mx-auto">
                      {step.num}
                    </div>
                    <div className="text-3xl mb-2">{step.icon}</div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-xs text-muted-foreground max-w-32">{step.desc}</p>
                  </div>
                  {i < 3 && <span className="text-2xl text-muted-foreground hidden lg:block">→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Learn;

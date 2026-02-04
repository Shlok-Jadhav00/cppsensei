import Layout from "@/components/layout/Layout";

const Features = () => {
  return (
    <Layout>
      <section className="min-h-screen py-16">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
              Features that Make Learning Fun
            </h1>
            <p className="text-xl text-muted-foreground">Everything you need to master C++ coding</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🧠", title: "AI Line-by-Line Explanation", desc: "Understand every single line of your code in simple English, perfect for beginners" },
              { icon: "💬", title: "Smart Chat Assistant", desc: "Ask your doubts to Cpp Sensei anytime and get instant, helpful answers" },
              { icon: "🎨", title: "Playful Design", desc: "Learn C++ in a fun, colorful environment that makes coding enjoyable" },
              { icon: "📖", title: "Full Code Summary", desc: "See what your whole program does at once with comprehensive overviews" },
              { icon: "⚡", title: "No Setup Needed", desc: "Just type and learn instantly in your browser - no downloads required" },
              { icon: "🎯", title: "Beginner Focused", desc: "Every explanation assumes zero prior knowledge - we start from the basics" }
            ].map((feature, i) => (
              <div key={i} className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Features;

import Layout from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <section className="min-h-screen py-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
              About Cpp Sensei
            </h1>
            <p className="text-xl text-muted-foreground">Your friendly AI-powered C++ mentor</p>
          </div>

          <div className="space-y-12">
            <div className="bg-card p-8 rounded-xl border border-border">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                Cpp Sensei was built to make learning C++ simple, visual, and fun.
                Every line you write tells a story — and we help you understand it.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border">
              <h2 className="text-2xl font-bold mb-4">Why We Built This</h2>
              <p className="text-muted-foreground">
                We noticed that many students struggle to understand code because traditional tutorials
                just show the code without explaining <em>why</em> each line exists and what it does.
                That's why we created Cpp Sensei - a platform that explains every single line in plain,
                beginner-friendly language. No jargon, no assumptions, just clear explanations.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border">
              <h2 className="text-2xl font-bold mb-4 text-center">Built With</h2>
              <div className="flex justify-center gap-8">
                {[
                  { icon: "HTML5", name: "HTML" },
                  { icon: "CSS3", name: "CSS" },
                  { icon: "JS", name: "JavaScript" },
                  { icon: "🤖", name: "AI Powered" }
                ].map((tech, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center font-bold text-sm mb-2">
                      {tech.icon}
                    </div>
                    <span className="text-sm text-muted-foreground">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

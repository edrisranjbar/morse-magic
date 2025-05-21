import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Timer, Lightbulb, History, Globe, Radio, Wifi } from "lucide-react";

const About = () => {
  const sections = [
    {
      icon: <History className="size-5" />,
      title: "Historical Background",
      content: [
        "Morse code was developed by Samuel Morse and Alfred Vail in the 1830s and 1840s.",
        "It was designed for the telegraph system and revolutionized long-distance communication.",
        "The first official Morse code message was sent in 1844, from Washington, D.C. to Baltimore.",
        "The message read: 'What hath God wrought?'"
      ]
    },
    {
      icon: <Wifi className="size-5" />,
      title: "How It Works",
      content: [
        "Morse code uses combinations of dots (.) and dashes (-) to represent letters and numbers.",
        "A dot is a short signal, while a dash is three times longer.",
        "The space between parts of the same letter is one dot length.",
        "The space between letters is three dot lengths.",
        "The space between words is seven dot lengths."
      ]
    },
    {
      icon: <Timer className="size-5" />,
      title: "Timing and Rhythm",
      content: [
        "Dot: 1 unit",
        "Dash: 3 units",
        "Space between parts of same letter: 1 unit",
        "Space between letters: 3 units",
        "Space between words: 7 units"
      ]
    },
    {
      icon: <Globe className="size-5" />,
      title: "International Usage",
      content: [
        "Morse code became the standard for international maritime communication.",
        "The famous SOS distress signal (... --- ...) was adopted in 1908.",
        "It remains in use today in various forms of communication.",
        "It's particularly valuable in emergency situations where other forms of communication might fail."
      ]
    },
    {
      icon: <Radio className="size-5" />,
      title: "Modern Applications",
      content: [
        "Emergency communications during disasters",
        "Aviation navigation systems",
        "Accessibility tool for people with disabilities",
        "Military communications",
        "Amateur radio operations"
      ]
    },
    {
      icon: <Lightbulb className="size-5" />,
      title: "Learning Tips",
      content: [
        "Focus on sound patterns rather than dots and dashes",
        "Practice regularly in short sessions",
        "Start with common letters (E, T, A, N, I, M)",
        "Use mnemonics to remember patterns",
        "Practice both sending and receiving"
      ]
    }
  ];

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">About Morse Code</h1>
          <p className="text-muted-foreground">
            A timeless communication system that revolutionized global communication
          </p>
        </div>

        <div className="grid gap-6">
          {sections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {section.content.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About; 
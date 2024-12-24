import { Pencil, Brain, BookOpen, Calculator } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./Card";

const SkillInterface = () => {
  const skills = [
    {
      id: 1,
      title: "Writing Practice",
      description:
        "Start your journey with fun writing exercises! Learn letters and words at your own pace.",
      icon: Pencil,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      borderColor: "border-blue-200",
      hoverColor: "hover:border-blue-400",
    },
    {
      id: 2,
      title: "Motor Skills",
      description:
        "Move, play, and grow! Exciting activities to help you develop coordination and strength.",
      icon: Brain,
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      borderColor: "border-green-200",
      hoverColor: "hover:border-green-400",
    },
    {
      id: 3,
      title: "Vocabulary",
      description:
        "Discover new words through pictures and stories. Make learning fun and interactive!",
      icon: BookOpen,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
      borderColor: "border-purple-200",
      hoverColor: "hover:border-purple-400",
    },
    {
      id: 4,
      title: "Mathematics",
      description:
        "Numbers are your friends! Play with shapes, count, and solve fun puzzles.",
      icon: Calculator,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500",
      borderColor: "border-orange-200",
      hoverColor: "hover:border-orange-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Learning Adventure!
          </h1>
          <p className="text-xl text-gray-600">
            Pick an activity and let&apos;s start learning together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill) => {
            const IconComponent = skill.icon;

            return (
              <Card
                key={skill.id}
                className={`transform transition-all duration-300 ${skill.bgColor} ${skill.borderColor} ${skill.hoverColor} border-2 cursor-pointer hover:shadow-xl hover:-translate-y-1`}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full bg-white`}>
                      <IconComponent className={`w-8 h-8 ${skill.iconColor}`} />
                    </div>
                    <CardTitle className={`${skill.iconColor} text-2xl`}>
                      {skill.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-lg">
                    {skill.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillInterface;

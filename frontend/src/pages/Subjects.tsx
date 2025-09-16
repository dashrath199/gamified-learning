import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Play, 
  Trophy, 
  Clock, 
  Target,
  TrendingUp,
  Star,
  Award
} from "lucide-react";

const Subjects = () => {
  // Mock data - replace with actual API calls
  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      icon: "🔢",
      description: "Master mathematical concepts from basic arithmetic to advanced calculus",
      progress: 75,
      totalGames: 24,
      completedGames: 18,
      averageScore: 87,
      xpEarned: 2340,
      timeSpent: "12h 30m",
      difficulty: "Intermediate",
      topics: ["Algebra", "Geometry", "Statistics", "Calculus"],
      recentGames: [
        { name: "Quadratic Equations", score: 92, xp: 120 },
        { name: "Triangle Properties", score: 85, xp: 110 },
        { name: "Data Analysis", score: 94, xp: 130 }
      ]
    },
    {
      id: 2,
      name: "Science",
      icon: "🔬",
      description: "Explore the wonders of physics, chemistry, and biology",
      progress: 60,
      totalGames: 20,
      completedGames: 12,
      averageScore: 82,
      xpEarned: 1890,
      timeSpent: "9h 45m",
      difficulty: "Intermediate",
      topics: ["Physics", "Chemistry", "Biology", "Earth Science"],
      recentGames: [
        { name: "Chemical Bonds", score: 88, xp: 115 },
        { name: "Cell Division", score: 79, xp: 95 },
        { name: "Force & Motion", score: 91, xp: 125 }
      ]
    },
    {
      id: 3,
      name: "English",
      icon: "📚",
      description: "Improve your language skills, grammar, and literature comprehension",
      progress: 85,
      totalGames: 18,
      completedGames: 15,
      averageScore: 91,
      xpEarned: 2150,
      timeSpent: "8h 20m",
      difficulty: "Advanced",
      topics: ["Grammar", "Literature", "Writing", "Vocabulary"],
      recentGames: [
        { name: "Shakespeare Analysis", score: 95, xp: 140 },
        { name: "Essay Structure", score: 89, xp: 120 },
        { name: "Vocabulary Builder", score: 93, xp: 135 }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500";
    return "bg-blue-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-hero bg-clip-text text-transparent">
            Your Subjects
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your progress across different learning areas
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">Active Subjects</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold">45</div>
                  <div className="text-sm text-muted-foreground">Games Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">87%</div>
                  <div className="text-sm text-muted-foreground">Average Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">30h</div>
                  <div className="text-sm text-muted-foreground">Time Studied</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {subjects.map((subject) => (
            <Card key={subject.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{subject.icon}</div>
                    <div>
                      <CardTitle className="text-xl">{subject.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {subject.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(subject.difficulty)}>
                    {subject.difficulty}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {subject.completedGames} of {subject.totalGames} games completed
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-primary">{subject.averageScore}%</div>
                    <div className="text-xs text-muted-foreground">Avg Score</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-primary">{subject.xpEarned}</div>
                    <div className="text-xs text-muted-foreground">XP Earned</div>
                  </div>
                </div>

                {/* Topics */}
                <div>
                  <div className="text-sm font-medium mb-2">Topics Covered</div>
                  <div className="flex flex-wrap gap-1">
                    {subject.topics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Recent Games */}
                <div>
                  <div className="text-sm font-medium mb-2">Recent Games</div>
                  <div className="space-y-2">
                    {subject.recentGames.slice(0, 2).map((game, index) => (
                      <div key={index} className="flex items-center justify-between text-xs p-2 bg-muted/30 rounded">
                        <span className="truncate">{game.name}</span>
                        <div className="flex items-center gap-2 text-primary">
                          <span>{game.score}%</span>
                          <span>+{game.xp} XP</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Button>
                  <Button variant="outline" size="sm">
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievement Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Subject Achievements
            </CardTitle>
            <CardDescription>
              Milestones you've reached in your learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                <div className="text-2xl">🏆</div>
                <div>
                  <div className="font-medium">Math Master</div>
                  <div className="text-sm text-muted-foreground">Completed 15+ math games</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl">🔬</div>
                <div>
                  <div className="font-medium">Science Explorer</div>
                  <div className="text-sm text-muted-foreground">Explored all science topics</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl">📖</div>
                <div>
                  <div className="font-medium">Word Wizard</div>
                  <div className="text-sm text-muted-foreground">90%+ average in English</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subjects;
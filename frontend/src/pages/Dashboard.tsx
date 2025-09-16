import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Star, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Gamepad2,
  Award,
  Zap
} from "lucide-react";

const Dashboard = () => {
  // Mock data - replace with actual API calls
  const userStats = {
    level: 12,
    xp: 2450,
    xpToNext: 550,
    totalGames: 47,
    averageScore: 85,
    streak: 7,
    badges: 12
  };

  const recentGames = [
    { id: 1, title: "Algebra Basics", subject: "Math", score: 92, xp: 120 },
    { id: 2, title: "Cell Biology", subject: "Science", score: 88, xp: 110 },
    { id: 3, title: "Grammar Rules", subject: "English", score: 95, xp: 130 },
  ];

  const subjects = [
    { id: 1, name: "Mathematics", icon: "🔢", progress: 75, games: 15 },
    { id: 2, name: "Science", icon: "🔬", progress: 60, games: 12 },
    { id: 3, name: "English", icon: "📚", progress: 85, games: 20 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-hero bg-clip-text text-transparent">
            Welcome Back, Student!
          </h1>
          <p className="text-lg text-muted-foreground">
            Ready to continue your learning adventure?
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="gradient-primary text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Level</CardTitle>
              <Star className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.level}</div>
              <p className="text-xs opacity-80">
                {userStats.xpToNext} XP to next level
              </p>
            </CardContent>
          </Card>

          <Card className="gradient-accent text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total XP</CardTitle>
              <Zap className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.xp.toLocaleString()}</div>
              <Progress value={75} className="mt-2 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="gradient-success text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Games Played</CardTitle>
              <Gamepad2 className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.totalGames}</div>
              <p className="text-xs opacity-80">
                {userStats.streak} day streak!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.badges}</div>
              <p className="text-xs text-muted-foreground">
                Avg Score: {userStats.averageScore}%
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subjects Progress */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Your Subjects
                </CardTitle>
                <CardDescription>
                  Track your progress across different subjects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {subjects.map((subject) => (
                  <div key={subject.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{subject.icon}</span>
                        <div>
                          <h3 className="font-medium">{subject.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {subject.games} games completed
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">{subject.progress}%</Badge>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                ))}
                <Button className="w-full mt-4" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Explore All Subjects
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Games
                </CardTitle>
                <CardDescription>
                  Your latest gaming sessions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentGames.map((game) => (
                  <div key={game.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{game.title}</h4>
                      <p className="text-xs text-muted-foreground">{game.subject}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{game.score}%</div>
                      <div className="text-xs text-primary">+{game.xp} XP</div>
                    </div>
                  </div>
                ))}
                <Button className="w-full" size="sm">
                  <Gamepad2 className="h-4 w-4 mr-2" />
                  Play New Game
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Gamepad2 className="h-6 w-6" />
                <span>Start Playing</span>
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Trophy className="h-6 w-6" />
                <span>View Leaderboard</span>
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Award className="h-6 w-6" />
                <span>My Achievements</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
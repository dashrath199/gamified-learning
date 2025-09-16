import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Trophy, 
  Star, 
  Calendar, 
  Target, 
  TrendingUp,
  Award,
  Clock,
  BookOpen,
  Gamepad2,
  Edit,
  Settings
} from "lucide-react";

const Profile = () => {
  // Mock data - replace with actual API calls
  const userProfile = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar: "/api/placeholder/120/120",
    grade: "Grade 10",
    joinDate: "September 2023",
    level: 28,
    xp: 15420,
    xpToNext: 580,
    totalGames: 156,
    averageScore: 87,
    timeSpent: "45h 30m",
    streak: 15,
    rank: 1,
    badges: 23
  };

  const achievements = [
    { id: 1, name: "First Steps", description: "Completed your first game", icon: "🎯", earned: true, date: "Sep 15, 2023" },
    { id: 2, name: "Math Whiz", description: "Scored 90%+ in 10 math games", icon: "🔢", earned: true, date: "Oct 2, 2023" },
    { id: 3, name: "Science Explorer", description: "Completed all science topics", icon: "🔬", earned: true, date: "Nov 18, 2023" },
    { id: 4, name: "Speed Demon", description: "Complete a game in under 2 minutes", icon: "⚡", earned: true, date: "Dec 5, 2023" },
    { id: 5, name: "Perfectionist", description: "Score 100% in any game", icon: "💯", earned: true, date: "Dec 20, 2023" },
    { id: 6, name: "Streak Master", description: "Maintain a 30-day streak", icon: "🔥", earned: false, date: null },
    { id: 7, name: "Knowledge Seeker", description: "Play 200 games", icon: "📚", earned: false, date: null },
    { id: 8, name: "Top Scholar", description: "Reach the #1 position", icon: "👑", earned: true, date: "Jan 10, 2024" }
  ];

  const recentActivity = [
    { id: 1, type: "game", title: "Completed Algebra Basics", score: 94, xp: 120, date: "2 hours ago" },
    { id: 2, type: "achievement", title: "Earned 'Top Scholar' badge", date: "1 day ago" },
    { id: 3, type: "game", title: "Completed Cell Biology", score: 88, xp: 110, date: "2 days ago" },
    { id: 4, type: "level", title: "Reached Level 28", date: "3 days ago" },
    { id: 5, type: "game", title: "Completed Grammar Master", score: 96, xp: 130, date: "4 days ago" }
  ];

  const stats = [
    { label: "Games Played", value: userProfile.totalGames, icon: Gamepad2, color: "text-blue-500" },
    { label: "Average Score", value: `${userProfile.averageScore}%`, icon: Target, color: "text-green-500" },
    { label: "Time Spent", value: userProfile.timeSpent, icon: Clock, color: "text-purple-500" },
    { label: "Current Streak", value: `${userProfile.streak} days`, icon: TrendingUp, color: "text-orange-500" }
  ];

  const earnedBadges = achievements.filter(a => a.earned);
  const progressPercentage = Math.round(((userProfile.xp % 1000) / 1000) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-hero bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your learning journey and achievements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  <AvatarFallback className="text-2xl">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{userProfile.name}</CardTitle>
                <CardDescription>{userProfile.email}</CardDescription>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Badge variant="outline">{userProfile.grade}</Badge>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                    Rank #{userProfile.rank}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">Level {userProfile.level}</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {userProfile.xp.toLocaleString()} XP • {userProfile.xpToNext} to next level
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                      <div className="font-semibold">{stat.value}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="achievements" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
              </TabsList>

              <TabsContent value="achievements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      Your Achievements
                    </CardTitle>
                    <CardDescription>
                      {earnedBadges.length} of {achievements.length} badges earned
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`p-4 rounded-lg border transition-all ${
                            achievement.earned
                              ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200'
                              : 'bg-muted/30 border-muted opacity-60'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-2xl">{achievement.icon}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{achievement.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {achievement.description}
                              </p>
                              {achievement.earned && achievement.date && (
                                <div className="text-xs text-muted-foreground">
                                  Earned on {achievement.date}
                                </div>
                              )}
                            </div>
                            {achievement.earned && (
                              <Trophy className="h-5 w-5 text-yellow-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>
                      Your latest games and achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                          <div className="flex-shrink-0">
                            {activity.type === 'game' && <Gamepad2 className="h-5 w-5 text-blue-500" />}
                            {activity.type === 'achievement' && <Award className="h-5 w-5 text-yellow-500" />}
                            {activity.type === 'level' && <Star className="h-5 w-5 text-purple-500" />}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{activity.title}</div>
                            {activity.score && (
                              <div className="text-sm text-muted-foreground">
                                Score: {activity.score}% • +{activity.xp} XP
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">{activity.date}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Learning Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Mathematics</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Science</span>
                          <span>72%</span>
                        </div>
                        <Progress value={72} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>English</span>
                          <span>91%</span>
                        </div>
                        <Progress value={91} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">94%</div>
                          <div className="text-xs text-muted-foreground">Best Score</div>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">15</div>
                          <div className="text-xs text-muted-foreground">Best Streak</div>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">1:45</div>
                          <div className="text-xs text-muted-foreground">Fastest Game</div>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">23</div>
                          <div className="text-xs text-muted-foreground">Total Badges</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
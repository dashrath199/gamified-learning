import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  TrendingUp,
  Calendar,
  Users,
  Target
} from "lucide-react";

const Leaderboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("all-time");
  const [selectedGrade, setSelectedGrade] = useState("all");

  // Mock data - replace with actual API calls
  const leaderboardData = [
    {
      id: 1,
      rank: 1,
      name: "Alex Johnson",
      avatar: "/api/placeholder/40/40",
      grade: "Grade 10",
      xp: 15420,
      level: 28,
      gamesPlayed: 156,
      averageScore: 94,
      badges: 23,
      streak: 15
    },
    {
      id: 2,
      rank: 2,
      name: "Sarah Chen",
      avatar: "/api/placeholder/40/40",
      grade: "Grade 11",
      xp: 14890,
      level: 27,
      gamesPlayed: 142,
      averageScore: 91,
      badges: 21,
      streak: 12
    },
    {
      id: 3,
      rank: 3,
      name: "Marcus Williams",
      avatar: "/api/placeholder/40/40",
      grade: "Grade 9",
      xp: 13750,
      level: 25,
      gamesPlayed: 138,
      averageScore: 89,
      badges: 19,
      streak: 8
    },
    {
      id: 4,
      rank: 4,
      name: "Emma Davis",
      avatar: "/api/placeholder/40/40",
      grade: "Grade 12",
      xp: 12980,
      level: 24,
      gamesPlayed: 134,
      averageScore: 87,
      badges: 18,
      streak: 6
    },
    {
      id: 5,
      rank: 5,
      name: "James Rodriguez",
      avatar: "/api/placeholder/40/40",
      grade: "Grade 10",
      xp: 12340,
      level: 23,
      gamesPlayed: 129,
      averageScore: 85,
      badges: 16,
      streak: 4
    }
  ];

  const topPerformers = [
    { category: "Highest Score", name: "Alex Johnson", value: "98%", icon: Target },
    { category: "Longest Streak", name: "Sarah Chen", value: "25 days", icon: TrendingUp },
    { category: "Most Games", name: "Marcus Williams", value: "203", icon: Users },
    { category: "Most Badges", name: "Emma Davis", value: "31", icon: Medal }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 2: return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 3: return "bg-gradient-to-r from-amber-400 to-amber-600 text-white";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-hero bg-clip-text text-transparent">
            Leaderboard
          </h1>
          <p className="text-lg text-muted-foreground">
            See how you stack up against other learners
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="6">Grade 6</SelectItem>
                  <SelectItem value="7">Grade 7</SelectItem>
                  <SelectItem value="8">Grade 8</SelectItem>
                  <SelectItem value="9">Grade 9</SelectItem>
                  <SelectItem value="10">Grade 10</SelectItem>
                  <SelectItem value="11">Grade 11</SelectItem>
                  <SelectItem value="12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Top Performers
                </CardTitle>
                <CardDescription>
                  Rankings based on total XP earned
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-all hover:shadow-md ${
                        user.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-purple-50' : 'bg-muted/30'
                      }`}
                    >
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(user.rank)}
                      </div>

                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold truncate">{user.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {user.grade}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Level {user.level}</span>
                          <span>•</span>
                          <span>{user.gamesPlayed} games</span>
                          <span>•</span>
                          <span>{user.averageScore}% avg</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          {user.xp.toLocaleString()} XP
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Medal className="h-3 w-3" />
                          {user.badges} badges
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Stats */}
          <div className="space-y-6">
            {/* Top Performers by Category */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <performer.icon className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{performer.category}</div>
                      <div className="text-xs text-muted-foreground">{performer.name}</div>
                    </div>
                    <div className="text-sm font-bold text-primary">{performer.value}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Your Rank */}
            <Card>
              <CardHeader>
                <CardTitle>Your Current Rank</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-primary">#47</div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Your XP: 2,450</div>
                    <div className="text-sm text-muted-foreground">Next rank: 150 XP to go</div>
                  </div>
                  <Button className="w-full">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Climb Higher
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Players</span>
                  <span className="font-medium">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Today</span>
                  <span className="font-medium">423</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Games Played</span>
                  <span className="font-medium">15,692</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Avg Score</span>
                  <span className="font-medium">78%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
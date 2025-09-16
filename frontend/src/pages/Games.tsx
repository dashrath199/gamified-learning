import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Clock, 
  Star, 
  Users, 
  Trophy,
  Play,
  BookOpen
} from "lucide-react";

const Games = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  // Mock data - replace with actual API calls
  const games = [
    {
      id: 1,
      title: "Algebra Fundamentals",
      subject: "Mathematics",
      description: "Master the basics of algebraic equations and expressions",
      difficulty: "Beginner",
      duration: "15 min",
      players: 1247,
      rating: 4.8,
      type: "Multiple Choice",
      xpReward: 120,
      image: "🔢"
    },
    {
      id: 2,
      title: "Cell Biology Explorer",
      subject: "Science",
      description: "Dive deep into the world of cells and their functions",
      difficulty: "Intermediate",
      duration: "20 min",
      players: 892,
      rating: 4.6,
      type: "Interactive",
      xpReward: 150,
      image: "🔬"
    },
    {
      id: 3,
      title: "Grammar Master",
      subject: "English",
      description: "Perfect your grammar skills with engaging exercises",
      difficulty: "Beginner",
      duration: "12 min",
      players: 1534,
      rating: 4.9,
      type: "Fill in the Blanks",
      xpReward: 100,
      image: "📚"
    },
    {
      id: 4,
      title: "Geometry Puzzles",
      subject: "Mathematics",
      description: "Solve challenging geometric problems and theorems",
      difficulty: "Advanced",
      duration: "25 min",
      players: 567,
      rating: 4.7,
      type: "Problem Solving",
      xpReward: 200,
      image: "📐"
    },
    {
      id: 5,
      title: "Chemical Reactions",
      subject: "Science",
      description: "Learn about different types of chemical reactions",
      difficulty: "Intermediate",
      duration: "18 min",
      players: 743,
      rating: 4.5,
      type: "Simulation",
      xpReward: 160,
      image: "⚗️"
    },
    {
      id: 6,
      title: "Creative Writing",
      subject: "English",
      description: "Enhance your creative writing skills and storytelling",
      difficulty: "Intermediate",
      duration: "30 min",
      players: 421,
      rating: 4.8,
      type: "Creative",
      xpReward: 180,
      image: "✍️"
    }
  ];

  const subjects = ["Mathematics", "Science", "English"];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "all" || game.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === "all" || game.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-hero bg-clip-text text-transparent">
            Game Library
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose from our collection of educational games
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Find Your Perfect Game
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  {difficulties.map(difficulty => (
                    <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <Card key={game.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{game.image}</div>
                    <div>
                      <CardTitle className="text-lg">{game.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {game.subject}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(game.difficulty)}>
                    {game.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{game.description}</p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {game.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {game.players.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {game.rating}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm font-medium text-primary">
                    <Trophy className="h-4 w-4" />
                    +{game.xpReward} XP
                  </div>
                  <Badge variant="outline">{game.type}</Badge>
                </div>

                <Button className="w-full group-hover:shadow-md transition-all">
                  <Play className="h-4 w-4 mr-2" />
                  Play Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-lg font-medium mb-2">No games found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria to find more games.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Games;
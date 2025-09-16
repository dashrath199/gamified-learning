import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="text-center py-12">
          <div className="text-8xl mb-6">🎓</div>
          <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Oops! The page you're looking for seems to have wandered off to study somewhere else.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate(-1)} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Button asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
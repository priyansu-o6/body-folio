import { ArrowLeft, User, Mail, Calendar, Scale, Ruler, AlertCircle, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';

const ViewProfile = () => {
  const navigate = useNavigate();
  const { userProfile } = useUser();

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="card-shadow">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No profile found</p>
            <Button onClick={() => navigate('/profile-creation')}>
              Create Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const profileFields = [
    { label: 'Email', value: userProfile.email, icon: Mail },
    { label: 'Name', value: userProfile.name, icon: User },
    { label: 'Age', value: userProfile.age, icon: Calendar },
    { label: 'Gender', value: userProfile.gender, icon: User },
    { label: 'Weight', value: `${userProfile.weight} kg`, icon: Scale },
    { label: 'Height', value: `${userProfile.height} cm`, icon: Ruler }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Sidebar />
      
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 hover:bg-muted"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

        <div className="max-w-4xl mx-auto">
          <Card className="card-shadow mb-6 animate-fade-in">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {profileFields.map((field, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <field.icon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{field.label}</p>
                      <p className="font-medium">{field.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {userProfile.allergies && (
            <Card className="card-shadow mb-6 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-immunity" />
                  Allergies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{userProfile.allergies}</p>
              </CardContent>
            </Card>
          )}

          {userProfile.healthIssues && (
            <Card className="card-shadow animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-medical" />
                  Health Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{userProfile.healthIssues}</p>
              </CardContent>
            </Card>
          )}

          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              onClick={() => navigate('/profile-creation')}
              className="hover-scale"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewProfile;

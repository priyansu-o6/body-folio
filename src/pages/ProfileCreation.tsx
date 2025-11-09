import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';

const ProfileCreation = () => {
  const navigate = useNavigate();
  const { userProfile, setUserProfile } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    allergies: '',
    healthIssues: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.gender || !formData.weight || !formData.height) {
      toast.error('Please fill in all required fields');
      return;
    }

    setUserProfile({ ...userProfile, ...formData } as any);
    toast.success('Profile created successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <Card className="w-full max-w-2xl card-shadow animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Your Health Profile</CardTitle>
          <CardDescription>Tell us about yourself to get personalized insights</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg) *</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="height">Height (cm) *</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="allergies">Allergies (Optional)</Label>
                <Textarea
                  id="allergies"
                  placeholder="List any allergies..."
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  className="resize-none"
                  rows={3}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="healthIssues">Health Issues (Optional)</Label>
                <Textarea
                  id="healthIssues"
                  placeholder="List any current health conditions..."
                  value={formData.healthIssues}
                  onChange={(e) => setFormData({ ...formData, healthIssues: e.target.value })}
                  className="resize-none"
                  rows={3}
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 transition-all hover-scale">
              Save Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCreation;

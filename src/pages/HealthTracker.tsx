import { useState } from 'react';
import { ArrowLeft, Activity, Heart, Droplet, Footprints } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const HealthTracker = () => {
  const navigate = useNavigate();
  const [hasGoals, setHasGoals] = useState<boolean | null>(null);
  const [goals, setGoals] = useState('');

  const vitals = [
    { label: 'Weight', value: '70 kg', icon: Activity, color: 'text-health' },
    { label: 'BMI', value: '22.9', icon: Activity, color: 'text-health' },
    { label: 'Heart Rate', value: '72 bpm', icon: Heart, color: 'text-medical' },
    { label: 'Calories', value: '1,850', icon: Activity, color: 'text-immunity' },
    { label: 'Oxygen', value: '98%', icon: Droplet, color: 'text-health' },
    { label: 'Steps', value: '8,542', icon: Footprints, color: 'text-medical' }
  ];

  const dietPlan = [
    { day: 'Monday', breakfast: 'Oatmeal with berries', lunch: 'Grilled chicken salad', dinner: 'Baked salmon with vegetables' },
    { day: 'Tuesday', breakfast: 'Greek yogurt with honey', lunch: 'Quinoa bowl with chickpeas', dinner: 'Lean beef stir-fry' },
    { day: 'Wednesday', breakfast: 'Whole grain toast with avocado', lunch: 'Turkey wrap with veggies', dinner: 'Grilled fish tacos' },
    { day: 'Thursday', breakfast: 'Smoothie bowl', lunch: 'Lentil soup with bread', dinner: 'Chicken curry with rice' },
    { day: 'Friday', breakfast: 'Scrambled eggs with spinach', lunch: 'Tuna sandwich', dinner: 'Vegetable pasta' },
    { day: 'Saturday', breakfast: 'Pancakes with fruit', lunch: 'Buddha bowl', dinner: 'Grilled steak with sweet potato' },
    { day: 'Sunday', breakfast: 'French toast', lunch: 'Veggie pizza', dinner: 'Roasted chicken with quinoa' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-health/5 to-background">
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

        <h1 className="text-3xl font-bold mb-8 text-health">Health Tracker</h1>

        {/* Health Goals */}
        <Card className="card-shadow mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle>Health Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <p className="text-sm font-medium">Do you have any planned goals with respect to your health?</p>
              <div className="flex gap-4">
                <Button
                  variant={hasGoals === true ? 'default' : 'outline'}
                  onClick={() => setHasGoals(true)}
                  className="flex-1"
                >
                  Yes
                </Button>
                <Button
                  variant={hasGoals === false ? 'default' : 'outline'}
                  onClick={() => setHasGoals(false)}
                  className="flex-1"
                >
                  No
                </Button>
              </div>
            </div>

            {hasGoals === true && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="goals">What are your goals?</Label>
                <Textarea
                  id="goals"
                  placeholder="E.g., Increase weight, reduce body fat, improve muscle mass..."
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  rows={4}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Vitals Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {vitals.map((vital, index) => (
            <Card key={index} className="card-shadow hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <vital.icon className={`h-8 w-8 mb-2 ${vital.color}`} />
                <p className="text-sm text-muted-foreground mb-1">{vital.label}</p>
                <p className="text-2xl font-bold">{vital.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weekly Diet Plan */}
        <Card className="card-shadow animate-fade-in">
          <CardHeader>
            <CardTitle>Weekly Diet Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Day</th>
                    <th className="text-left p-3 font-semibold">Breakfast</th>
                    <th className="text-left p-3 font-semibold">Lunch</th>
                    <th className="text-left p-3 font-semibold">Dinner</th>
                  </tr>
                </thead>
                <tbody>
                  {dietPlan.map((day, index) => (
                    <tr key={index} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="p-3 font-medium">{day.day}</td>
                      <td className="p-3 text-sm">{day.breakfast}</td>
                      <td className="p-3 text-sm">{day.lunch}</td>
                      <td className="p-3 text-sm">{day.dinner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default HealthTracker;

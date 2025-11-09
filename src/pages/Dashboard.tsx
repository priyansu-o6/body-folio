import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';
import humanSilhouette from '@/assets/human-silhouette.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const { reminders, updateReminder } = useUser();
  const [selectedReminder, setSelectedReminder] = useState<string | null>(null);
  const [alarmTime, setAlarmTime] = useState('');

  const handleSetAlarm = () => {
    if (selectedReminder && alarmTime) {
      updateReminder(selectedReminder, alarmTime);
      toast.success('Alarm set successfully!');
      setSelectedReminder(null);
      setAlarmTime('');
    }
  };

  const trackers = [
    { name: 'Health Tracker', color: 'bg-health', path: '/health-tracker', rotation: -60 },
    { name: 'Medical Tracker', color: 'bg-medical', path: '/medical-tracker', rotation: 60 },
    { name: 'Immunity Tracker', color: 'bg-immunity', path: '/immunity-tracker', rotation: 180 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Sidebar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          HealthSync Dashboard
        </h1>

        {/* Interactive Pie Chart Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative aspect-square max-w-md mx-auto">
            {/* Human Silhouette */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <img src={humanSilhouette} alt="Human body" className="w-48 h-48 object-contain opacity-80" />
            </div>

            {/* Pie Chart Slices */}
            <svg viewBox="0 0 200 200" className="w-full h-full animate-scale-in relative z-0">
              {trackers.map((tracker, index) => {
                const rotation = tracker.rotation;
                const nextRotation = trackers[(index + 1) % trackers.length].rotation;
                
                return (
                  <g
                    key={tracker.name}
                    className="cursor-pointer transition-all duration-300 hover:opacity-90"
                    onClick={() => navigate(tracker.path)}
                    style={{ cursor: 'pointer' }}
                  >
                    <path
                      d={`M 100 100 L ${100 + 80 * Math.cos((rotation * Math.PI) / 180)} ${100 + 80 * Math.sin((rotation * Math.PI) / 180)} A 80 80 0 0 1 ${100 + 80 * Math.cos((nextRotation * Math.PI) / 180)} ${100 + 80 * Math.sin((nextRotation * Math.PI) / 180)} Z`}
                      className={tracker.color.replace('bg-', 'fill-')}
                      opacity="0.7"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Labels */}
            <div className="absolute inset-0 pointer-events-none">
              {trackers.map((tracker, index) => {
                const angle = tracker.rotation + 60;
                const radius = 110;
                const x = 50 + (radius / 2) * Math.cos((angle * Math.PI) / 180);
                const y = 50 + (radius / 2) * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <div
                    key={tracker.name}
                    className="absolute text-xs font-medium text-foreground"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {tracker.name.split(' ')[0]}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Today's Reminders */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Today's Reminders</h2>
          <div className="grid gap-4">
            {reminders.map((reminder) => (
              <Card key={reminder.id} className="card-shadow hover-scale">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <h3 className="font-medium">{reminder.title}</h3>
                    <p className="text-sm text-muted-foreground">{reminder.time}</p>
                    {reminder.alarm && (
                      <p className="text-xs text-primary mt-1">Alarm set for {reminder.alarm}</p>
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-muted"
                    onClick={() => setSelectedReminder(reminder.id)}
                  >
                    <Clock className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Alarm Setting Dialog */}
      <Dialog open={!!selectedReminder} onOpenChange={() => setSelectedReminder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Alarm Time</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="alarmTime">Select Time (24-hour format)</Label>
              <Input
                id="alarmTime"
                type="time"
                value={alarmTime}
                onChange={(e) => setAlarmTime(e.target.value)}
              />
            </div>
            <Button onClick={handleSetAlarm} className="w-full">
              Set Alarm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;

import { useState } from 'react';
import { ArrowLeft, Upload, Moon, Pill, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const ImmunityTracker = () => {
  const navigate = useNavigate();
  const [isSick, setIsSick] = useState<boolean | null>(null);
  const [prescription, setPrescription] = useState<File | null>(null);

  const immunityData = [
    { label: 'Vitamin D', value: 'Low', icon: Pill, color: 'text-immunity' },
    { label: 'Vitamin B12', value: 'Normal', icon: Pill, color: 'text-health' },
    { label: 'Iron', value: 'Normal', icon: Pill, color: 'text-health' },
    { label: 'Calcium', value: 'Low', icon: Pill, color: 'text-immunity' }
  ];

  const handlePrescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPrescription(e.target.files[0]);
      toast.success('Prescription uploaded successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-immunity/5 to-background">
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

        <h1 className="text-3xl font-bold mb-8 text-immunity">Immunity Tracker</h1>

        {/* Vitamin Deficiencies */}
        <Card className="card-shadow mb-6 animate-fade-in">
          <CardHeader>
            <CardTitle>Vitamin Deficiencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {immunityData.map((item, index) => (
                <div key={index} className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                  <item.icon className={`h-8 w-8 mb-2 ${item.color}`} />
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className={`text-lg font-bold ${item.value === 'Low' ? 'text-immunity' : 'text-health'}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Allergies */}
        <Card className="card-shadow mb-6 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-immunity" />
              Allergies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium">Pollen</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium">Dust mites</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sleep Tracking */}
        <Card className="card-shadow mb-6 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-immunity" />
              Sleep
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6">
              <p className="text-4xl font-bold text-immunity mb-2">7.5 hrs</p>
              <p className="text-sm text-muted-foreground">Average sleep duration</p>
            </div>
          </CardContent>
        </Card>

        {/* Current Sickness Status */}
        <Card className="card-shadow animate-fade-in">
          <CardHeader>
            <CardTitle>Current Health Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <p className="text-sm font-medium">Are you currently sick?</p>
              <div className="flex gap-4">
                <Button
                  variant={isSick === true ? 'default' : 'outline'}
                  onClick={() => setIsSick(true)}
                  className="flex-1"
                >
                  Yes
                </Button>
                <Button
                  variant={isSick === false ? 'default' : 'outline'}
                  onClick={() => setIsSick(false)}
                  className="flex-1"
                >
                  No
                </Button>
              </div>
            </div>

            {isSick === true && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="sickPrescription">Upload prescription</Label>
                <Input
                  id="sickPrescription"
                  type="file"
                  accept="image/*"
                  onChange={handlePrescriptionUpload}
                  className="cursor-pointer"
                />
                {prescription && (
                  <p className="text-sm text-primary">✓ {prescription.name}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ImmunityTracker;

import { useState } from 'react';
import { ArrowLeft, Plus, Upload, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Medicine {
  id: string;
  name: string;
  time: string;
}

const MedicalTracker = () => {
  const navigate = useNavigate();
  const [diseases, setDiseases] = useState('');
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [newMedicine, setNewMedicine] = useState({ name: '', time: '' });
  const [prescription, setPrescription] = useState<File | null>(null);
  const [appointmentTime, setAppointmentTime] = useState('');

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.time) {
      setMedicines([...medicines, { ...newMedicine, id: Date.now().toString() }]);
      setNewMedicine({ name: '', time: '' });
      toast.success('Medicine added successfully!');
    }
  };

  const handlePrescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPrescription(e.target.files[0]);
      toast.success('Prescription uploaded successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-medical/5 to-background">
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

        <h1 className="text-3xl font-bold mb-8 text-medical">Medical Tracker</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Diseases/Health Problems */}
          <Card className="card-shadow animate-fade-in">
            <CardHeader>
              <CardTitle>Current Health Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="diseases">Enter diseases or health problems</Label>
              <Input
                id="diseases"
                placeholder="E.g., Hypertension, Diabetes..."
                value={diseases}
                onChange={(e) => setDiseases(e.target.value)}
                className="mt-2"
              />
            </CardContent>
          </Card>

          {/* Prescription Upload */}
          <Card className="card-shadow animate-fade-in">
            <CardHeader>
              <CardTitle>Prescription</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="prescription">Upload prescription image</Label>
              <div className="mt-2">
                <Input
                  id="prescription"
                  type="file"
                  accept="image/*"
                  onChange={handlePrescriptionUpload}
                  className="cursor-pointer"
                />
                {prescription && (
                  <p className="text-sm text-primary mt-2">✓ {prescription.name}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Medicines List */}
          <Card className="card-shadow animate-fade-in md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Medicines</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Medicine
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Medicine</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="medicineName">Medicine Name</Label>
                      <Input
                        id="medicineName"
                        placeholder="Enter medicine name"
                        value={newMedicine.name}
                        onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medicineTime">Time</Label>
                      <Input
                        id="medicineTime"
                        type="time"
                        value={newMedicine.time}
                        onChange={(e) => setNewMedicine({ ...newMedicine, time: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleAddMedicine} className="w-full">
                      Add Medicine
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {medicines.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No medicines added yet</p>
              ) : (
                <div className="space-y-3">
                  {medicines.map((medicine) => (
                    <div key={medicine.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{medicine.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {medicine.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Doctor Appointment */}
          <Card className="card-shadow animate-fade-in md:col-span-2">
            <CardHeader>
              <CardTitle>Doctor Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="appointmentTime">Set appointment time</Label>
                <Input
                  id="appointmentTime"
                  type="datetime-local"
                  value={appointmentTime}
                  onChange={(e) => {
                    setAppointmentTime(e.target.value);
                    toast.success('Appointment time set!');
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MedicalTracker;

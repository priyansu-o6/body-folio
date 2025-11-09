import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  email: string;
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  allergies?: string;
  healthIssues?: string;
}

interface Reminder {
  id: string;
  type: 'doctor' | 'medication';
  title: string;
  time: string;
  alarm?: string;
}

interface UserContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  reminders: Reminder[];
  addReminder: (reminder: Reminder) => void;
  updateReminder: (id: string, alarm: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      type: 'doctor',
      title: 'Dr. Sarah Johnson - General Checkup',
      time: '10:00 AM'
    },
    {
      id: '2',
      type: 'medication',
      title: 'Vitamin D Supplement',
      time: '9:00 AM'
    }
  ]);

  const addReminder = (reminder: Reminder) => {
    setReminders([...reminders, reminder]);
  };

  const updateReminder = (id: string, alarm: string) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, alarm } : r));
  };

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile, reminders, addReminder, updateReminder }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

import { useState, useEffect, useCallback } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '@/lib/firebase';
import { StudentRecord, StudentData } from '@/types/student';

const STORAGE_KEY = 'currentStudent';

export const useAuth = () => {
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setStudent(JSON.parse(stored));
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (studentId: string, passcode: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const studentsRef = ref(database, 'vbts/grade-post/student');
      const snapshot = await get(studentsRef);
      
      if (!snapshot.exists()) {
        return { success: false, error: 'Unable to connect to database' };
      }

      const students = snapshot.val();
      
      for (const key of Object.keys(students)) {
        if (key === '0') continue; // Skip header row
        
        const record: StudentRecord = students[key];
        
        const recordId = String(record.t1key110 || '').trim();
        const recordPass = String(record.t1key112 || '').trim().toUpperCase();
        const inputId = String(studentId).trim();
        const inputPass = String(passcode).trim().toUpperCase();
        
        if (recordId === inputId && recordPass === inputPass) {
          const studentData: StudentData = {
            studentId: record.t1key110,
            name: record.t1item120,
            program: record.t1item130,
            phone: record.t1item140,
            email: record.t1item150,
            registrationDate: record.t1item160,
            dob: record.t1item170,
            totalCourses: record.t1item180,
            totalCredits: record.t1item190,
            gpa: record.t1item200,
          };
          
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(studentData));
          setStudent(studentData);
          return { success: true };
        }
      }
      
      return { success: false, error: 'Invalid Student ID or Passcode' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred. Please try again.' };
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setStudent(null);
  }, []);

  return { student, loading, login, logout };
};
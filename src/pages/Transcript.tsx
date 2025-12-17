import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  GraduationCap, 
  LogOut, 
  User, 
  BookOpen, 
  Phone, 
  Mail, 
  Calendar, 
  Award,
  Hash,
  Loader2
} from 'lucide-react';
import { GradeEntry } from '@/types/student';

const Transcript = () => {
  const { student, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [grades, setGrades] = useState<GradeEntry[]>([]);
  const [gradeHeaders, setGradeHeaders] = useState<string[]>([]);
  const [loadingGrades, setLoadingGrades] = useState(true);

  useEffect(() => {
    if (!authLoading && !student) {
      navigate('/');
    }
  }, [student, authLoading, navigate]);

  useEffect(() => {
    const fetchGrades = async () => {
      if (!student) return;
      
      try {
        const gradesRef = ref(database, 'vbts/grade-post/grade-entry');
        const snapshot = await get(gradesRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          const entries: GradeEntry[] = [];
          let headers: string[] = [];
          
          // Get header from key "0"
          if (data['0']) {
            headers = Object.values(data['0']) as string[];
          }
          
          // Get student's grades - match by StudentID
          for (const key of Object.keys(data)) {
            if (key === '0') continue;
            const entry = data[key];
            // Check if this grade belongs to the logged-in student
            const entryStudentId = String(Object.values(entry)[0] || '').trim();
            if (entryStudentId === String(student.studentId).trim()) {
              entries.push(entry);
            }
          }
          
          setGradeHeaders(headers);
          setGrades(entries);
        }
      } catch (error) {
        console.error('Error fetching grades:', error);
      } finally {
        setLoadingGrades(false);
      }
    };

    fetchGrades();
  }, [student]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-navy" />
      </div>
    );
  }

  if (!student) return null;

  const InfoItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
      <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-gold-dark" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
        <p className="text-foreground font-medium truncate">{value || 'N/A'}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-hero sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h1 className="text-lg font-serif text-primary-foreground font-bold">
                  Student Transcript
                </h1>
                <p className="text-xs text-primary-foreground/70">
                  Virtual Bible Training School
                </p>
              </div>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6 max-w-5xl">
        {/* Student Info Card */}
        <Card className="shadow-card animate-fade-in border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-navy to-navy-light text-primary-foreground pb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gold" />
              </div>
              <div>
                <CardTitle className="text-xl font-serif">{student.name}</CardTitle>
                <p className="text-primary-foreground/80 text-sm">ID: {student.studentId}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <InfoItem icon={BookOpen} label="Program" value={student.program} />
              <InfoItem icon={Mail} label="Email" value={student.email} />
              <InfoItem icon={Phone} label="Phone" value={student.phone} />
              <InfoItem icon={Calendar} label="Registration Date" value={student.registrationDate} />
              <InfoItem icon={Calendar} label="Date of Birth" value={student.dob} />
              <InfoItem icon={Hash} label="Total Courses" value={student.totalCourses} />
              <InfoItem icon={Hash} label="Total Credits" value={student.totalCredits} />
              <InfoItem icon={Award} label="GPA" value={student.gpa} />
            </div>
          </CardContent>
        </Card>

        {/* Grades Table */}
        <Card className="shadow-card animate-fade-in border-0" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="text-lg font-serif text-navy flex items-center gap-2">
              <Award className="w-5 h-5 text-gold" />
              Academic Record
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loadingGrades ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-navy" />
              </div>
            ) : grades.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      {gradeHeaders.map((header, index) => (
                        <TableHead key={index} className="font-semibold text-foreground whitespace-nowrap">
                          {header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grades.map((grade, rowIndex) => (
                      <TableRow key={rowIndex} className="hover:bg-muted/30 transition-colors">
                        {Object.values(grade).map((value, cellIndex) => (
                          <TableCell key={cellIndex} className="whitespace-nowrap">
                            {String(value)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No grade records found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-8">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Virtual Bible Training School. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Transcript;
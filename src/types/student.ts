export interface StudentRecord {
  t1key110: string;  // StudentID
  t1key112: string;  // Passcode
  t1item120: string; // Name
  t1item130: string; // Program
  t1item140: string; // Phone
  t1item150: string; // Email
  t1item160: string; // RegistrationDate
  t1item170: string; // DOB
  t1item180: string; // TotalCourses
  t1item190: string; // TotalCredits
  t1item200: string; // GPA
}

export interface GradeEntry {
  [key: string]: string | number;
}

export interface StudentData {
  studentId: string;
  name: string;
  program: string;
  phone: string;
  email: string;
  registrationDate: string;
  dob: string;
  totalCourses: string;
  totalCredits: string;
  gpa: string;
}
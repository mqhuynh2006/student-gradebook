export interface StudentRecord {
  t1key110: string;  // StudentID
  t1key112: string;  // Passcode
  t1item120: string; // Name
  t1item130: string; // Program
  t1item140: string; // Phone
  t1item150: string; // Email
  t1item160: string; // RegistrationDate
  t1item170: string; // DOB
  t1item200: string; // GPA
}

export interface GradeEntry {
  t2key120: string;   // StudentID
  t2item130: string;  // Course_Code
  t2item140: string;  // Course_Description
  t2item150: string;  // Course_Date
  t2item160: string;  // Course_Professor
  t2item170: string;  // Credit
  t2item180: string;  // Score
  t2item190: string;  // Grade
}

export interface StudentData {
  studentId: string;
  name: string;
  program: string;
  phone: string;
  email: string;
  registrationDate: string;
  dob: string;
  gpa: string;
}

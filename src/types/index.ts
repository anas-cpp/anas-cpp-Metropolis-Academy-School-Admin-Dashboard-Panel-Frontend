export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'ADMIN' 
  | 'TEACHER' 
  | 'ACCOUNTANT' 
  | 'STUDENT' 
  | 'PARENT' 
  | 'LIBRARIAN';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type StudentStatus = 'ACTIVE' | 'INACTIVE' | 'TRANSFERRED' | 'GRADUATED' | 'SUSPENDED';
export type StaffEmploymentType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT';
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY' | 'EXCUSED';
export type ExamType = 'UNIT_TEST' | 'MIDTERM' | 'FINAL' | 'QUIZ' | 'ASSIGNMENT';
export type InvoiceStatus = 'PENDING' | 'PARTIAL' | 'PAID' | 'OVERDUE' | 'CANCELLED';
export type BookIssueStatus = 'ISSUED' | 'RETURNED' | 'OVERDUE' | 'LOST';
export type EventType = 'HOLIDAY' | 'EXAM' | 'PTM' | 'SPORTS' | 'CULTURAL' | 'OTHER';

export interface User {
  id: string;
  email: string;
  username?: string;
  role: UserRole;
  status: UserStatus;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  mustResetPassword?: boolean;
}

export interface Student {
  id: string;
  userId: string;
  user: User;
  admissionNumber: string;
  rollNumber?: string;
  dateOfBirth: string;
  gender: Gender;
  bloodGroup?: string;
  address?: string;
  medicalNotes?: string;
  previousSchool?: string;
  photoUrl?: string;
  status: StudentStatus;
  classId?: string;
  className?: string;
  sectionId?: string;
  sectionName?: string;
  admissionDate: string;
  guardians?: Guardian[];
  attendanceRate?: number;
}

export interface Guardian {
  id: string;
  userId: string;
  user: User;
  relationship: string;
  occupation?: string;
}

export interface Staff {
  id: string;
  userId: string;
  user: User;
  employeeId: string;
  designation: string;
  department?: string;
  specialization?: string;
  qualifications?: string;
  employmentType: StaffEmploymentType;
  joinDate: string;
  salary?: number;
  photoUrl?: string;
}

export interface ClassRoom {
  id: string;
  name: string; // e.g. Grade 10
  code: string;
  sections: Section[];
}

export interface Section {
  id: string;
  name: string; // e.g. A
  classId: string;
  className?: string;
  classTeacherId?: string;
  classTeacherName?: string;
  capacity: number;
  studentCount?: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  department?: string;
  isElective?: boolean;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName?: string;
  rollNumber?: string;
  date: string;
  status: AttendanceStatus;
  remarks?: string;
}

export interface Exam {
  id: string;
  title: string;
  type: ExamType;
  academicYear: string;
  startDate: string;
  endDate: string;
  isPublished: boolean;
}

export interface ExamResult {
  id: string;
  examId: string;
  examTitle?: string;
  studentId: string;
  studentName?: string;
  subjectId: string;
  subjectName?: string;
  marksObtained: number;
  maxMarks: number;
  grade?: string;
  remarks?: string;
}

export interface FeeStructure {
  id: string;
  name: string;
  academicYear: string;
  classId?: string;
  className?: string;
  amount: number;
  dueDate: string;
  description?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  admissionNumber: string;
  className: string;
  amount: number;
  paidAmount: number;
  status: InvoiceStatus;
  dueDate: string;
  issueDate: string;
  items: { description: string; amount: number }[];
}

export interface HomeworkAssignment {
  id: string;
  title: string;
  description: string;
  subjectName: string;
  className: string;
  teacherName: string;
  dueDate: string;
  postedDate: string;
  attachmentUrl?: string;
  submissionCount?: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  scope: 'SCHOOL' | 'CLASS' | 'INDIVIDUAL';
  authorName: string;
  authorRole: string;
  createdAt: string;
  isPinned?: boolean;
  targetClassName?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
}

export interface BookIssue {
  id: string;
  bookTitle: string;
  borrowerName: string;
  borrowerRole: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: BookIssueStatus;
  fineAmount?: number;
}

export interface TransportRoute {
  id: string;
  routeName: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  fare: number;
  stops: string[];
  studentCount: number;
}

export interface AcademicEvent {
  id: string;
  title: string;
  type: EventType;
  startDate: string;
  endDate?: string;
  description?: string;
  targetRoles: UserRole[];
}

export interface AuditLog {
  id: string;
  action: string;
  entity: string;
  performedBy: string;
  timestamp: string;
  details: string;
}

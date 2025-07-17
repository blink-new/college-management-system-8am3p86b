export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'student' | 'admin' | 'staff';
  studentId?: string;
  department?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  enrollmentDate?: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  description?: string;
  credits: number;
  department: string;
  semester: string;
  academicYear: string;
  instructorId?: string;
  maxStudents: number;
  enrolledStudents: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: string;
  grade?: string;
  status: 'enrolled' | 'completed' | 'dropped' | 'failed';
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface Schedule {
  id: string;
  courseId: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string;
  endTime: string;
  room: string;
  building?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface AcademicRecord {
  id: string;
  studentId: string;
  courseId: string;
  semester: string;
  academicYear: string;
  grade?: string;
  credits: number;
  gpaPoints?: number;
  status: 'in_progress' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface Notification {
  id: string;
  recipientId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: string;
  userId: string;
}
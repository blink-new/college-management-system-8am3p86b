import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Award,
  TrendingUp,
  FileText,
  Download,
  GraduationCap,
  BookOpen,
  Calendar,
  BarChart3
} from 'lucide-react';
import { AcademicRecord, Course, User } from '@/types';
import blink from '@/blink/client';

export function AcademicRecords() {
  const [records, setRecords] = useState<AcademicRecord[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<AcademicRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AcademicRecord | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
    semester: 'Fall 2024',
    academicYear: '2024-2025',
    grade: '',
    credits: 3,
    gpaPoints: 0,
    status: 'in_progress' as const
  });

  const gradeScale = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
  };

  useEffect(() => {
    // Mock data for demonstration
    const mockStudents: User[] = [
      {
        id: '1',
        email: 'john.doe@college.edu',
        fullName: 'John Doe',
        role: 'student',
        studentId: 'STU001',
        department: 'Computer Science',
        status: 'active',
        createdAt: '2022-09-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        userId: 'user1'
      },
      {
        id: '4',
        email: 'alice.johnson@college.edu',
        fullName: 'Alice Johnson',
        role: 'student',
        studentId: 'STU002',
        department: 'Biology',
        status: 'active',
        createdAt: '2021-09-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        userId: 'user4'
      },
      {
        id: '6',
        email: 'bob.smith@college.edu',
        fullName: 'Bob Smith',
        role: 'student',
        studentId: 'STU003',
        department: 'Mathematics',
        status: 'active',
        createdAt: '2023-09-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        userId: 'user6'
      }
    ];

    const mockCourses: Course[] = [
      {
        id: '1',
        courseCode: 'CS101',
        courseName: 'Introduction to Computer Science',
        credits: 3,
        department: 'Computer Science',
        semester: 'Fall 2024',
        academicYear: '2024-2025',
        maxStudents: 30,
        enrolledStudents: 25,
        status: 'active',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        userId: 'user1'
      },
      {
        id: '2',
        courseCode: 'MATH201',
        courseName: 'Calculus II',
        credits: 4,
        department: 'Mathematics',
        semester: 'Fall 2024',
        academicYear: '2024-2025',
        maxStudents: 25,
        enrolledStudents: 22,
        status: 'active',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        userId: 'user1'
      },
      {
        id: '3',
        courseCode: 'BIO301',
        courseName: 'Molecular Biology',
        credits: 3,
        department: 'Biology',
        semester: 'Fall 2024',
        academicYear: '2024-2025',
        maxStudents: 20,
        enrolledStudents: 18,
        status: 'active',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        userId: 'user1'
      },
      {
        id: '4',
        courseCode: 'ENG102',
        courseName: 'English Composition',
        credits: 3,
        department: 'English',
        semester: 'Spring 2024',
        academicYear: '2023-2024',
        maxStudents: 25,
        enrolledStudents: 20,
        status: 'active',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        userId: 'user1'
      }
    ];

    const mockRecords: AcademicRecord[] = [
      {
        id: '1',
        studentId: '1',
        courseId: '1',
        semester: 'Fall 2024',
        academicYear: '2024-2025',
        grade: 'A',
        credits: 3,
        gpaPoints: 4.0,
        status: 'completed',
        createdAt: '2024-08-15T00:00:00Z',
        updatedAt: '2024-12-15T00:00:00Z',
        userId: 'user1'
      },
      {
        id: '2',
        studentId: '1',
        courseId: '2',
        semester: 'Fall 2024',
        academicYear: '2024-2025',
        grade: 'B+',
        credits: 4,
        gpaPoints: 3.3,
        status: 'completed',
        createdAt: '2024-08-15T00:00:00Z',
        updatedAt: '2024-12-15T00:00:00Z',
        userId: 'user1'
      },
      {
        id: '3',
        studentId: '4',
        courseId: '3',
        semester: 'Fall 2024',
        academicYear: '2024-2025',
        grade: 'A-',
        credits: 3,
        gpaPoints: 3.7,
        status: 'completed',
        createdAt: '2024-08-15T00:00:00Z',
        updatedAt: '2024-12-15T00:00:00Z',
        userId: 'user4'
      },
      {
        id: '4',
        studentId: '1',
        courseId: '4',
        semester: 'Spring 2024',
        academicYear: '2023-2024',
        grade: 'B',
        credits: 3,
        gpaPoints: 3.0,
        status: 'completed',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-05-15T00:00:00Z',
        userId: 'user1'
      },
      {
        id: '5',
        studentId: '6',
        courseId: '2',
        semester: 'Fall 2024',
        academicYear: '2024-2025',
        credits: 4,
        status: 'in_progress',
        createdAt: '2024-08-15T00:00:00Z',
        updatedAt: '2024-08-15T00:00:00Z',
        userId: 'user6'
      }
    ];

    // Simulate loading data
    setTimeout(() => {
      setStudents(mockStudents);
      setCourses(mockCourses);
      setRecords(mockRecords);
      setFilteredRecords(mockRecords);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = records;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(record => {
        const student = students.find(s => s.id === record.studentId);
        const course = courses.find(c => c.id === record.courseId);
        return (
          student?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student?.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course?.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course?.courseName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Filter by student
    if (selectedStudent !== 'all') {
      filtered = filtered.filter(record => record.studentId === selectedStudent);
    }

    // Filter by semester
    if (selectedSemester !== 'all') {
      filtered = filtered.filter(record => record.semester === selectedSemester);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(record => record.status === selectedStatus);
    }

    setFilteredRecords(filtered);
  }, [records, students, courses, searchTerm, selectedStudent, selectedSemester, selectedStatus]);

  const handleCreateRecord = async () => {
    try {
      const gpaPoints = formData.grade ? gradeScale[formData.grade as keyof typeof gradeScale] || 0 : 0;
      
      const newRecord: AcademicRecord = {
        id: Date.now().toString(),
        ...formData,
        gpaPoints,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'current-user-id'
      };

      setRecords(prev => [...prev, newRecord]);
      setIsCreateDialogOpen(false);
      resetForm();
      
      const student = students.find(s => s.id === formData.studentId);
      const course = courses.find(c => c.id === formData.courseId);
      toast({
        title: "Academic record created successfully",
        description: `Record for ${student?.fullName} in ${course?.courseCode} has been added.`,
      });
    } catch (error) {
      toast({
        title: "Error creating record",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleEditRecord = async () => {
    if (!selectedRecord) return;

    try {
      const gpaPoints = formData.grade ? gradeScale[formData.grade as keyof typeof gradeScale] || 0 : 0;
      
      const updatedRecord: AcademicRecord = {
        ...selectedRecord,
        ...formData,
        gpaPoints,
        updatedAt: new Date().toISOString(),
      };

      setRecords(prev => prev.map(record => record.id === selectedRecord.id ? updatedRecord : record));
      setIsEditDialogOpen(false);
      setSelectedRecord(null);
      resetForm();
      
      const student = students.find(s => s.id === formData.studentId);
      const course = courses.find(c => c.id === formData.courseId);
      toast({
        title: "Academic record updated successfully",
        description: `Record for ${student?.fullName} in ${course?.courseCode} has been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error updating record",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRecord = async (recordId: string) => {
    try {
      setRecords(prev => prev.filter(record => record.id !== recordId));
      toast({
        title: "Academic record deleted successfully",
        description: "The record has been removed from the system.",
      });
    } catch (error) {
      toast({
        title: "Error deleting record",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      studentId: '',
      courseId: '',
      semester: 'Fall 2024',
      academicYear: '2024-2025',
      grade: '',
      credits: 3,
      gpaPoints: 0,
      status: 'in_progress'
    });
  };

  const openEditDialog = (record: AcademicRecord) => {
    setSelectedRecord(record);
    setFormData({
      studentId: record.studentId,
      courseId: record.courseId,
      semester: record.semester,
      academicYear: record.academicYear,
      grade: record.grade || '',
      credits: record.credits,
      gpaPoints: record.gpaPoints || 0,
      status: record.status
    });
    setIsEditDialogOpen(true);
  };

  const getGradeBadgeColor = (grade: string) => {
    if (['A+', 'A', 'A-'].includes(grade)) return 'bg-green-100 text-green-800';
    if (['B+', 'B', 'B-'].includes(grade)) return 'bg-blue-100 text-blue-800';
    if (['C+', 'C', 'C-'].includes(grade)) return 'bg-yellow-100 text-yellow-800';
    if (['D+', 'D', 'D-'].includes(grade)) return 'bg-orange-100 text-orange-800';
    if (grade === 'F') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateStudentGPA = (studentId: string) => {
    const studentRecords = records.filter(r => r.studentId === studentId && r.status === 'completed' && r.gpaPoints !== undefined);
    if (studentRecords.length === 0) return 0;
    
    const totalPoints = studentRecords.reduce((sum, record) => sum + (record.gpaPoints || 0) * record.credits, 0);
    const totalCredits = studentRecords.reduce((sum, record) => sum + record.credits, 0);
    
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  const generateTranscript = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    const studentRecords = records.filter(r => r.studentId === studentId);
    
    if (!student) return;

    // Group records by academic year and semester
    const groupedRecords = studentRecords.reduce((acc, record) => {
      const key = `${record.academicYear}-${record.semester}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(record);
      return acc;
    }, {} as Record<string, AcademicRecord[]>);

    // Generate transcript content
    let transcriptContent = `OFFICIAL TRANSCRIPT\n\n`;
    transcriptContent += `Student: ${student.fullName}\n`;
    transcriptContent += `Student ID: ${student.studentId}\n`;
    transcriptContent += `Department: ${student.department}\n`;
    transcriptContent += `Generated: ${new Date().toLocaleDateString()}\n\n`;

    Object.entries(groupedRecords).forEach(([period, periodRecords]) => {
      transcriptContent += `${period}\n`;
      transcriptContent += `${'='.repeat(50)}\n`;
      
      periodRecords.forEach(record => {
        const course = courses.find(c => c.id === record.courseId);
        transcriptContent += `${course?.courseCode || 'N/A'}\t${course?.courseName || 'N/A'}\t${record.credits}\t${record.grade || 'IP'}\t${record.gpaPoints?.toFixed(2) || '0.00'}\n`;
      });
      
      const semesterCredits = periodRecords.reduce((sum, r) => sum + r.credits, 0);
      const semesterGPA = periodRecords.filter(r => r.gpaPoints !== undefined).length > 0 
        ? periodRecords.reduce((sum, r) => sum + (r.gpaPoints || 0) * r.credits, 0) / semesterCredits 
        : 0;
      
      transcriptContent += `\nSemester Credits: ${semesterCredits}\tSemester GPA: ${semesterGPA.toFixed(2)}\n\n`;
    });

    const overallGPA = calculateStudentGPA(studentId);
    const totalCredits = studentRecords.reduce((sum, r) => sum + r.credits, 0);
    
    transcriptContent += `CUMULATIVE SUMMARY\n`;
    transcriptContent += `Total Credits: ${totalCredits}\n`;
    transcriptContent += `Cumulative GPA: ${overallGPA.toFixed(2)}\n`;

    // Create and download file
    const blob = new Blob([transcriptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript_${student.studentId}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Transcript generated",
      description: `Transcript for ${student.fullName} has been downloaded.`,
    });
  };

  const semesters = [...new Set(records.map(r => r.semester))];
  
  const stats = {
    totalRecords: records.length,
    completedCourses: records.filter(r => r.status === 'completed').length,
    inProgressCourses: records.filter(r => r.status === 'in_progress').length,
    averageGPA: students.length > 0 
      ? students.reduce((sum, student) => sum + calculateStudentGPA(student.id), 0) / students.length 
      : 0
  };

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Academic Records</h2>
          <p className="text-muted-foreground">Track student grades and generate transcripts</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Record
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create Academic Record</DialogTitle>
                <DialogDescription>
                  Add a new academic record for a student.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student</Label>
                    <Select value={formData.studentId} onValueChange={(value) => setFormData(prev => ({ ...prev, studentId: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map(student => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.fullName} ({student.studentId})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courseId">Course</Label>
                    <Select value={formData.courseId} onValueChange={(value) => {
                      const course = courses.find(c => c.id === value);
                      setFormData(prev => ({ 
                        ...prev, 
                        courseId: value,
                        credits: course?.credits || 3
                      }));
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map(course => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.courseCode} - {course.courseName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Select value={formData.semester} onValueChange={(value) => setFormData(prev => ({ ...prev, semester: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                        <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                        <SelectItem value="Summer 2025">Summer 2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Academic Year</Label>
                    <Input
                      id="academicYear"
                      value={formData.academicYear}
                      onChange={(e) => setFormData(prev => ({ ...prev, academicYear: e.target.value }))}
                      placeholder="e.g., 2024-2025"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade</Label>
                    <Select value={formData.grade} onValueChange={(value) => {
                      const gpaPoints = gradeScale[value as keyof typeof gradeScale] || 0;
                      setFormData(prev => ({ ...prev, grade: value, gpaPoints }));
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(gradeScale).map(grade => (
                          <SelectItem key={grade} value={grade}>
                            {grade} ({gradeScale[grade as keyof typeof gradeScale]})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credits">Credits</Label>
                    <Input
                      id="credits"
                      type="number"
                      value={formData.credits}
                      onChange={(e) => setFormData(prev => ({ ...prev, credits: parseInt(e.target.value) || 3 }))}
                      min="1"
                      max="6"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateRecord} disabled={!formData.studentId || !formData.courseId}>
                  Create Record
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRecords}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedCourses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgressCourses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageGPA.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="records" className="space-y-4">
        <TabsList>
          <TabsTrigger value="records">Academic Records</TabsTrigger>
          <TabsTrigger value="transcripts">Student Transcripts</TabsTrigger>
          <TabsTrigger value="analytics">Grade Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Records</CardTitle>
              <CardDescription>Search and filter student academic records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    {students.map(student => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Semesters</SelectItem>
                    {semesters.map(semester => (
                      <SelectItem key={semester} value={semester}>{semester}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Records Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => {
                    const student = students.find(s => s.id === record.studentId);
                    const course = courses.find(c => c.id === record.courseId);
                    return (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{student?.fullName}</div>
                            <div className="text-sm text-muted-foreground">{student?.studentId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{course?.courseCode}</div>
                            <div className="text-sm text-muted-foreground">{course?.courseName}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">{record.semester}</div>
                            <div className="text-xs text-muted-foreground">{record.academicYear}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {record.grade ? (
                            <Badge variant="secondary" className={getGradeBadgeColor(record.grade)}>
                              {record.grade}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>{record.credits}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getStatusBadgeColor(record.status)}>
                            {record.status.replace('_', ' ').charAt(0).toUpperCase() + record.status.replace('_', ' ').slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(record)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteRecord(record.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transcripts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Transcripts</CardTitle>
              <CardDescription>Generate and download official transcripts for students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map(student => {
                  const studentRecords = records.filter(r => r.studentId === student.id);
                  const gpa = calculateStudentGPA(student.id);
                  const totalCredits = studentRecords.reduce((sum, r) => sum + r.credits, 0);
                  const completedCredits = studentRecords.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.credits, 0);
                  
                  return (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium">{student.fullName}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {student.studentId} • {student.department}
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <span>GPA: <strong>{gpa.toFixed(2)}</strong></span>
                          <span>Credits: <strong>{completedCredits}/{totalCredits}</strong></span>
                          <span>Courses: <strong>{studentRecords.length}</strong></span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right text-sm">
                          <div>Progress</div>
                          <Progress value={(completedCredits / Math.max(totalCredits, 1)) * 100} className="w-24" />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => generateTranscript(student.id)}
                          disabled={studentRecords.length === 0}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Transcript
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Distribution of grades across all courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.keys(gradeScale).map(grade => {
                    const count = records.filter(r => r.grade === grade).length;
                    const percentage = records.length > 0 ? (count / records.filter(r => r.grade).length) * 100 : 0;
                    return (
                      <div key={grade} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className={getGradeBadgeColor(grade)}>
                            {grade}
                          </Badge>
                          <span className="text-sm">{count} students</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={percentage} className="w-20" />
                          <span className="text-sm text-muted-foreground w-12">
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Average GPA by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[...new Set(students.map(s => s.department))].filter(Boolean).map(department => {
                    const deptStudents = students.filter(s => s.department === department);
                    const avgGPA = deptStudents.length > 0 
                      ? deptStudents.reduce((sum, student) => sum + calculateStudentGPA(student.id), 0) / deptStudents.length 
                      : 0;
                    
                    return (
                      <div key={department} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="font-medium">{department}</div>
                          <div className="text-sm text-muted-foreground">
                            {deptStudents.length} students
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{avgGPA.toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">Average GPA</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Record Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Academic Record</DialogTitle>
            <DialogDescription>
              Update the academic record information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-studentId">Student</Label>
                <Select value={formData.studentId} onValueChange={(value) => setFormData(prev => ({ ...prev, studentId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map(student => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.fullName} ({student.studentId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-courseId">Course</Label>
                <Select value={formData.courseId} onValueChange={(value) => {
                  const course = courses.find(c => c.id === value);
                  setFormData(prev => ({ 
                    ...prev, 
                    courseId: value,
                    credits: course?.credits || 3
                  }));
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.courseCode} - {course.courseName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-semester">Semester</Label>
                <Select value={formData.semester} onValueChange={(value) => setFormData(prev => ({ ...prev, semester: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                    <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                    <SelectItem value="Summer 2025">Summer 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-academicYear">Academic Year</Label>
                <Input
                  id="edit-academicYear"
                  value={formData.academicYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, academicYear: e.target.value }))}
                  placeholder="e.g., 2024-2025"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-grade">Grade</Label>
                <Select value={formData.grade} onValueChange={(value) => {
                  const gpaPoints = gradeScale[value as keyof typeof gradeScale] || 0;
                  setFormData(prev => ({ ...prev, grade: value, gpaPoints }));
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(gradeScale).map(grade => (
                      <SelectItem key={grade} value={grade}>
                        {grade} ({gradeScale[grade as keyof typeof gradeScale]})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-credits">Credits</Label>
                <Input
                  id="edit-credits"
                  type="number"
                  value={formData.credits}
                  onChange={(e) => setFormData(prev => ({ ...prev, credits: parseInt(e.target.value) || 3 }))}
                  min="1"
                  max="6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditRecord} disabled={!formData.studentId || !formData.courseId}>
              Update Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
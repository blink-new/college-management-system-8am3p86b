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
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  BookOpen,
  Users,
  GraduationCap,
  Calendar,
  Filter,
  Download,
  UserPlus,
  Clock,
  Award
} from 'lucide-react';
import { Course, Enrollment, User } from '@/types';
import blink from '@/blink/client';

export function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    courseCode: '',
    courseName: '',
    description: '',
    credits: 3,
    department: '',
    semester: 'Fall 2024',
    academicYear: '2024-2025',
    instructorId: '',
    maxStudents: 30,
    status: 'active' as const
  });

  const [enrollmentData, setEnrollmentData] = useState({
    studentId: '',
    courseId: ''
  });

  useEffect(() => {
    // Mock data for demonstration
    const mockCourses: Course[] = [
      {
        id: '1',
        courseCode: 'CS101',
        courseName: 'Introduction to Computer Science',
        description: 'Basic concepts of programming and computer science fundamentals.',
        credits: 3,
        department: 'Computer Science',
        semester: 'Fall 2024',
        academicYear: '2024-2025',
        instructorId: '2',
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
        description: 'Advanced calculus including integration techniques and series.',
        credits: 4,
        department: 'Mathematics',
        semester: 'Fall 2024',
        academicYear: '2024-2025',
        instructorId: '3',
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
        description: 'Study of biological processes at the molecular level.',
        credits: 3,
        department: 'Biology',
        semester: 'Fall 2024',
        academicYear: '2024-2025',
        instructorId: '4',
        maxStudents: 20,
        enrolledStudents: 18,
        status: 'active',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        userId: 'user1'
      },
      {
        id: '4',
        courseCode: 'PHYS101',
        courseName: 'General Physics I',
        description: 'Introduction to mechanics, waves, and thermodynamics.',
        credits: 4,
        department: 'Physics',
        semester: 'Spring 2025',
        academicYear: '2024-2025',
        instructorId: '5',
        maxStudents: 35,
        enrolledStudents: 12,
        status: 'active',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        userId: 'user1'
      },
      {
        id: '5',
        courseCode: 'ENG102',
        courseName: 'English Composition',
        description: 'Advanced writing and composition skills.',
        credits: 3,
        department: 'English',
        semester: 'Fall 2024',
        academicYear: '2024-2025',
        maxStudents: 25,
        enrolledStudents: 0,
        status: 'inactive',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        userId: 'user1'
      }
    ];

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
      }
    ];

    const mockEnrollments: Enrollment[] = [
      {
        id: '1',
        studentId: '1',
        courseId: '1',
        enrollmentDate: '2024-08-15T00:00:00Z',
        status: 'enrolled',
        createdAt: '2024-08-15T00:00:00Z',
        updatedAt: '2024-08-15T00:00:00Z',
        userId: 'user1'
      },
      {
        id: '2',
        studentId: '4',
        courseId: '3',
        enrollmentDate: '2024-08-15T00:00:00Z',
        status: 'enrolled',
        createdAt: '2024-08-15T00:00:00Z',
        updatedAt: '2024-08-15T00:00:00Z',
        userId: 'user4'
      }
    ];

    // Simulate loading data
    setTimeout(() => {
      setCourses(mockCourses);
      setEnrollments(mockEnrollments);
      setStudents(mockStudents);
      setFilteredCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = courses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by department
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(course => course.department === selectedDepartment);
    }

    // Filter by semester
    if (selectedSemester !== 'all') {
      filtered = filtered.filter(course => course.semester === selectedSemester);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(course => course.status === selectedStatus);
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedDepartment, selectedSemester, selectedStatus]);

  const handleCreateCourse = async () => {
    try {
      const newCourse: Course = {
        id: Date.now().toString(),
        ...formData,
        enrolledStudents: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'current-user-id'
      };

      setCourses(prev => [...prev, newCourse]);
      setIsCreateDialogOpen(false);
      resetForm();
      toast({
        title: "Course created successfully",
        description: `${newCourse.courseName} has been added to the system.`,
      });
    } catch (error) {
      toast({
        title: "Error creating course",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleEditCourse = async () => {
    if (!selectedCourse) return;

    try {
      const updatedCourse: Course = {
        ...selectedCourse,
        ...formData,
        updatedAt: new Date().toISOString(),
      };

      setCourses(prev => prev.map(course => course.id === selectedCourse.id ? updatedCourse : course));
      setIsEditDialogOpen(false);
      setSelectedCourse(null);
      resetForm();
      toast({
        title: "Course updated successfully",
        description: `${updatedCourse.courseName} has been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error updating course",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      setCourses(prev => prev.filter(course => course.id !== courseId));
      toast({
        title: "Course deleted successfully",
        description: "The course has been removed from the system.",
      });
    } catch (error) {
      toast({
        title: "Error deleting course",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleEnrollStudent = async () => {
    try {
      const newEnrollment: Enrollment = {
        id: Date.now().toString(),
        studentId: enrollmentData.studentId,
        courseId: enrollmentData.courseId,
        enrollmentDate: new Date().toISOString(),
        status: 'enrolled',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'current-user-id'
      };

      setEnrollments(prev => [...prev, newEnrollment]);
      
      // Update enrolled students count
      setCourses(prev => prev.map(course => 
        course.id === enrollmentData.courseId 
          ? { ...course, enrolledStudents: course.enrolledStudents + 1 }
          : course
      ));

      setIsEnrollDialogOpen(false);
      setEnrollmentData({ studentId: '', courseId: '' });
      
      const student = students.find(s => s.id === enrollmentData.studentId);
      const course = courses.find(c => c.id === enrollmentData.courseId);
      
      toast({
        title: "Student enrolled successfully",
        description: `${student?.fullName} has been enrolled in ${course?.courseName}.`,
      });
    } catch (error) {
      toast({
        title: "Error enrolling student",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      courseCode: '',
      courseName: '',
      description: '',
      credits: 3,
      department: '',
      semester: 'Fall 2024',
      academicYear: '2024-2025',
      instructorId: '',
      maxStudents: 30,
      status: 'active'
    });
  };

  const openEditDialog = (course: Course) => {
    setSelectedCourse(course);
    setFormData({
      courseCode: course.courseCode,
      courseName: course.courseName,
      description: course.description || '',
      credits: course.credits,
      department: course.department,
      semester: course.semester,
      academicYear: course.academicYear,
      instructorId: course.instructorId || '',
      maxStudents: course.maxStudents,
      status: course.status
    });
    setIsEditDialogOpen(true);
  };

  const openEnrollDialog = (course: Course) => {
    setEnrollmentData({ studentId: '', courseId: course.id });
    setIsEnrollDialogOpen(true);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEnrollmentStatus = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return { percentage: 0, status: 'empty' };
    
    const percentage = (course.enrolledStudents / course.maxStudents) * 100;
    
    if (percentage >= 90) return { percentage, status: 'full' };
    if (percentage >= 70) return { percentage, status: 'high' };
    if (percentage >= 40) return { percentage, status: 'medium' };
    return { percentage, status: 'low' };
  };

  const departments = [...new Set(courses.map(c => c.department))];
  const semesters = [...new Set(courses.map(c => c.semester))];

  const stats = {
    total: courses.length,
    active: courses.filter(c => c.status === 'active').length,
    totalEnrollments: enrollments.length,
    averageEnrollment: courses.length > 0 ? Math.round(courses.reduce((sum, c) => sum + c.enrolledStudents, 0) / courses.length) : 0
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
          <h2 className="text-3xl font-bold tracking-tight">Course Management</h2>
          <p className="text-muted-foreground">Manage courses and student enrollments</p>
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
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
                <DialogDescription>
                  Add a new course to the college management system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="courseCode">Course Code</Label>
                    <Input
                      id="courseCode"
                      value={formData.courseCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, courseCode: e.target.value }))}
                      placeholder="e.g., CS101"
                    />
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course Name</Label>
                  <Input
                    id="courseName"
                    value={formData.courseName}
                    onChange={(e) => setFormData(prev => ({ ...prev, courseName: e.target.value }))}
                    placeholder="Enter course name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter course description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                      placeholder="Enter department"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxStudents">Max Students</Label>
                    <Input
                      id="maxStudents"
                      type="number"
                      value={formData.maxStudents}
                      onChange={(e) => setFormData(prev => ({ ...prev, maxStudents: parseInt(e.target.value) || 30 }))}
                      min="1"
                    />
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
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCourse}>Create Course</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEnrollments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Enrollment</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageEnrollment}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle>Course Directory</CardTitle>
              <CardDescription>Search and filter courses by department, semester, and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Semesters</SelectItem>
                    {semesters.map(sem => (
                      <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Courses Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Enrollment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => {
                    const enrollmentStatus = getEnrollmentStatus(course.id);
                    return (
                      <TableRow key={course.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{course.courseCode}</div>
                            <div className="text-sm text-muted-foreground">{course.courseName}</div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Award className="mr-1 h-3 w-3" />
                              {course.credits} credits
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{course.department}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">{course.semester}</div>
                            <div className="text-xs text-muted-foreground">{course.academicYear}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="text-sm">
                              {course.enrolledStudents}/{course.maxStudents} students
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  enrollmentStatus.status === 'full' ? 'bg-red-500' :
                                  enrollmentStatus.status === 'high' ? 'bg-yellow-500' :
                                  enrollmentStatus.status === 'medium' ? 'bg-blue-500' :
                                  'bg-green-500'
                                }`}
                                style={{ width: `${enrollmentStatus.percentage}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getStatusBadgeColor(course.status)}>
                            {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEnrollDialog(course)}
                              disabled={course.enrolledStudents >= course.maxStudents}
                            >
                              <UserPlus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(course)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCourse(course.id)}
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

        <TabsContent value="enrollments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Enrollments</CardTitle>
              <CardDescription>View and manage student course enrollments</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Enrollment Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.map((enrollment) => {
                    const student = students.find(s => s.id === enrollment.studentId);
                    const course = courses.find(c => c.id === enrollment.courseId);
                    return (
                      <TableRow key={enrollment.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{student?.fullName}</div>
                            <div className="text-sm text-muted-foreground">{student?.email}</div>
                            <div className="text-xs text-muted-foreground">ID: {student?.studentId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{course?.courseCode}</div>
                            <div className="text-sm text-muted-foreground">{course?.courseName}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEnrollments(prev => prev.filter(e => e.id !== enrollment.id));
                              setCourses(prev => prev.map(c => 
                                c.id === enrollment.courseId 
                                  ? { ...c, enrolledStudents: Math.max(0, c.enrolledStudents - 1) }
                                  : c
                              ));
                              toast({
                                title: "Student unenrolled",
                                description: "The student has been removed from the course.",
                              });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Update course information in the college management system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-courseCode">Course Code</Label>
                <Input
                  id="edit-courseCode"
                  value={formData.courseCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, courseCode: e.target.value }))}
                  placeholder="e.g., CS101"
                />
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-courseName">Course Name</Label>
              <Input
                id="edit-courseName"
                value={formData.courseName}
                onChange={(e) => setFormData(prev => ({ ...prev, courseName: e.target.value }))}
                placeholder="Enter course name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter course description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-department">Department</Label>
                <Input
                  id="edit-department"
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Enter department"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-maxStudents">Max Students</Label>
                <Input
                  id="edit-maxStudents"
                  type="number"
                  value={formData.maxStudents}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxStudents: parseInt(e.target.value) || 30 }))}
                  min="1"
                />
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
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCourse}>Update Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Enroll Student Dialog */}
      <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Enroll Student</DialogTitle>
            <DialogDescription>
              Select a student to enroll in this course.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="studentSelect">Student</Label>
              <Select value={enrollmentData.studentId} onValueChange={(value) => setEnrollmentData(prev => ({ ...prev, studentId: value }))}>
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEnrollDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEnrollStudent} disabled={!enrollmentData.studentId}>
              Enroll Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
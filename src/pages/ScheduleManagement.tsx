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
import { toast } from '@/hooks/use-toast';
import {
  Plus,
  Calendar,
  Clock,
  MapPin,
  Edit,
  Trash2,
  BookOpen,
  Users,
  AlertTriangle,
  Filter,
  Download
} from 'lucide-react';
import { Schedule, Course } from '@/types';
import blink from '@/blink/client';

export function ScheduleManagement() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSchedule, setSelectedScheduleItem] = useState<Schedule | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    courseId: '',
    dayOfWeek: 'Monday' as const,
    startTime: '09:00',
    endTime: '10:30',
    room: '',
    building: ''
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  useEffect(() => {
    // Mock data for demonstration
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
      }
    ];

    const mockSchedules: Schedule[] = [
      {
        id: '1',
        courseId: '1',
        dayOfWeek: 'Monday',
        startTime: '09:00',
        endTime: '10:30',
        room: '101',
        building: 'Computer Science Building',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        userId: 'user1'
      },
      {
        id: '2',
        courseId: '1',
        dayOfWeek: 'Wednesday',
        startTime: '09:00',
        endTime: '10:30',
        room: '101',
        building: 'Computer Science Building',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        userId: 'user1'
      },
      {
        id: '3',
        courseId: '1',
        dayOfWeek: 'Friday',
        startTime: '09:00',
        endTime: '10:30',
        room: '101',
        building: 'Computer Science Building',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        userId: 'user1'
      },
      {
        id: '4',
        courseId: '2',
        dayOfWeek: 'Tuesday',
        startTime: '11:00',
        endTime: '12:30',
        room: '205',
        building: 'Mathematics Building',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        userId: 'user1'
      },
      {
        id: '5',
        courseId: '2',
        dayOfWeek: 'Thursday',
        startTime: '11:00',
        endTime: '12:30',
        room: '205',
        building: 'Mathematics Building',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        userId: 'user1'
      },
      {
        id: '6',
        courseId: '3',
        dayOfWeek: 'Monday',
        startTime: '14:00',
        endTime: '15:30',
        room: '301',
        building: 'Biology Building',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        userId: 'user1'
      },
      {
        id: '7',
        courseId: '3',
        dayOfWeek: 'Wednesday',
        startTime: '14:00',
        endTime: '15:30',
        room: '301',
        building: 'Biology Building',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        userId: 'user1'
      }
    ];

    // Simulate loading data
    setTimeout(() => {
      setCourses(mockCourses);
      setSchedules(mockSchedules);
      setFilteredSchedules(mockSchedules);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = schedules;

    // Filter by day
    if (selectedDay !== 'all') {
      filtered = filtered.filter(schedule => schedule.dayOfWeek === selectedDay);
    }

    // Filter by course
    if (selectedCourse !== 'all') {
      filtered = filtered.filter(schedule => schedule.courseId === selectedCourse);
    }

    setFilteredSchedules(filtered);
  }, [schedules, selectedDay, selectedCourse]);

  const handleCreateSchedule = async () => {
    try {
      // Check for conflicts
      const hasConflict = schedules.some(schedule => 
        schedule.dayOfWeek === formData.dayOfWeek &&
        schedule.room === formData.room &&
        schedule.building === formData.building &&
        (
          (formData.startTime >= schedule.startTime && formData.startTime < schedule.endTime) ||
          (formData.endTime > schedule.startTime && formData.endTime <= schedule.endTime) ||
          (formData.startTime <= schedule.startTime && formData.endTime >= schedule.endTime)
        )
      );

      if (hasConflict) {
        toast({
          title: "Schedule conflict detected",
          description: "This room is already booked during the selected time slot.",
          variant: "destructive",
        });
        return;
      }

      const newSchedule: Schedule = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'current-user-id'
      };

      setSchedules(prev => [...prev, newSchedule]);
      setIsCreateDialogOpen(false);
      resetForm();
      
      const course = courses.find(c => c.id === formData.courseId);
      toast({
        title: "Schedule created successfully",
        description: `${course?.courseCode} has been scheduled for ${formData.dayOfWeek} at ${formData.startTime}.`,
      });
    } catch (error) {
      toast({
        title: "Error creating schedule",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleEditSchedule = async () => {
    if (!selectedSchedule) return;

    try {
      // Check for conflicts (excluding current schedule)
      const hasConflict = schedules.some(schedule => 
        schedule.id !== selectedSchedule.id &&
        schedule.dayOfWeek === formData.dayOfWeek &&
        schedule.room === formData.room &&
        schedule.building === formData.building &&
        (
          (formData.startTime >= schedule.startTime && formData.startTime < schedule.endTime) ||
          (formData.endTime > schedule.startTime && formData.endTime <= schedule.endTime) ||
          (formData.startTime <= schedule.startTime && formData.endTime >= schedule.endTime)
        )
      );

      if (hasConflict) {
        toast({
          title: "Schedule conflict detected",
          description: "This room is already booked during the selected time slot.",
          variant: "destructive",
        });
        return;
      }

      const updatedSchedule: Schedule = {
        ...selectedSchedule,
        ...formData,
        updatedAt: new Date().toISOString(),
      };

      setSchedules(prev => prev.map(schedule => schedule.id === selectedSchedule.id ? updatedSchedule : schedule));
      setIsEditDialogOpen(false);
      setSelectedScheduleItem(null);
      resetForm();
      
      const course = courses.find(c => c.id === formData.courseId);
      toast({
        title: "Schedule updated successfully",
        description: `${course?.courseCode} schedule has been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error updating schedule",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    try {
      setSchedules(prev => prev.filter(schedule => schedule.id !== scheduleId));
      toast({
        title: "Schedule deleted successfully",
        description: "The schedule has been removed from the system.",
      });
    } catch (error) {
      toast({
        title: "Error deleting schedule",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      courseId: '',
      dayOfWeek: 'Monday',
      startTime: '09:00',
      endTime: '10:30',
      room: '',
      building: ''
    });
  };

  const openEditDialog = (schedule: Schedule) => {
    setSelectedScheduleItem(schedule);
    setFormData({
      courseId: schedule.courseId,
      dayOfWeek: schedule.dayOfWeek,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      room: schedule.room,
      building: schedule.building || ''
    });
    setIsEditDialogOpen(true);
  };

  const getSchedulesByDay = (day: string) => {
    return schedules
      .filter(schedule => schedule.dayOfWeek === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const getConflicts = () => {
    const conflicts: { schedule1: Schedule; schedule2: Schedule }[] = [];
    
    for (let i = 0; i < schedules.length; i++) {
      for (let j = i + 1; j < schedules.length; j++) {
        const s1 = schedules[i];
        const s2 = schedules[j];
        
        if (s1.dayOfWeek === s2.dayOfWeek && s1.room === s2.room && s1.building === s2.building) {
          const hasTimeConflict = (
            (s1.startTime >= s2.startTime && s1.startTime < s2.endTime) ||
            (s1.endTime > s2.startTime && s1.endTime <= s2.endTime) ||
            (s1.startTime <= s2.startTime && s1.endTime >= s2.endTime)
          );
          
          if (hasTimeConflict) {
            conflicts.push({ schedule1: s1, schedule2: s2 });
          }
        }
      }
    }
    
    return conflicts;
  };

  const conflicts = getConflicts();
  const stats = {
    totalSchedules: schedules.length,
    totalCourses: courses.length,
    conflicts: conflicts.length,
    roomsUsed: new Set(schedules.map(s => `${s.building} - ${s.room}`)).size
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
          <h2 className="text-3xl font-bold tracking-tight">Schedule Management</h2>
          <p className="text-muted-foreground">Manage class schedules and room assignments</p>
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
                Add Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Schedule</DialogTitle>
                <DialogDescription>
                  Add a new class schedule to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="courseId">Course</Label>
                  <Select value={formData.courseId} onValueChange={(value) => setFormData(prev => ({ ...prev, courseId: value }))}>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dayOfWeek">Day of Week</Label>
                    <Select value={formData.dayOfWeek} onValueChange={(value: any) => setFormData(prev => ({ ...prev, dayOfWeek: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        {daysOfWeek.map(day => (
                          <SelectItem key={day} value={day}>{day}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room">Room</Label>
                    <Input
                      id="room"
                      value={formData.room}
                      onChange={(e) => setFormData(prev => ({ ...prev, room: e.target.value }))}
                      placeholder="e.g., 101"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Select value={formData.startTime} onValueChange={(value) => setFormData(prev => ({ ...prev, startTime: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Select value={formData.endTime} onValueChange={(value) => setFormData(prev => ({ ...prev, endTime: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select end time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="building">Building</Label>
                  <Input
                    id="building"
                    value={formData.building}
                    onChange={(e) => setFormData(prev => ({ ...prev, building: e.target.value }))}
                    placeholder="e.g., Computer Science Building"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateSchedule} disabled={!formData.courseId || !formData.room}>
                  Create Schedule
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
            <CardTitle className="text-sm font-medium">Total Schedules</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSchedules}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rooms Used</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.roomsUsed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conflicts</CardTitle>
            <AlertTriangle className={`h-4 w-4 ${stats.conflicts > 0 ? 'text-red-500' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats.conflicts > 0 ? 'text-red-500' : ''}`}>
              {stats.conflicts}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          {conflicts.length > 0 && (
            <TabsTrigger value="conflicts" className="text-red-600">
              Conflicts ({conflicts.length})
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>View all class schedules in a weekly calendar format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-4">
                {daysOfWeek.map(day => (
                  <div key={day} className="space-y-2">
                    <div className="font-semibold text-center p-2 bg-primary/10 rounded-lg">
                      {day}
                    </div>
                    <div className="space-y-2 min-h-[400px]">
                      {getSchedulesByDay(day).map(schedule => {
                        const course = courses.find(c => c.id === schedule.courseId);
                        return (
                          <div
                            key={schedule.id}
                            className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm cursor-pointer hover:bg-blue-100 transition-colors"
                            onClick={() => openEditDialog(schedule)}
                          >
                            <div className="font-medium text-blue-900">{course?.courseCode}</div>
                            <div className="text-blue-700 text-xs">{course?.courseName}</div>
                            <div className="flex items-center text-blue-600 text-xs mt-1">
                              <Clock className="mr-1 h-3 w-3" />
                              {schedule.startTime} - {schedule.endTime}
                            </div>
                            <div className="flex items-center text-blue-600 text-xs">
                              <MapPin className="mr-1 h-3 w-3" />
                              {schedule.room} {schedule.building && `- ${schedule.building}`}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule List</CardTitle>
              <CardDescription>Filter and view all schedules in a list format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Days</SelectItem>
                    {daysOfWeek.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Filter by course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.courseCode} - {course.courseName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Schedules Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Day & Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSchedules.map((schedule) => {
                    const course = courses.find(c => c.id === schedule.courseId);
                    return (
                      <TableRow key={schedule.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{course?.courseCode}</div>
                            <div className="text-sm text-muted-foreground">{course?.courseName}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{schedule.dayOfWeek}</div>
                            <div className="text-sm text-muted-foreground">
                              {schedule.startTime} - {schedule.endTime}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">Room {schedule.room}</div>
                            {schedule.building && (
                              <div className="text-sm text-muted-foreground">{schedule.building}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(schedule)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteSchedule(schedule.id)}
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

        {conflicts.length > 0 && (
          <TabsContent value="conflicts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Schedule Conflicts</CardTitle>
                <CardDescription>Resolve scheduling conflicts between courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conflicts.map((conflict, index) => {
                    const course1 = courses.find(c => c.id === conflict.schedule1.courseId);
                    const course2 = courses.find(c => c.id === conflict.schedule2.courseId);
                    return (
                      <div key={index} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                        <div className="flex items-center mb-2">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                          <span className="font-medium text-red-800">Room Conflict Detected</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <div className="font-medium">{course1?.courseCode}</div>
                            <div className="text-muted-foreground">{course1?.courseName}</div>
                            <div>{conflict.schedule1.dayOfWeek} {conflict.schedule1.startTime} - {conflict.schedule1.endTime}</div>
                            <div>Room {conflict.schedule1.room} - {conflict.schedule1.building}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="font-medium">{course2?.courseCode}</div>
                            <div className="text-muted-foreground">{course2?.courseName}</div>
                            <div>{conflict.schedule2.dayOfWeek} {conflict.schedule2.startTime} - {conflict.schedule2.endTime}</div>
                            <div>Room {conflict.schedule2.room} - {conflict.schedule2.building}</div>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditDialog(conflict.schedule1)}
                          >
                            Edit First Schedule
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditDialog(conflict.schedule2)}
                          >
                            Edit Second Schedule
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {/* Edit Schedule Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Schedule</DialogTitle>
            <DialogDescription>
              Update the class schedule information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-courseId">Course</Label>
              <Select value={formData.courseId} onValueChange={(value) => setFormData(prev => ({ ...prev, courseId: value }))}>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-dayOfWeek">Day of Week</Label>
                <Select value={formData.dayOfWeek} onValueChange={(value: any) => setFormData(prev => ({ ...prev, dayOfWeek: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-room">Room</Label>
                <Input
                  id="edit-room"
                  value={formData.room}
                  onChange={(e) => setFormData(prev => ({ ...prev, room: e.target.value }))}
                  placeholder="e.g., 101"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-startTime">Start Time</Label>
                <Select value={formData.startTime} onValueChange={(value) => setFormData(prev => ({ ...prev, startTime: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-endTime">End Time</Label>
                <Select value={formData.endTime} onValueChange={(value) => setFormData(prev => ({ ...prev, endTime: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-building">Building</Label>
              <Input
                id="edit-building"
                value={formData.building}
                onChange={(e) => setFormData(prev => ({ ...prev, building: e.target.value }))}
                placeholder="e.g., Computer Science Building"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSchedule} disabled={!formData.courseId || !formData.room}>
              Update Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
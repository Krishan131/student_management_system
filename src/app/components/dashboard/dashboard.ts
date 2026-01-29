import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

interface DashboardStats {
    totalStudents: number;
    totalCourses: number;
    recentEnrollments: number;
    activeStudents: number;
}

interface CourseDistribution {
    course: string;
    count: number;
}

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, RouterLink],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
    stats: DashboardStats = {
        totalStudents: 0,
        totalCourses: 0,
        recentEnrollments: 0,
        activeStudents: 0
    };

    recentStudents: Student[] = [];
    courseDistribution: CourseDistribution[] = [];
    students: Student[] = [];

    constructor(
        private studentService: StudentService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.studentService.getStudents().subscribe(students => {
            this.students = students;
            this.calculateStats(students);
            this.getRecentStudents(students);
            this.calculateCourseDistribution(students);
        });
    }

    viewCourseStudents(course: string): void {
        this.router.navigate(['/students'], { queryParams: { course } });
    }

    private calculateStats(students: Student[]): void {
        const currentYear = new Date().getFullYear();

        this.stats.totalStudents = students.length;

        // Get unique courses
        const uniqueCourses = new Set(students.map(s => s.course));
        this.stats.totalCourses = uniqueCourses.size;

        // Count enrollments in current year
        this.stats.recentEnrollments = students.filter(
            s => s.enrollmentYear === currentYear
        ).length;

        // For demo purposes, consider all students as active
        this.stats.activeStudents = students.length;
    }

    private getRecentStudents(students: Student[]): void {
        // Get last 5 students (assuming higher IDs are more recent)
        this.recentStudents = [...students]
            .sort((a, b) => b.id - a.id)
            .slice(0, 5);
    }

    private calculateCourseDistribution(students: Student[]): void {
        const courseMap = new Map<string, number>();

        students.forEach(student => {
            const count = courseMap.get(student.course) || 0;
            courseMap.set(student.course, count + 1);
        });

        this.courseDistribution = Array.from(courseMap.entries())
            .map(([course, count]) => ({ course, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5); // Top 5 courses
    }
}

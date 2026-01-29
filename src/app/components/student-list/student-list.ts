import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchQuery: string = '';
  selectedCourse: string = '';

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
      this.filterStudents();
    });

    this.route.queryParams.subscribe(params => {
      if (params['course']) {
        this.selectedCourse = params['course'];
        this.filterStudents();
      }
    });
  }

  get uniqueCourses(): string[] {
    const courses = this.students.map(s => s.course);
    return Array.from(new Set(courses)).sort();
  }

  filterStudents(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredStudents = this.students.filter(student => {
      const matchesSearch = !query ||
        student.firstName.toLowerCase().includes(query) ||
        student.lastName.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.course.toLowerCase().includes(query);

      const matchesCourse = !this.selectedCourse || student.course === this.selectedCourse;

      return matchesSearch && matchesCourse;
    });
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id);
    }
  }
}


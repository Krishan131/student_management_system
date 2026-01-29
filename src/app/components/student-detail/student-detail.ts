import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './student-detail.html',
  styleUrl: './student-detail.css',
})
export class StudentDetail implements OnInit {
  student?: Student;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.student = this.studentService.getStudentById(+id);
      if (!this.student) {
        this.router.navigate(['/students']);
      }
    }
  }

  deleteStudent(): void {
    if (this.student && confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(this.student.id);
      this.router.navigate(['/students']);
    }
  }
}


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css',
})
export class StudentForm implements OnInit {
  studentForm: FormGroup;
  isEditMode = false;
  studentId?: number;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      course: ['', Validators.required],
      enrollmentYear: ['', [Validators.required, Validators.min(1900), Validators.max(2100)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.studentId = +id;
      const student = this.studentService.getStudentById(this.studentId);
      if (student) {
        this.studentForm.patchValue(student);
      } else {
        this.router.navigate(['/students']);
      }
    }
  }

  get f() {
    return this.studentForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.studentForm.invalid) {
      return;
    }

    if (this.isEditMode && this.studentId) {
      const updatedStudent: Student = {
        id: this.studentId,
        ...this.studentForm.value
      };
      this.studentService.updateStudent(updatedStudent);
    } else {
      this.studentService.addStudent(this.studentForm.value);
    }

    this.router.navigate(['/students']);
  }

  onCancel(): void {
    this.router.navigate(['/students']);
  }
}


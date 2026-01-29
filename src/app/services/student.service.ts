import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private students: Student[] = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            dateOfBirth: '2000-05-15',
            course: 'Computer Science',
            enrollmentYear: 2020,
            address: '123 Main St, Boston, MA 02115',
            phone: '6171234567'
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            dateOfBirth: '2001-08-22',
            course: 'Electrical Engineering',
            enrollmentYear: 2021,
            address: '456 Oak Ave, Cambridge, MA 02139',
            phone: '6179876543'
        },
        {
            id: 3,
            firstName: 'Michael',
            lastName: 'Johnson',
            email: 'michael.j@example.com',
            dateOfBirth: '1999-12-10',
            course: 'Mechanical Engineering',
            enrollmentYear: 2019,
            address: '789 Elm St, Somerville, MA 02144',
            phone: '6175551234'
        },
        {
            id: 4,
            firstName: 'Emily',
            lastName: 'Davis',
            email: 'emily.davis@example.com',
            dateOfBirth: '2002-03-18',
            course: 'Business Administration',
            enrollmentYear: 2022,
            address: '321 Pine Rd, Brookline, MA 02445',
            phone: '6174445678'
        },
        {
            id: 5,
            firstName: 'Sarah',
            lastName: 'Williams',
            email: 'sarah.w@example.com',
            dateOfBirth: '2001-11-05',
            course: 'Computer Science',
            enrollmentYear: 2021,
            address: '555 Maple Dr, Newton, MA 02458',
            phone: '6173337890'
        },
        {
            id: 6,
            firstName: 'David',
            lastName: 'Brown',
            email: 'david.brown@example.com',
            dateOfBirth: '2000-07-30',
            course: 'Information Technology',
            enrollmentYear: 2020,
            address: '777 Cedar Ln, Waltham, MA 02451',
            phone: '6172221111'
        },
        {
            id: 7,
            firstName: 'Lisa',
            lastName: 'Anderson',
            email: 'lisa.anderson@example.com',
            dateOfBirth: '2002-01-14',
            course: 'Mathematics',
            enrollmentYear: 2022,
            address: '999 Birch Ct, Quincy, MA 02169',
            phone: '6176662222'
        },
        {
            id: 8,
            firstName: 'Robert',
            lastName: 'Martinez',
            email: 'robert.m@example.com',
            dateOfBirth: '2001-04-20',
            course: 'Computer Science',
            enrollmentYear: 2021,
            address: '246 Spruce Pl, Medford, MA 02155',
            phone: '6178883333'
        },
        {
            id: 9,
            firstName: 'Jessica',
            lastName: 'Garcia',
            email: 'jessica.garcia@example.com',
            dateOfBirth: '2003-09-08',
            course: 'Physics',
            enrollmentYear: 2023,
            address: '135 Willow Way, Arlington, MA 02474',
            phone: '6179994444'
        },
        {
            id: 10,
            firstName: 'Christopher',
            lastName: 'Taylor',
            email: 'chris.taylor@example.com',
            dateOfBirth: '2000-12-25',
            course: 'Civil Engineering',
            enrollmentYear: 2020,
            address: '864 Aspen Blvd, Belmont, MA 02478',
            phone: '6175555555'
        },
        {
            id: 11,
            firstName: 'Amanda',
            lastName: 'White',
            email: 'amanda.white@example.com',
            dateOfBirth: '2002-06-12',
            course: 'Chemistry',
            enrollmentYear: 2022,
            address: '975 Cypress Ter, Lexington, MA 02420',
            phone: '6176667777'
        },
        {
            id: 12,
            firstName: 'Daniel',
            lastName: 'Harris',
            email: 'daniel.h@example.com',
            dateOfBirth: '2001-03-17',
            course: 'Business Administration',
            enrollmentYear: 2021,
            address: '531 Redwood Ave, Watertown, MA 02472',
            phone: '6177778888'
        }
    ];

    private studentsSubject = new BehaviorSubject<Student[]>(this.students);
    public students$ = this.studentsSubject.asObservable();

    constructor() { }

    // Get all students
    getStudents(): Observable<Student[]> {
        return this.students$;
    }

    // Get student by ID
    getStudentById(id: number): Student | undefined {
        return this.students.find(student => student.id === id);
    }

    // Add new student
    addStudent(student: Omit<Student, 'id'>): void {
        const newId = this.students.length > 0
            ? Math.max(...this.students.map(s => s.id)) + 1
            : 1;

        const newStudent: Student = {
            ...student,
            id: newId
        };

        this.students.push(newStudent);
        this.studentsSubject.next([...this.students]);
    }

    // Update existing student
    updateStudent(updatedStudent: Student): void {
        const index = this.students.findIndex(s => s.id === updatedStudent.id);

        if (index !== -1) {
            this.students[index] = updatedStudent;
            this.studentsSubject.next([...this.students]);
        }
    }

    // Delete student
    deleteStudent(id: number): void {
        this.students = this.students.filter(s => s.id !== id);
        this.studentsSubject.next([...this.students]);
    }
}

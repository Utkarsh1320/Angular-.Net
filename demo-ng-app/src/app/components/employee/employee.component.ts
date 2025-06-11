import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Add this import
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Add FormsModule here
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
    selectedEmployee: Employee | null = null;
    showForm = false;
    editMode = false;
    formEmployee: Employee = this.getEmptyEmployee();

  constructor(private employeeService: EmployeeService) {}

    ngOnInit() { }
    
    getEmptyEmployee(): Employee{
        return {
            id: 0,
            name:'',
            email: '',
            phone: '',
            salary: 0
        }
    }
    editEmployee(employee: Employee) {
        this.showForm = true;
        this.editMode = true;
        this.formEmployee = { ...employee };
    }
    cancelForm() {
        this.showForm = false;
        this.formEmployee = this.getEmptyEmployee();
    }
     onSubmit() {
        if (this.editMode) {
            this.employeeService.updateEmployee(this.formEmployee).subscribe({
                next: (updatedEmployee) => {
                    const index = this.employees.findIndex(e => e.id === updatedEmployee.id);
                    if (index !== -1) {
                        this.employees[index] = updatedEmployee;
                    }
                    this.showForm = false;
                },
                error: (error) => {
                    console.error('Error updating employee:', error);
                }
            });
        } else {
            this.employeeService.addEmployee(this.formEmployee).subscribe({
                next: (newEmployee) => {
                    this.employees.push(newEmployee);
                    this.showForm = false;
                },
                error: (error) => {
                    console.error('Error adding employee:', error);
                }
            });
        }
    }


  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      }
    });
    }
    openAddForm() {
        this.showForm = true;
        this.editMode = false;
        this.formEmployee = this.getEmptyEmployee();
    }

  viewEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe({
      next: (data) => {
        this.selectedEmployee = data;
      },
      error: (error) => {
        console.error('Error fetching employee:', error);
      }
    });
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.employees = this.employees.filter(emp => emp.id !== id);
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
        }
      });
    }
    }
    
}
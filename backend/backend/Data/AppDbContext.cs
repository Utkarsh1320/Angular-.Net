﻿using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<TodoItem> TodoItems => Set<TodoItem>();
        public DbSet<Employee> Employees => Set<Employee>();
    }
}

﻿namespace backend.Models.Entities
{
    public class TodoItem
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public bool IsCompleted { get; set; }

    }
}

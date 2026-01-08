export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'CODE_REVIEW' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface User {
    id: string;
    name: string;
    avatarUrl: string;
}

export interface TaskComment {
    id: string;
    author: User;
    content: string;
    createdAt: Date;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    tags: string[];
    assignee: User;
    reporter: User;
    dueDate?: Date;
    comments: TaskComment[];
    storyPoints?: number; // REMOVED
    creationDate: Date;
    attachments?: number; // Mocking attachment count
    subtasks?: { total: number; completed: number };
}

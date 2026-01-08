import { Task } from '../models/task.model';

export const USERS = [
    { id: 'u1', name: 'Alex Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
    { id: 'u2', name: 'Sam Smith', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: 'u3', name: 'Maria Garcia', avatarUrl: 'https://i.pravatar.cc/150?u=a04258114e29026302d' },
    { id: 'u4', name: 'James Wilson', avatarUrl: 'https://i.pravatar.cc/150?u=a048581f4e29026701d' },
];

export const MOCK_TASKS: Task[] = [
    {
        id: 'PRD-25',
        title: 'Calibrate Robotic Arm for Tractor Assembly',
        description: 'The KUKA robot on Line 4 needs recalibration for the new chassis specifications. Deviation is currently > 2mm.',
        status: 'TODO',
        priority: 'HIGH',
        tags: ['ASSEMBLY LINE 4', 'ROBOTICS'],
        assignee: USERS[0],
        reporter: USERS[1],
        creationDate: new Date('2023-11-10T09:00:00'),
        attachments: 2,
        comments: [
            {
                id: 'c1',
                author: USERS[1],
                content: 'Maintenance team has been notified.',
                createdAt: new Date('2023-11-15T10:00:00')
            }
        ]
    },
    {
        id: 'PRD-12',
        title: 'Review QA Reports for Bus Engine Mounts',
        description: 'Quality assurance has flagged a potential vibration issue in the engine mounts for the Model-X Bus.',
        status: 'TODO',
        priority: 'MEDIUM',
        tags: ['QUALITY CONTROL', 'BUS DEPT'],
        assignee: USERS[2],
        reporter: USERS[0],
        creationDate: new Date('2023-11-12T14:30:00'),
        dueDate: new Date('2023-11-20'),
        subtasks: { total: 5, completed: 2 },
        comments: []
    },
    {
        id: 'PRD-8',
        title: 'Schedule Supply Chain Audit for Steel Imports',
        description: 'Annual audit required for our primary steel supplier. We need to verify compliance with new safety standards.',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        tags: ['SUPPLY CHAIN', 'COMPLIANCE'],
        assignee: USERS[3],
        reporter: USERS[1],
        creationDate: new Date('2023-11-05T08:15:00'),
        comments: []
    },
    {
        id: 'PRD-11',
        title: 'Update Firmware on Paint Shop Sprayers',
        description: 'New firmware release v4.5 fixes the uneven coating issue on curved surfaces.',
        status: 'CODE_REVIEW',
        priority: 'HIGH',
        tags: ['PAINT SHOP', 'MAINTENANCE'],
        assignee: USERS[1],
        reporter: USERS[2],
        creationDate: new Date('2023-11-18T11:00:00'),
        dueDate: new Date('2023-12-01'),
        comments: []
    },
    {
        id: 'PRD-15',
        title: 'Draft Safety Protocols for EV Battery Installation',
        description: 'Create a comprehensive safety guide for technicians handling high-voltage battery packs.',
        status: 'CODE_REVIEW',
        priority: 'MEDIUM',
        tags: ['SAFETY', 'EV DIVISION'],
        assignee: USERS[3],
        reporter: USERS[0],
        creationDate: new Date('2023-11-14T13:45:00'),
        comments: []
    },
    {
        id: 'PRD-68',
        title: 'Repair Conveyor Belt Motor on Line 2',
        description: 'Motor #4 on the main conveyor belt is overheating. Needs immediate replacement to avoid downtime.',
        status: 'DONE',
        priority: 'LOW',
        tags: ['MAINTENANCE', 'LINE 2'],
        assignee: USERS[2],
        reporter: USERS[1],
        creationDate: new Date('2023-10-25T10:00:00'),
        comments: []
    },
    {
        id: 'PRD-23',
        title: 'Optimize Logistics Route for Part Delivery',
        description: 'Analyze current delivery routes from the warehouse to the assembly floor to reduce transit time.',
        status: 'DONE',
        priority: 'MEDIUM',
        tags: ['LOGISTICS', 'EFFICIENCY'],
        assignee: USERS[2],
        reporter: USERS[1],
        creationDate: new Date('2023-10-30T09:30:00'),
        comments: []
    }
];

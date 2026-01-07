import { Task } from '../models/task.model';

export const USERS = [
    { id: 'u1', name: 'Alex Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
    { id: 'u2', name: 'Sam Smith', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: 'u3', name: 'Maria Garcia', avatarUrl: 'https://i.pravatar.cc/150?u=a04258114e29026302d' },
    { id: 'u4', name: 'James Wilson', avatarUrl: 'https://i.pravatar.cc/150?u=a048581f4e29026701d' },
];

export const MOCK_TASKS: Task[] = [
    {
        id: 'TIS-25',
        title: 'Engage Jupiter Express for outer solar system travel',
        description: 'We need to finalize the contract with Jupiter Express to ensure we can cover the outer rings. This includes negotiating fuel surcharges and docking fees.',
        status: 'TODO',
        priority: 'HIGH',
        tags: ['SPACE TRAVEL PARTNERS'],
        assignee: USERS[0],
        reporter: USERS[1],
        storyPoints: 5,
        attachments: 2,
        comments: [
            {
                id: 'c1',
                author: USERS[1],
                content: 'Have we heard back from their legal team yet?',
                createdAt: new Date('2023-11-15T10:00:00')
            }
        ]
    },
    {
        id: 'TIS-12',
        title: 'Create 90 day plans for all departments in the Mars Office',
        description: 'Q4 is approaching. All departments need to submit their 90-day operational plans by end of week.',
        status: 'TODO',
        priority: 'MEDIUM',
        tags: ['LOCAL MARS OFFICE'],
        assignee: USERS[2],
        reporter: USERS[0],
        storyPoints: 8,
        subtasks: { total: 5, completed: 2 },
        comments: []
    },
    {
        id: 'TIS-8',
        title: 'Requesting available flights is now taking > 5 seconds',
        description: 'Performance degradation in the flight search API. P99 latency has spiked to 6s.',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        tags: ['SEESPACEEZ PLUS', 'PERFORMANCE'],
        assignee: USERS[3],
        reporter: USERS[1],
        storyPoints: 3,
        comments: []
    },
    {
        id: 'TIS-11',
        title: 'Register with the Mars Ministry of Revenue',
        description: 'Legal requirement for the upcoming fiscal year. Needs paperwork filed in person at the Olympus Mons registry.',
        status: 'CODE_REVIEW',
        priority: 'HIGH',
        tags: ['LOCAL MARS OFFICE'],
        assignee: USERS[1],
        reporter: USERS[2],
        storyPoints: 3,
        dueDate: new Date('2023-12-01'),
        comments: []
    },
    {
        id: 'TIS-15',
        title: 'Draft network plan for Mars Office',
        description: 'Plan out the wifi access points and ethernet drops for the new pod.',
        status: 'CODE_REVIEW',
        priority: 'MEDIUM',
        tags: ['LOCAL MARS OFFICE'],
        assignee: USERS[3],
        reporter: USERS[0],
        storyPoints: 3,
        comments: []
    },
    {
        id: 'TIS-68',
        title: 'Homepage footer uses an inline style - should use a class',
        description: 'Tech debt cleanup. The footer component has hardcoded styles that need to be moved to Tailwind classes.',
        status: 'DONE',
        priority: 'LOW',
        tags: ['LARGE TEAM SUPPORT'],
        assignee: USERS[2],
        reporter: USERS[1],
        comments: []
    },
    {
        id: 'TIS-23',
        title: 'Engage JetShuttle SpaceWays for travel',
        description: 'Competitor analysis and potential partnership with JetShuttle.',
        status: 'DONE',
        priority: 'MEDIUM',
        tags: ['SPACE TRAVEL PARTNERS'],
        assignee: USERS[2],
        reporter: USERS[1],
        storyPoints: 5,
        comments: []
    }
];

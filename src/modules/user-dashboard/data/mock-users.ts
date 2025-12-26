import { type User, type UserRole } from '../../../infrastructure/models/user-model';

const roles: UserRole[] = ['ADMIN', 'EDITOR', 'VIEWER', 'GUEST', 'OWNER', 'INACTIVE'];
const titles = [
  'Software Engineer',
  'Product Manager',
  'Product Designer',
  'UX Designer',
  'Frontend Developer',
  'Backend Developer',
  'DevOps Engineer',
  'Data Scientist',
  'QA Engineer',
  'Technical Lead',
];
const teams = [
  'Security',
  'Website',
  'Finance',
  'Marketing',
  'Engineering',
  'Product',
  'Design',
  'Operations',
];

const firstNames = [
  'George',
  'Arianna',
  'Marco',
  'Sarah',
  'Emma',
  'Victor',
  'Serena',
  'James',
  'Olivia',
  'Michael',
  'Sophia',
  'David',
  'Isabella',
  'Daniel',
  'Mia',
  'Matthew',
  'Charlotte',
  'Christopher',
  'Amelia',
  'Andrew',
  'Harper',
  'Joshua',
  'Evelyn',
  'Joseph',
  'Abigail',
  'William',
  'Emily',
  'Alexander',
  'Elizabeth',
  'Ryan',
];

const lastNames = [
  'Harris',
  'Russo',
  'Esposito',
  'Williams',
  'Clark',
  'Barnes',
  'Parisi',
  'Johnson',
  'Brown',
  'Davis',
  'Miller',
  'Wilson',
  'Moore',
  'Taylor',
  'Anderson',
  'Thomas',
  'Jackson',
  'White',
  'Harris',
  'Martin',
  'Thompson',
  'Garcia',
  'Martinez',
  'Robinson',
  'Clark',
  'Rodriguez',
  'Lewis',
  'Lee',
  'Walker',
  'Hall',
];

function generateEmail(firstName: string, lastName: string): string {
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateOtherDetails(): string {
  const details = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  ];
  return getRandomElement(details);
}

function generateUserId(index: number): string {
  return `user-${String(index + 1).padStart(3, '0')}`;
}

export function generateMockUsers(count: number = 30): User[] {
  const users: User[] = [];
  const usedNames = new Set<string>();

  for (let i = 0; i < count; i++) {
    let firstName: string;
    let lastName: string;
    let fullName: string;

    do {
      firstName = getRandomElement(firstNames);
      lastName = getRandomElement(lastNames);
      fullName = `${firstName} ${lastName}`;
    } while (usedNames.has(fullName));

    usedNames.add(fullName);

    const role = getRandomElement(roles);
    const title = getRandomElement(titles);
    const team = getRandomElement(teams);

    users.push({
      id: generateUserId(i),
      name: fullName,
      email: generateEmail(firstName, lastName),
      role,
      title,
      team,
      otherDetails: generateOtherDetails(),
    });
  }

  return users;
}

export const MOCK_USERS: User[] = generateMockUsers(30);

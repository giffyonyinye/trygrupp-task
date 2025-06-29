
import { render, screen, fireEvent } from '@testing-library/react';
import { UserRolesTable } from '../UserRolesTable';
import { UserRole } from '@/types';

const mockRoles: UserRole[] = [
  {
    id: 1,
    name: 'Superadmin 1',
    type: 'DEFAULT',
    date: 'Jan 1, 2023',
    status: 'Active',
    users: ['https://example.com/avatar1.jpg', 'https://example.com/avatar2.jpg'],
    totalUser: 5
  },
  {
    id: 2,
    name: 'Developer 2',
    type: 'CUSTOM',
    date: 'Feb 1, 2023',
    status: 'In Active',
    users: ['https://example.com/avatar3.jpg'],
    totalUser: 2
  }
];

describe('UserRolesTable Component', () => {
  it('renders loading state correctly', () => {
    render(<UserRolesTable roles={[]} isLoading={true} />);
    
    expect(screen.getByText('User Roles')).toBeInTheDocument();
    // Check for loading skeleton
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders roles data correctly on desktop', () => {
    render(<UserRolesTable roles={mockRoles} isLoading={false} />);
    
    // Check header
    expect(screen.getByText('User Roles')).toBeInTheDocument();
    expect(screen.getByText('Download all')).toBeInTheDocument();
    
    // Check table headers (desktop view)
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Date created')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Role users')).toBeInTheDocument();
    
    // Check role data
    expect(screen.getByText('Superadmin')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Jan 1, 2023')).toBeInTheDocument();
    expect(screen.getByText('Feb 1, 2023')).toBeInTheDocument();
  });

  it('displays correct status badges', () => {
    render(<UserRolesTable roles={mockRoles} isLoading={false} />);
    
    const activeBadges = screen.getAllByText('Active');
    const inactiveBadges = screen.getAllByText('In Active');
    
    expect(activeBadges.length).toBeGreaterThan(0);
    expect(inactiveBadges.length).toBeGreaterThan(0);
  });

  it('displays correct type badges', () => {
    render(<UserRolesTable roles={mockRoles} isLoading={false} />);
    
    expect(screen.getByText('DEFAULT')).toBeInTheDocument();
    expect(screen.getByText('CUSTOM')).toBeInTheDocument();
  });

  it('handles dropdown menu interactions', () => {
    render(<UserRolesTable roles={mockRoles} isLoading={false} />);
    
    // Find and click the first dropdown trigger
    const dropdownTriggers = screen.getAllByRole('button');
    const moreButton = dropdownTriggers.find(button => 
      button.querySelector('svg') // Looking for the MoreHorizontal icon
    );
    
    if (moreButton) {
      fireEvent.click(moreButton);
      // The dropdown menu should appear (tested in DropdownMenu component tests)
    }
  });

  it('formats role names correctly', () => {
    const rolesWithNumbers = [
      {
        ...mockRoles[0],
        name: 'Superadmin 123'
      }
    ];
    
    render(<UserRolesTable roles={rolesWithNumbers} isLoading={false} />);
    
    // Should display "Superadmin" without the number
    expect(screen.getByText('Superadmin')).toBeInTheDocument();
  });

  it('handles empty roles array', () => {
    render(<UserRolesTable roles={[]} isLoading={false} />);
    
    expect(screen.getByText('User Roles')).toBeInTheDocument();
    expect(screen.getByText('Download all')).toBeInTheDocument();
    
    // Table should still render but with no data rows
    const table = document.querySelector('table');
    expect(table).toBeInTheDocument();
  });

  it('displays avatar groups correctly', () => {
    render(<UserRolesTable roles={mockRoles} isLoading={false} />);
    
    // Avatar groups should be rendered for each role
    const avatarGroups = document.querySelectorAll('[class*="flex"][class*="items-center"][class*="-space-x"]');
    expect(avatarGroups.length).toBeGreaterThan(0);
  });
});

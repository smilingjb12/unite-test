import 'jest';
import { LocationsState } from '../Locations/locationsSlice';
import { LocationInfo, MigrationStatus } from '../Locations/types';
import { getMainStatItems, getMainStatTotals } from './selectors';

const MOCK_LOCATIONS: LocationInfo[] = [
  {
    additionalInfo: null,
    city: 'Minsk',
    coords: '51 25',
    country: 'Belarus',
    createdAt: new Date(),
    fullName: 'Ivan Ivanov',
    id: '1',
    status: MigrationStatus.Planning,
    updatedAt: null
  },
  {
    additionalInfo: null,
    city: 'Brest',
    coords: '39 25',
    country: 'Belarus',
    createdAt: new Date(),
    fullName: 'Alice Glass',
    id: '2',
    status: MigrationStatus.Temporary,
    updatedAt: new Date()
  },
  {
    additionalInfo: null,
    city: 'Boston',
    coords: '79 122',
    country: 'USA',
    createdAt: new Date(),
    fullName: 'John Johnson',
    id: '3',
    status: MigrationStatus.Temporary,
    updatedAt: new Date()
  },
];

describe('Stats selectors', () => {
  it('should calculate totals correctly', () => {
    const totals = getMainStatTotals({ locations: MOCK_LOCATIONS } as LocationsState);

    expect(totals.total).toBe(3);
    expect(totals.planning).toBe(1);
    expect(totals.working).toBe(0);
    expect(totals.temporary).toBe(2);
  });

  it('should calculate main stat items correctly', () => {
    const items = getMainStatItems({ locations: MOCK_LOCATIONS } as LocationsState);

    const belarusItem = items.find(i => i.country === 'Belarus');
    expect(items.length).toBe(2);
    expect(belarusItem.total).toBe(2);
    expect(belarusItem.working).toBe(0);
    expect(belarusItem.planning).toBe(1);
    expect(belarusItem.temporary).toBe(1);
  });
});

import { db } from './index';
import { beneficiaries } from './schema';

const seed = async () => {
  console.log('Seeding database...');
  
  const demoData = [
    {
      name: 'Ramesh Kumar',
      phone: '9876543210',
      language: 'Hindi',
      state: 'Uttar Pradesh',
      district: 'Varanasi',
      education: '10th Pass',
      currentOccupation: 'Daily Wager',
      interests: 'Plumbing, Electrician',
      mobility: 'Willing to travel within state',
      employmentPreference: 'Job'
    },
    {
      name: 'Sunita Devi',
      phone: '9876543211',
      language: 'Bhojpuri',
      state: 'Bihar',
      district: 'Patna',
      education: '8th Pass',
      currentOccupation: 'Homemaker',
      interests: 'Tailoring, Handicrafts',
      mobility: 'Cannot travel far',
      employmentPreference: 'Self-employment'
    },
    {
      name: 'Prakash Rao',
      phone: '9876543212',
      language: 'Telugu',
      state: 'Andhra Pradesh',
      district: 'Guntur',
      education: '12th Pass',
      currentOccupation: 'Unemployed',
      interests: 'Data Entry, Retail',
      mobility: 'Willing to relocate anywhere',
      employmentPreference: 'Either'
    }
  ];

  await db.insert(beneficiaries).values(demoData);
  console.log('Database seeded successfully!');
};

seed().catch((err) => {
  console.error('Seeding failed!', err);
  process.exit(1);
});

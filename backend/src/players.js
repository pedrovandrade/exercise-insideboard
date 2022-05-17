/*
  This file contains the initial database data for testing the app. It must be
  used with the NPM script dbinit in order to load this data on the database.
 */
db.players.insert([
  {
    firstName: 'Karim',
    lastName: 'Benzema',
    position: 'forward',
    club: 'Real Madrid',
    birth: '19/12/1987',
    previousClubs: ['Lyon'],
    picture: 'b9ebac49-042a-4122-bda0-39b61068249b.jpg',
    uuid: 'b9ebac49-042a-4122-bda0-39b61068249b'
  },
  {
    firstName: 'Edmilson',
    lastName: 'Junior',
    position: 'midfielder',
    club: 'Al Duhail',
    birth: '19/08/1994',
    previousClubs: ['Standard', 'Sint-Truiden'],
    picture: '3eb0325f-e7d2-4306-8442-d7f23ebd4d94.jpg',
    uuid: '3eb0325f-e7d2-4306-8442-d7f23ebd4d94'
  },
  {
    firstName: 'Alisson',
    lastName: 'Becker',
    position: 'goalkeeper',
    club: 'Liverpool',
    birth: '02/10/1992',
    previousClubs: ['AS Roma', 'Internacional'],
    picture: '0d28ed98-7001-4131-ad26-75eccf8ffb48.jpg',
    uuid: '0d28ed98-7001-4131-ad26-75eccf8ffb48'
  },
  {
    firstName: 'James',
    lastName: 'Tavernier',
    position: 'defender',
    club: 'Glassgow Rangers',
    birth: '27/01/1991',
    previousClubs: [
      'Bristol City',
      'Wigan',
      'Rotherham',
      'Newcastle U-23',
      'Shrewsbury',
      'Newcastle',
      'Milton Keynes',
      'Sheffield Wednesday',
      'Carlislie United',
      'Gateshead'
    ],
    picture: '5b8453cf-95dd-4d83-9b35-3c5eee25f8c5.jpg',
    uuid: '5b8453cf-95dd-4d83-9b35-3c5eee25f8c5'
  },
  {
    firstName: 'Antonio',
    lastName: 'Rudiger',
    position: 'defender',
    club: 'Chelsea',
    birth: '03/03/1993',
    previousClubs: ['AS Roma', 'Stuttgart', 'Dortmund U-19'],
    picture: 'a850768a-f0dc-4db9-a4a8-297dccacd9fb.jpg',
    uuid: 'a850768a-f0dc-4db9-a4a8-297dccacd9fb'
  },
  {
    firstName: 'Thiago',
    lastName: 'Silva',
    position: 'defender',
    club: 'Chelsea',
    birth: '22/09/1984',
    previousClubs: [
      'Paris Saint-German',
      'AC Milan',
      'Fluminense',
      'Dinamo-2',
      'FC Porto',
      'Juventude',
      'Pedrabranca FC',
      'Barcelona Esportivo'
    ],
    picture: '97b236c8-0465-4fbb-8991-fed8ec572110.jpg',
    uuid: '97b236c8-0465-4fbb-8991-fed8ec572110'
  },
  {
    firstName: 'Ilkay',
    lastName: 'Gundogan',
    position: 'midfielder',
    club: 'Manchester City',
    birth: '24/10/1990',
    previousClubs: ['Dortmund', 'FC Nurnberg', 'Bochum'],
    picture: '60d845b3-da89-4d49-8887-c5ebefdbaa38.jpg',
    uuid: '60d845b3-da89-4d49-8887-c5ebefdbaa38'
  },
  {
    firstName: 'Luiz',
    lastName: 'Diaz',
    position: 'forward',
    club: 'Liverpool',
    birth: '13/01/1997',
    previousClubs: ['FC Porto', 'Junior Barranquilla', 'Barranquilla'],
    picture: 'ae8d678b-69ad-44a2-b53b-2166200a3652.jpg',
    uuid: 'ae8d678b-69ad-44a2-b53b-2166200a3652'
  },
  {
    firstName: 'Kylian',
    lastName: 'Mbappé',
    position: 'forward',
    club: 'Paris Saint-German',
    birth: '20/12/1998',
    previousClubs: ['Monaco', 'Monaco U-19'],
    picture: 'd4f9db14-30e3-4f49-a135-447114cb3f86.jpg',
    uuid: 'd4f9db14-30e3-4f49-a135-447114cb3f86'
  },
  {
    firstName: 'Mohamed',
    lastName: 'Salah',
    position: 'forward',
    club: 'Liverpool',
    birth: '15/06/1992',
    previousClubs: ['AS Roma', 'Chelsea', 'FC Basel', 'Moqaouloun El Arab'],
    picture: 'c0f3486a-6f4e-4366-a40f-dfa3ded9ff2c.jpg',
    uuid: 'c0f3486a-6f4e-4366-a40f-dfa3ded9ff2c'
  }
]);

const { Pool } = require('pg');
require("dotenv").config();

describe('Database Tests', () => {
    let db;
  beforeAll(() => {
    db = new Pool({
        connectionString: process.env.DB_URL
    })
  });

  afterAll(async () => {
    await db.end();
  });
            // start_date: 2023-02-17T11:17:00.000Z,
            // end_date: 2023-02-18T11:17:00.000Z,
            // event_title: 'First Post',
            // event_description: 'Descr',
            // interest: 2,
            // attending: 0,
            // category_id: 'festival',
            // image_url: 'https://res.cloudinary.com/da6qginmp/image/upload/v1676459835/i5ztq5cynadrhnvcuwe4.jpg',
            // location: 'Bedford'

  test('should check event_id from first event from table events', async () => {
    const result = await db.query('SELECT * FROM events WHERE event_id=1');
    expect(result.rows[0].event_id).toEqual(1);
  });

  test('should check user_id from first event from table events', async () => {
    const result = await db.query('SELECT * FROM events WHERE user_id=1');
    expect(result.rows[0].event_id).toEqual(1);
  });

//   test('should return start_date: 2023-02-17T11:17:00.000Z from first event', async () => {
//     const result = await db.query('SELECT * FROM events WHERE start_date="2023-02-17T11:17:00.000Z"');
//     expect(result.rows[0].event_id).toEqual("2023-02-17T11:17:00.000Z");
//   });

  test('should check event_title from first event', async () => {
    const result = await db.query("SELECT * FROM events WHERE event_title='First Post'");
    expect(result.rows[0].event_title).toEqual("First Post");
  });

  test('should check event_description from first event', async () => {
    const result = await db.query("SELECT * FROM events WHERE event_description='Descr'");
    expect(result.rows[0].event_description).toEqual("Descr");
  });

  test('should check interest from first event', async () => {
    const result = await db.query('SELECT * FROM events WHERE event_id=1');
    expect(result.rows[0].interest).toEqual(2);
  });

  test('should check attending from first event', async () => {
    const result = await db.query('SELECT * FROM events WHERE event_id=1');
    expect(result.rows[0].attending).toEqual(2);
  });

  test('should check interest from first event', async () => {
    const result = await db.query('SELECT * FROM events WHERE event_id=1');
    expect(result.rows[0].interest).toEqual(2);
  });

});

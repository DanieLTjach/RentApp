const { test, expect } = require('@jest/globals');
const DbManager = require('../db/db_manager');

test('hello world!', () => {
	expect(1 + 1).toBe(2);
});

test('Add and get catalog item by ID', async () => {
	const db = new DbManager();

	const name = 'Test object ' + Date.now();
	const landlord_id = 1;
	const price = 1000;
	const about = 'Test description';
	const landlord_number = '380991112233';
	const img = null;

	// Добавляем объект
	const addResult = await db.catalog_add(landlord_id, price, about, landlord_number, img, name);
	expect(addResult).toBe(true);

	// Получаем последний ID
	const lastId = await db.get_last_id();
	expect(typeof lastId).toBe('number');

	// Получаем объект по ID
	const rows = await db.get(lastId);
	expect(rows.length).toBeGreaterThan(0);
	expect(rows[0].name).toBe(name);

	const removed = await db.remove(lastId);
	expect(removed).toBe(true);
});

test('Edit catalog item', async () => {
	const db = new DbManager();

	const name = 'Edit test ' + Date.now();
	await db.catalog_add(1, 1000, 'Old about', '380991112233', null, name);
	const catalogId = await db.get_last_id();

	const updated = await db.edit(
		catalogId,
		'New name',
		'New description',
		'380987654321',
		2000,
		'newimage.jpg'
	);
	expect(updated).toBe(true);

	const rows = await db.get(catalogId);
	expect(rows[0].name).toBe('New name');
	expect(rows[0].about).toBe('New description');
	expect(rows[0].price).toBe(2000);

	const removed = await db.remove(catalogId);
	expect(removed).toBe(true);
});

test('Remove catalog item', async () => {
	const db = new DbManager();

	const name = 'To be removed ' + Date.now();
	await db.catalog_add(1, 500, 'remove test', '380931234567', null, name);
	const catalogId = await db.get_last_id();

	const removed = await db.remove(catalogId);
	expect(removed).toBe(true);

	const rows = await db.get(catalogId);
	expect(rows.length).toBe(0);
});

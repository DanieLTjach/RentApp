const { test, expect } = require('@jest/globals');
const { db_manager } = require('../src/db/db_manager');
const user_service = require(`../services/user_service`)

test('hello world!', () => {
	expect(1 + 1).toBe(2);
});

// tests registration/login/editing/getting user data/deleting user data
test('Register user test', async () => {
	const db = new db_manager();
	const email = "test@gmail.com";
	const password = "testpassword";
	const username = "testuser";
	
	const result = await db.user_register(email, password, username);
	expect(result).toBe(true);
});

test('Login user test', async () => {
	const db = new db_manager();
	const email = "test@gmail.com";
	const password = "testpassword";

	const result = await db.user_login(email, password);
	expect(result).toBe(true);
});

test('Edit user test', async () => {
	const db = new db_manager();
	const email = "test2@gmail.com";
	const password = "testpassword2";
	const username = "testuser2";
	const user_id = await get_by_email("test@gmail.com").user_id;
	const result = await db.user_edit(user_id, email, password, username);
	expect(result).toBe(true);
});

test('Remove user test', async () => {
	const db = new db_manager();
	const user_id = await get_by_email("test2@gmail.com").user_id;
	const result = await db.user_remove(user_id);
	expect(result).toBe(true);
}
);

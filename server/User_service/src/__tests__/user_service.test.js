const { test, expect } = require('@jest/globals');
const db_manager = require('../db/db_manager');
const user_service = require('../services/user_service');

test('hello world!', () => {
	expect(1 + 1).toBe(2);
});

test('Register user test', async () => {
	const db = new db_manager();
	const email = "test_unique1_" + Date.now() + "@gmail.com"; 
	const password = "testpassword";
	const username = "testuser1_" + Date.now(); 
	
	const result = await db.user_register(email, password, username);
	expect(result).toBe(true);

	const user = await db.get_by_email(email);
	await db.user_remove(user.user_id);
});

test('Login user test', async () => {
	const db = new db_manager();
	const login = "testuser1_" + Date.now();
	const password = "testpassword";

	const email = "test_login_" + Date.now() + "@gmail.com";
	const username = "test_login_user_" + Date.now();

	await db.user_register(email, password, username);
	
	const result = await db.user_login(username, password);
	expect(result).toBe(true);

	const user = await db.get_by_email(email);
	await db.user_remove(user.user_id);
});

test('Edit user test', async () => {
	const db = new db_manager();

	const email = "test_edit_" + Date.now() + "@gmail.com";
	const password = "testpassword";
	const username = "test_edit_user_" + Date.now();
	await db.user_register(email, password, username);

	const user = await db.get_by_email(email);
	const user_id = user.user_id;

	const new_email = "test_edit_new_" + Date.now() + "@gmail.com";
	const new_password = "testpassword2";
	const new_username = "test_edit_user_new_" + Date.now();

	const result = await db.user_edit(user_id, new_email, new_password, new_username);
	expect(result).toBe(true);

	const deletedUser = await db.get_by_email(email);
	expect(deletedUser).toBeUndefined();
});

test('Remove user test', async () => {
	const db = new db_manager();

	const email = "test_remove_" + Date.now() + "@gmail.com";
	const password = "testpassword";
	const username = "test_remove_user_" + Date.now();
	await db.user_register(email, password, username);

	const user = await db.get_by_email(email);
	const user_id = user.user_id;

	const result = await db.user_remove(user_id);
	expect(result).toBe(true);

	const deletedUser = await db.get_by_email(email);
	expect(deletedUser).toBeUndefined();
});
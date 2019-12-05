import { random, delay } from './utils';
import usersMockBase from './usersMock.json';

let usersMock = usersMockBase;

const gt = (a, b) => a > b;

const lt = (a, b) => a < b;

export const fetchUsers = async ({ page = 0, sortField, sortDirection }) => {
	await delay(random(150, 500));
	if (sortField) {
		usersMock.sort((a, b) => {
			const compareFn = sortDirection === 'ascending' ? lt : gt;
			return compareFn(a[sortField], b[sortField]) ? -1 : 1;
		});
	} else {
		// revert original order
		const usersById = usersMock.reduce((acc, user) => {
			acc[user.id] = user;
			return acc;
		}, {});
		usersMock = usersMockBase
			.filter(user => user.id in usersById)
			.map(user => usersById[user.id]);
	}

	const users = usersMock.slice(page * 10, page * 10 + 10);

	return {
		users,
		total: usersMock.length
	};
};

export const deleteUser = async id => {
	await delay(random(150, 500));
	usersMock = usersMock.filter(user => user.id !== id);
};

export const updateUser = async user => {
	await delay(random(150, 500));
	usersMock = usersMock.map(currentUser => {
		if (user.id === currentUser.id) {
			return user;
		}

		return currentUser;
	});
};

export default {
	fetchUsers,
	deleteUser,
	updateUser
};

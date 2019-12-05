import { reactive, watch, toRefs, ref } from '@vue/composition-api';
import api from '../api';

export function useAsync() {
	const loading = ref(loading);

	async function handleAsync(promise) {
		loading.value = true;
		const result = await promise;
		loading.value = false;
		return result;
	}

	return {
		loading,
		handleAsync
	};
}

export function useUsers({ sortField, sortDirection, page, handleAsync }) {
	const state = reactive({
		users: [],
		total: 0
	});

	async function fetchUsers() {
		const { users, total } = await handleAsync(
			api.fetchUsers({
				sortField: sortField.value,
				sortDirection: sortDirection.value,
				page: page.value
			})
		);
		state.users = users;
		state.total = total;
	}

	watch([page, sortField, sortDirection], fetchUsers);

	return {
		...toRefs(state),
		fetchUsers
	};
}

export function useUserTable() {
	const columns = [
		{
			prop: 'firstName',
			label: 'Name',
			sortable: true
		},
		{
			prop: 'lastName',
			label: 'Last name',
			sortable: true
		},
		{
			prop: 'gender',
			label: 'Gender'
		},
		{
			prop: 'role',
			label: 'Role'
		}
	];

	return { columns };
}

export function usePagination() {
	const page = ref(0);

	function handlePageChange(newPage) {
		page.value = newPage;
	}

	return {
		page,
		handlePageChange
	};
}

export function useDeleteUser({ fetchUsers, handleAsync }) {
	const state = reactive({
		confirmDeleteVisible: false,
		userIdToBeDeleted: '',
		userNameToBeDeleted: ''
	});

	function handleDelete(row) {
		state.confirmDeleteVisible = true;
		state.userIdToBeDeleted = row.id;
		state.userNameToBeDeleted = row.firstName;
	}

	async function handleConfirmDelete() {
		state.confirmDeleteVisible = false;
		await handleAsync(api.deleteUser(state.userIdToBeDeleted));
		fetchUsers();
	}

	return {
		...toRefs(state),
		handleDelete,
		handleConfirmDelete
	};
}

export function useSort() {
	const sortField = ref('');
	const sortDirection = ref(null);

	function handleSortChange({ order, prop }) {
		sortField.value = order ? prop : '';
		sortDirection.value = order;
	}

	return {
		sortField,
		sortDirection,
		handleSortChange
	};
}

export function useEditUser({ handleAsync, fetchUsers }) {
	const userEditableVisible = ref(false);
	const userEditable = ref({});

	function handleEdit(row) {
		userEditable.value = row;
		userEditableVisible.value = true;
	}

	async function handleUpdate(values) {
		userEditableVisible.value = false;
		await handleAsync(api.updateUser(values));
		fetchUsers();
	}

	return {
		userEditableVisible,
		userEditable,
		handleEdit,
		handleUpdate
	};
}

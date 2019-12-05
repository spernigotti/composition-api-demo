<template>
	<div>
		<el-table :data="users" v-loading="loading" @sort-change="handleSortChange">
			<el-table-column
				v-for="column in columns"
				:key="column.prop"
				:prop="column.prop"
				:label="column.label"
				:sortable="column.sortable && 'custom'"
			/>
			<el-table-column label="Operations">
				<template slot-scope="scope">
					<el-button
						@click="handleEdit(scope.row)"
						type="primary"
						icon="el-icon-edit"
						circle
					></el-button>
					<el-button
						@click="handleDelete(scope.row)"
						type="danger"
						icon="el-icon-delete"
						circle
					></el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			@current-change="handlePageChange"
			layout="prev, pager, next"
			:total="total"
		/>
		<DeleteUserDialog
			:visible="confirmDeleteVisible"
			:user="userNameToBeDeleted"
			@confirm="handleConfirmDelete"
			@cancel="confirmDeleteVisible = false"
		/>
		<EditUserDialog
			:visible="userEditableVisible"
			:user="userEditable"
			@update="handleUpdate"
			@cancel="userEditableVisible = false"
		/>
	</div>
</template>

<script>
import {
	useAsync,
	usePagination,
	useSort,
	useUsers,
	useUserTable,
	useEditUser,
	useDeleteUser
} from './hooks';
import DeleteUserDialog from './DeleteUserDialog.vue';
import EditUserDialog from './EditUserDialog.vue';

export default {
	name: 'UserList',
	components: {
		DeleteUserDialog,
		EditUserDialog
	},
	setup() {
		const { handleAsync, loading } = useAsync();

		const { page, handlePageChange } = usePagination();

		const { sortField, sortDirection, handleSortChange } = useSort();

		const { users, total, fetchUsers } = useUsers({
			page,
			sortField,
			sortDirection,
			handleAsync
		});

		const { columns } = useUserTable();

		const {
			confirmDeleteVisible,
			userNameToBeDeleted,
			handleDelete,
			handleConfirmDelete
		} = useDeleteUser({ handleAsync, fetchUsers });

		const {
			userEditableVisible,
			userEditable,
			handleEdit,
			handleUpdate
		} = useEditUser({
			handleAsync,
			fetchUsers
		});

		return {
			loading,
			users,
			total,
			columns,
			name,
			page,
			handlePageChange,
			handleSortChange,
			confirmDeleteVisible,
			userNameToBeDeleted,
			handleDelete,
			handleConfirmDelete,
			userEditableVisible,
			userEditable,
			handleEdit,
			handleUpdate
		};
	}
};
</script>

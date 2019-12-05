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
import { fetchUsers, deleteUser, updateUser } from '../api';
import DeleteUserDialog from './DeleteUserDialog';
import EditUserDialog from './EditUserDialog';

export default {
	name: 'UserListV2',
	components: {
		DeleteUserDialog,
		EditUserDialog
	},
	data() {
		return {
			users: [],
			page: 0,
			loading: true,
			total: 0,
			confirmDeleteVisible: false,
			userIdToBeDeleted: '',
			userNameToBeDeleted: '',
			sortField: '',
			sortDirection: null,
			userEditableVisible: false,
			userEditable: {}
		};
	},
	computed: {
		columns() {
			return [
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
		}
	},
	watch: {
		page: 'fetchUsers',
		sortField: 'fetchUsers',
		sortDirection: 'fetchUsers'
	},
	mounted() {
		this.fetchUsers();
	},
	methods: {
		async handlePageChange(page) {
			this.page = page - 1;
		},
		handleEdit(row) {
			this.userEditable = row;
			this.userEditableVisible = true;
		},
		handleDelete(row) {
			this.confirmDeleteVisible = true;
			this.userIdToBeDeleted = row.id;
			this.userNameToBeDeleted = row.firstName;
		},
		async fetchUsers() {
			const { users, total } = await this.handleAsync(
				fetchUsers({
					page: this.page,
					sortField: this.sortField,
					sortDirection: this.sortDirection
				})
			);
			this.users = users;
			this.total = total;
		},
		async handleConfirmDelete() {
			this.confirmDeleteVisible = false;
			await this.handleAsync(deleteUser(this.userIdToBeDeleted));
			this.fetchUsers();
		},
		async handleAsync(promise) {
			this.loading = true;
			const result = await promise;
			this.loading = false;
			return result;
		},
		handleSortChange({ order, prop }) {
			this.sortField = order ? prop : '';
			this.sortDirection = order;
		},
		async handleUpdate(values) {
			this.userEditableVisible = false;
			await this.handleAsync(updateUser(values));
			this.fetchUsers();
		}
	}
};
</script>

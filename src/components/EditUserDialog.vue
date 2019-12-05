<template>
	<el-dialog title="Edit User" :visible.sync="visible" width="30%">
		<el-form ref="form" :model="values" label-width="120px">
			<el-form-item label="Firstname">
				<el-input v-model="values.firstName"></el-input>
			</el-form-item>
			<el-form-item label="Lastname">
				<el-input v-model="values.lastName"></el-input>
			</el-form-item>
			<el-form-item label="Gender">
				<el-select v-model="values.gender" placeholder="Select gender">
					<el-option
						v-for="item in ['Male', 'Female']"
						:key="item"
						:label="item"
						:value="item"
					/>
				</el-select>
			</el-form-item>
			<el-form-item label="Role">
				<el-select v-model="values.role" placeholder="Select gender">
					<el-option
						v-for="item in ['admin', 'user', 'free']"
						:key="item"
						:label="item"
						:value="item"
					/>
				</el-select>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="$emit('cancel')">Cancel</el-button>
			<el-button type="primary" @click="$emit('update', values)"
				>Update</el-button
			>
		</span>
	</el-dialog>
</template>

<script>
export default {
	name: 'EditUserDialog',
	props: ['user', 'visible'],
	data() {
		return {
			values: {}
		};
	},
	watch: {
		user() {
			this.values = { ...this.user };
		}
	}
};
</script>

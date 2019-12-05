<template>
	<el-dialog title="Delete User" :visible.sync="visible" width="30%">
		<span>Are you sure you want to delete {{ user }}?</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="$emit('cancel')">Cancel</el-button>
			<el-button type="primary" @click="$emit('confirm')">Confirm</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default {
	name: 'DeleteUserDialog',
	props: ['user', 'visible']
};
</script>

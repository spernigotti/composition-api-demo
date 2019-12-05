<template>
	<div>
		<img alt="Vue logo" src="../assets/logo.png" />
		<UserListV2 />
	</div>
</template>

<script>
import UserListV2 from '@/components/UserListV2.vue';

export default {
	name: 'AppV2',
	components: {
		UserListV2
	}
};
</script>

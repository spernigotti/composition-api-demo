<template>
	<div>
		<img alt="Vue logo" src="../assets/logo.png" />
		<UserListV3 />
	</div>
</template>

<script>
import UserListV3 from '@/components/UserListV3.vue';

export default {
	name: 'AppV3',
	components: {
		UserListV3
	}
};
</script>

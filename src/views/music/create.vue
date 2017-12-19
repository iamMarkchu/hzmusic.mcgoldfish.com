<template>
    <div class="app-container">
        <music-detail :is-edit='false'></music-detail>
    </div>
</template>
<script>
import musicDetail from './components/musicDetail'
export default {
  name: 'music_create',
  components: { musicDetail }
}
</script>
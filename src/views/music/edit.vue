<template>
    <div class="app-container">
        <music-detail :is-edit='true'></music-detail>
    </div>
</template>
<script>
import musicDetail from './components/musicDetail'
export default {
  name: 'music_edit',
  components: { musicDetail }
}
</script>
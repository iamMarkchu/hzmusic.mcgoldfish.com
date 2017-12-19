<template>
<el-form ref="form" :model="music" label-width="120px">
  </el-form-item>
  <el-form-item label="Name">
    <el-col :span="8">
      <el-input v-model="music.name"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item label="Image">
    <el-col :span="8">
      <el-input v-model="music.image"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item label="Music File">
    <el-col :span="8">
      <el-input v-model="music.music_file"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item label="Lyrics">
    <el-col :span="11">
      <el-input type="textarea" :rows="12" v-model="music.lyrics"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item label="Author">
    <el-col :span="8">
      <el-input v-model="music.author"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">Submit</el-button>
    <el-button @click="onCancel">Cancel</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import { createMusic, fetchMusic, updateMusic } from '@/api/music'
const defaultMusic = {
  id: undefined,
  name: '',
  lyrics: '',
  image: '',
  music_file: '',
  author: ''
}

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  created() {
    if (this.isEdit) {
      this.fetchData()
    } else {
      this.music = Object.assign({}, defaultMusic)
    }
  },
  data() {
    return {
      music: Object.assign({}, defaultMusic)
    }
  },
  watch: {
  },
  methods: {
    fetchData() {
      const params = { id: this.$route.params.id }
      fetchMusic(params).then(response => {
        this.music = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    onSubmit() {
      if (this.isEdit) {
        this.update()
      } else {
        this.create()
      }
    },
    onCancel() {
      this.$router.go(-1)
    },
    create() {
      const that = this
      createMusic(this.music).then(response => {
        that.$message({
          message: 'create music success !',
          type: 'success'
        })
        that.$router.go(-1)
      }).catch(error => {
        console.log(error)
      })
    },
    update() {
      const that = this
      updateMusic(this.music).then(response => {
        that.$message({
          message: 'create music success !',
          type: 'success'
        })
        that.$router.go(-1)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  components: {
  }
}
</script>
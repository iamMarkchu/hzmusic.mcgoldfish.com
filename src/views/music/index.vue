<template>
  <div class="app-container">
    <div class="filter-container">
        <el-button type="primary" @click="handleCreate()">CREATE</el-button>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" prop="id" label='ID' width="95">
      </el-table-column>
      <el-table-column align="center" label="Name">
        <template slot-scope="scope">
          《{{scope.row.name}}》
        </template>
      </el-table-column>
      <el-table-column align="center" label="Image">
        <template slot-scope="scope">
          <img :src="scope.row.image" class="fengmian active" alt="scope.row.name">
        </template>
      </el-table-column>
      <el-table-column align="center" label="Music">
        <template slot-scope="scope">
          <audio :src="scope.row.music_file" controls="controls">
            您的浏览器不支持播放音乐
          </audio>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Author">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operation">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">EDIT</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<style scoped>
  .fengmian {
    border-radius: 50%;
  }
  .fengmian.active {
    animation: rotate-animation 10s infinite linear;
  }
  @keyframes rotate-animation {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
<script>
import { getList } from '@/api/music'

export default {
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20
      },
      list: null,
      total: 0,
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleCreate() {
      this.$router.push('/music/create')
    },
    handleEdit(id) {
      this.$router.push('/music/edit/' + id)
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}
</script>
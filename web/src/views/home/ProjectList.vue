<template>
  <div class="project-list">
    <ProjectCard
      v-for="item in cardList"
      :key="item._id"
      :cardInfo="item"
      class="card"
      @handleEdit="editProject(item._id)"
      @handleDel="delProject(item._id)"
    />
    <a-card class="create card" @click="openCreateModal">
      <PlusOutlined />
      新建项目
    </a-card>
    <!-- 新建项目弹窗 -->
    <a-modal v-model:visible="showCreateModal" title="新建项目" width="80%">
      <template #footer>
        <a-button key="back" @click="closeCreateModal">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="createProject">确定</a-button>
      </template>
      <a-form ref="newProjectForm" :model="newProjectForm" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
        <a-form-item label="项目名称" required name="name">
          <a-input v-model:value="newProjectForm.name" placeholder="项目名称"></a-input>
        </a-form-item>
        <a-form-item label="基本路径" required name="path">
          <a-input v-model:value="newProjectForm.path" placeholder="基本路径"></a-input>
        </a-form-item>
        <a-form-item label="项目简述" name="desc">
          <a-input v-model:value="newProjectForm.desc" placeholder="项目简述"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { PlusOutlined } from "@ant-design/icons-vue";
import ProjectCard from "@/components/home/ProjectCard";
export default {
  data() {
    return {
      showCreateModal: false,
      loading: false,
      cardList: [],
      newProjectForm: {},
    };
  },
  components: {
    ProjectCard,
    PlusOutlined,
  },
  created() {
    this.getProjectList();
  },
  methods: {
    editProject(id) {
      this.$router.push({ path: `/project/${id}` });
    },
    delProject(id) {
      this.$api.delProject({ id }).then((res) => {
        res.error_no === null && this.getProjectList();
      });
    },
    getProjectList() {
      this.$api.projectList().then((res) => {
        if (res.error_no === null) {
          this.cardList = res.data;
        }
      });
    },
    openCreateModal() {
      this.showCreateModal = true;
    },
    closeCreateModal() {
      this.showCreateModal = false;
    },
    createProject() {
      this.$refs.newProjectForm
        .validate()
        .then(() => {
          this.loading = true;
          this.$api.createProject(this.newProjectForm).then((res) => {
            if (res.error_no === null) {
              this.getProjectList();
              this.closeCreateModal();
            }
            this.loading = false;
          });
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.project-list {
  display: flex;
  flex-wrap: wrap;
  .card {
    margin: 8px 0 0 8px;
  }
}
.create {
  cursor: pointer;
  color: #1890ff;
  border: 2px solid #fff;
  width: 300px;
  height: 200px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
  line-height: 150px;
  text-align: center;
  &:hover {
    border: 2px solid #1890ff;
  }
}
</style>

<template>
  <div class="project-list">
    <ProjectCard
      v-for="(item, index) in cardList"
      :key="item._id"
      :cardInfo="item"
      class="card"
      @handleClickTitle="toProjectDetail(item._id)"
      @handleEdit="editProject(index)"
      @handleDel="delProject(item._id)"
    />
    <a-card class="create card" @click="addProject">
      <PlusOutlined />
      新建项目
    </a-card>
    <!-- 新建项目弹窗 -->
    <a-modal v-model:visible="showCreateModal" :title="createModalTitle" width="80%">
      <template #footer>
        <a-button key="back" @click="closeCreateModal">取消</a-button>
        <a-button key="submit" type="primary" @click="modalConfirmHanlder">确定</a-button>
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
      cardList: [],
      newProjectForm: {},
      isAdd: true,
    };
  },
  computed: {
    createModalTitle() {
      return this.isAdd ? "新建项目" : "编辑项目";
    },
  },
  components: {
    ProjectCard,
    PlusOutlined,
  },
  created() {
    this.getProjectList();
  },
  methods: {
    toProjectDetail(id) {
      this.$router.push({ path: `/project/${id}` });
    },
    addProject() {
      this.isAdd = true;
      this.newProjectForm = {};
      this.openCreateModal();
    },
    editProject(index) {
      this.isAdd = false;
      this.newProjectForm = JSON.parse(JSON.stringify(this.cardList[index]));
      this.openCreateModal();
    },
    updateProject(id) {
      const params = {
        ...this.newProjectForm,
        id,
      };
      this.$api.updateProject(params).then((res) => {
        if (res.error_no === null) {
          this.getProjectList();
          this.closeCreateModal();
        }
      });
    },
    modalConfirmHanlder() {
      this.$refs.newProjectForm
        .validate()
        .then(() => {
          this.isAdd ? this.createProject() : this.updateProject(this.newProjectForm._id);
        })
        .catch((err) => {
          console.log("error", err);
        });
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
      this.$api.createProject(this.newProjectForm).then((res) => {
        if (res.error_no === null) {
          this.getProjectList();
          this.closeCreateModal();
        }
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

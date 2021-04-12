<template>
  <div class="request">
    <a-table bordered size="small" :dataSource="requestData" :columns="columns" rowKey="name">
      <template #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
        <div style="padding: 8px">
          <a-input
            ref="searchInput"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon><SearchOutlined /></template>
            Search
          </a-button>
          <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">Reset</a-button>
        </div>
      </template>
      <template #filterIcon="filtered">
        <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>
      <template #customRender="{ text, column }">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" class="highlight" :key="i">
              {{ fragment }}
            </mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>
          {{ text }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { SearchOutlined } from "@ant-design/icons-vue";
import interfaceInfoMixins from "@/mixins/interfaceInfo";
export default {
  mixins: [interfaceInfoMixins],
  components: { SearchOutlined },
  data() {
    return {
      columns: [
        {
          title: "字段名称",
          dataIndex: "name",
          key: "name",
          slots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "customRender",
          },
          onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                console.log(22, this.$refs.searchInput);
                this.$refs.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: "数据类型",
          dataIndex: "type",
          key: "type",
        },
        {
          title: "是否必传",
          dataIndex: "required",
          key: "required",
        },
        {
          title: "示例",
          dataIndex: "sample",
          key: "sample",
        },
        {
          title: "备注",
          dataIndex: "note",
          key: "note",
        },
      ],
      searchText: "",
      searchedColumn: "",
    };
  },
  computed: {
    requestData() {
      return this.info.reqBody;
    },
  },
  methods: {
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = "";
    },
  },
};
</script>

<style></style>

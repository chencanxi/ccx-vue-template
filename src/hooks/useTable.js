import { ref, reactive, computed, onMounted } from 'vue';

/**
 * 通用表格钩子
 * @param {Function} fetchData 获取数据的函数
 * @param {Object} options 配置选项
 */
export default function useTable(fetchData, options = {}) {
  // 默认配置
  const defaultOptions = {
    // 默认分页参数
    page: 1,
    limit: 10,
    // 初始化时是否自动加载数据
    immediate: true,
    // 是否需要分页
    pagination: true,
    // 额外的查询参数
    params: {},
    // 自动处理响应结果
    autoHandleResult: true
  };

  // 合并配置
  const mergedOptions = { ...defaultOptions, ...options };

  // 数据列表
  const list = ref([]);

  // 加载状态
  const loading = ref(false);

  // 分页信息
  const pagination = reactive({
    page: mergedOptions.page,
    limit: mergedOptions.limit,
    total: 0
  });

  // 查询参数
  const queryParams = reactive({ ...mergedOptions.params });

  // 计算分页参数
  const pageParams = computed(() => {
    if (!mergedOptions.pagination) return {};
    return {
      page: pagination.page,
      limit: pagination.limit
    };
  });

  // 获取查询参数
  const getQueryParams = () => {
    return {
      ...queryParams,
      ...(mergedOptions.pagination ? pageParams.value : {})
    };
  };

  // 加载数据
  const loadData = async () => {
    try {
      loading.value = true;
      const params = getQueryParams();
      const res = await fetchData(params);

      if (mergedOptions.autoHandleResult) {
        // 假设接口返回格式为 { code, data: { list, total }, message }
        if (res.code === 200 || res.code === 0) {
          list.value = res.data.list || [];
          if (mergedOptions.pagination) {
            pagination.total = res.data.total || 0;
          }
        } else {
          console.error('加载数据失败:', res.message);
        }
      } else {
        // 由调用者自行处理结果
        return res;
      }
    } catch (error) {
      console.error('加载数据出错:', error);
    } finally {
      loading.value = false;
    }
  };

  // 重置查询参数
  const resetQuery = () => {
    Object.assign(queryParams, mergedOptions.params);
    pagination.page = mergedOptions.page;
    loadData();
  };

  // 处理页码变化
  const handlePageChange = (page) => {
    pagination.page = page;
    loadData();
  };

  // 处理每页条数变化
  const handleSizeChange = (size) => {
    pagination.limit = size;
    pagination.page = 1;
    loadData();
  };

  // 组件挂载时，如果需要就自动加载数据
  onMounted(() => {
    if (mergedOptions.immediate) {
      loadData();
    }
  });

  return {
    list,
    loading,
    pagination,
    queryParams,
    loadData,
    resetQuery,
    handlePageChange,
    handleSizeChange
  };
} 
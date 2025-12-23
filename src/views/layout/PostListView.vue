<template>
        <div class="postlist">
                <div class="post">
                        <!-- 文章列表 -->
                        <el-row :gutter="20">
                                <el-col v-for="item in displayList" :key="item.id" :xs="24" :sm="12" :md="8">
                                        <div class="grid-content ep-bg-purple">
                                                <List :ListMap="item" />
                                        </div>
                                </el-col>
                        </el-row>
                        <!-- 下拉线 -->
                        <div v-if="showExpand" class="expand-line" @click="expand">
                                <span>{{ '再多一点' }}</span>
                                <i v-if="!expanded" class="arrow"></i>
                        </div>
                        <div v-else class="expand-line" style="pointer-events: none;">
                                <span>{{ '已经到底了~' }}</span>
                        </div>
                </div>
                <!-- 个人信息 -->
                <div class="sidebar">
                        <My />
                </div>

        </div>

</template>

<script setup lang='ts'>
import { reactive, ref, computed } from 'vue';
import List from '../../components/post/List.vue';
import My from '../../components/post/My.vue';
//用pinia控制文章列表
import { useListStore } from '../../stores';
const ListStore = useListStore()
const ListMap = reactive(ListStore.ListMap)
// 文章超3行隐藏
const LIMIT = 9
// 控制展开
const expanded = ref(false)
// 展示列表
const displayList = computed(() => {
        if (expanded.value) {
                return ListMap
        } else {
                return ListMap.slice(0, LIMIT)
        }
})
// 控制显示下拉线
const showExpand = computed(() => {
        return !expanded.value && ListMap.length > LIMIT
})
const expand = () => {
        expanded.value = true
}
</script>

<style lang="less" scoped>
//文章列表展示布局
.postlist {
        display: flex;

        .post {
                flex: 0 0 70%; // 🔥 真正控制宽度
                min-width: 0; // 防止溢出

                .el-col {
                        margin-bottom: 20px;
                }

                .grid-content {
                        border-radius: 10px;
                        min-height: 320px;
                        background-color: #fff;
                }
        }

        .sidebar {
                flex: 0 0 30%;
                min-width: 0;
        }

        .sidebar>* {
                width: 100%; // 🔥 强制 My 铺满
        }

}

// 移动端适配
@media (max-width: 768px) {
        .postlist {
                flex-direction: column;

                .post,
                .sidebar {
                        flex: 0 0 100%;
                }

                .sidebar {
                        order: -1; // 将侧边栏放在顶部
                }

                .post {
                        padding: 10px;

                        .el-col {
                                margin-bottom: 16px;
                        }

                        .grid-content {
                                border-radius: 10px;

                        }
                }
        }
}

//文章显示与隐藏
.expand-line {
        margin-bottom: 20px;
        text-align: center;
        font-size: 14px;
        color: #999;
        cursor: pointer;
        user-select: none;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
}

.arrow {
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 6px solid #999;
        transition: transform 0.3s;
}
</style>

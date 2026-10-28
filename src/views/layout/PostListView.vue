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
                                <span>{{ '再来一些吧' }}</span>
                                <i v-if="!expanded" class="arrow"></i>
                        </div>
                        <div v-else class="expand-line" style="pointer-events: none;">
                                <span>{{ '就这么多了~' }}</span>
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

// 字符串转对象
function parseHeader(str: string) {
        const obj: Record<string, string> = {}                          // 准备一个空对象

        const lines = str.split('\n')           // 1. 按换行切成一行行
                .map(line => line.trim())             // 2. 去掉每行首尾空格
                .filter(line => line !== '')          // 3. 扔掉空行

        for (const line of lines) {
                const index = line.indexOf(':')       // 4. 找冒号位置
                if (index === -1) continue            //    没有冒号就跳过

                const key = line.slice(0, index).trim()          // 5. 冒号左边 = 键
                let value = line.slice(index + 1).trim()         // 6. 冒号右边 = 值
                //     7. 去掉包裹的引号（' 或 "）
                if (
                        (value.startsWith("'") && value.endsWith("'")) ||
                        (value.startsWith('"') && value.endsWith('"'))
                ) {
                        value = value.slice(1, -1)
                }

                obj[key] = value
                // 8. 塞进对象
        }

        return obj
}
// 解析文章内容
function parsePost(raw: string) {
        const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)

        if (!match) {
                return { header: {}, content: raw }
        }

        return {
                header: parseHeader(match[1]),
                content: match[2],
        }
}

// 读取所有.md文件
const postModules: any = ListStore.postModules
for (const path in postModules) {
        const raw = postModules[path]
        const { header, content } = parsePost(raw)
        console.log(`Path: ${path}`)
        console.log('Header:', header)
        console.log('Content:', content)
}





// console.log(postModules)

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
// 统一封装css
@import'@/less/post_layout.less';
</style>

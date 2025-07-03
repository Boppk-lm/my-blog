<template>
        <div class="loglist">
                  <el-timeline style="max-width: 100%" center>
                            <el-timeline-item center timestamp="2018/4/12" placement="top">
                                  <el-card class="log-card">
    <div class="card-content">
      <div class="left">
        <h4>优化了导航栏</h4>
        <p>今天没干什么，就优化了下导航栏。</p>
      </div>
      <div class="right">
        <p class="insight">🧠 导航越简洁，体验越丝滑。</p>
      </div>
    </div>
  </el-card>
    </el-timeline-item>
    <el-timeline-item center timestamp="2018/4/3" placement="top">
      <el-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item center timestamp="2018/4/2" placement="top">
             <el-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item center  timestamp="2018/4/2" placement="top">
               <el-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
                  </el-timeline>

        </div>
</template>
    
<script setup lang='ts'>
    
</script>
    
<style lang="less" scoped>
.loglist {
.log-card {
  .card-content {
  display: flex;
  justify-content: space-between;
}
.left {
  width: 65%;
}

.right {
  width: 25%;
  padding-left: 20px;
  border-left: 1px dashed #ccc;
  color: #555;
  font-style: italic;
  font-size: 14px;
  display: flex;
  align-items: center;
}
}
.el-timeline {
  border-left: 3px solid #cbd5e1;
  padding-left: 20px;
}
}






</style>
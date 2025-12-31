<template>
      <div class="footer">

            <div class="copyright">
                  <div>
                        <a href="#">版本号</a>
                  </div>
                  Copyright © 2022-2025 By
                  <a href="#">LvDaMengの开发日志</a>
                  All Rights Reserved.
            </div>
      </div>
</template>

<script setup lang='ts'>

</script>

<style lang="less" scoped>
.footer {
      pointer-events: none;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
      background: hsla(0, 0%, 85.1%, .3);

      a {
            color: #555;
            pointer-events: auto;
      }

      a:hover {
            color: #4183c4;
      }
}
@media (max-width: 768px) {
      .footer {
            font-size: 12px;
            height: 80px;
      }
}
</style>
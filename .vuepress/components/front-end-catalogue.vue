<template>
  <div>
    <div class="banner">
      <span>前 端</span>
    </div>
    <div class="catalogue">
      <article>
        <h3>2019</h3>
        <section>
          <span class="point-time point-green"></span>
          <time datetime="2019-4">
            <span>4-7</span>
          </time>
          <aside>
            <a href="/front-end/FE-design-mode02.html">前端设计模式(中)</a>
          </aside>
        </section>
        <section>
          <span class="point-time point-green"></span>
          <time datetime="2019-4">
            <span>4-6</span>
          </time>
          <aside>
            <a href="/front-end/FE-design-mode01.html">前端设计模式(上)</a>
          </aside>
        </section>
        <section>
          <span class="point-time point-green"></span>
          <time datetime="2019-3">
            <span>3-5</span>
          </time>
          <aside>
            <a href="/front-end/FE-coding-specification.html">前端编码规范</a>
          </aside>
        </section>
      </article>
       <article>
        <h3>2018</h3>
        <section>
          <span class="point-time point-green"></span>
          <time datetime="2018-12">
            <span>12-21</span>
          </time>
          <aside>
            <a href="/front-end/Common-browser-compatibility-issues.html">常见浏览器兼容性问题</a>
          </aside>
        </section>
        <section>
          <span class="point-time point-green"></span>
          <time datetime="2018-12">
            <span>12-18</span>
          </time>
          <aside>
            <a href="/front-end/FE-technology-stack.html">前端技术栈</a>
          </aside>
        </section>
       </article>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
<style scoped>
  @import url('../public/css/catalogue.css');
  .banner{
    display: flex;
    justify-content:center;
    align-items:center;
    width: 100%;
    height: 300px;
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='100' viewBox='0 0 600 100'%3E%3Cg stroke='%23FFF' stroke-width='0' stroke-miterlimit='10' %3E%3Ccircle fill='%23037B79' cx='0' cy='0' r='50'/%3E%3Ccircle fill='%2392DEBA' cx='100' cy='0' r='50'/%3E%3Ccircle fill='%23FFFFD8' cx='200' cy='0' r='50'/%3E%3Ccircle fill='%23CAF2FF' cx='300' cy='0' r='50'/%3E%3Ccircle fill='%236FCCFF' cx='400' cy='0' r='50'/%3E%3Ccircle fill='%23006EB4' cx='500' cy='0' r='50'/%3E%3Ccircle fill='%23037B79' cx='600' cy='0' r='50'/%3E%3Ccircle cx='-50' cy='50' r='50'/%3E%3Ccircle fill='%2353ac9a' cx='50' cy='50' r='50'/%3E%3Ccircle fill='%23ceefc1' cx='150' cy='50' r='50'/%3E%3Ccircle fill='%23ffffff' cx='250' cy='50' r='50'/%3E%3Ccircle fill='%239de0fe' cx='350' cy='50' r='50'/%3E%3Ccircle fill='%233e9cda' cx='450' cy='50' r='50'/%3E%3Ccircle fill='%2300789c' cx='550' cy='50' r='50'/%3E%3Ccircle cx='650' cy='50' r='50'/%3E%3Ccircle fill='%23037B79' cx='0' cy='100' r='50'/%3E%3Ccircle fill='%2392DEBA' cx='100' cy='100' r='50'/%3E%3Ccircle fill='%23FFFFD8' cx='200' cy='100' r='50'/%3E%3Ccircle fill='%23CAF2FF' cx='300' cy='100' r='50'/%3E%3Ccircle fill='%236FCCFF' cx='400' cy='100' r='50'/%3E%3Ccircle fill='%23006EB4' cx='500' cy='100' r='50'/%3E%3Ccircle fill='%23037B79' cx='600' cy='100' r='50'/%3E%3Ccircle cx='50' cy='150' r='50'/%3E%3Ccircle cx='150' cy='150' r='50'/%3E%3Ccircle cx='250' cy='150' r='50'/%3E%3Ccircle cx='350' cy='150' r='50'/%3E%3Ccircle cx='450' cy='150' r='50'/%3E%3Ccircle cx='550' cy='150' r='50'/%3E%3C/g%3E%3C/svg%3E");
  }
  .banner span{
    color: rgb(73, 72, 72);
    font-size: 50px;
  }
</style>
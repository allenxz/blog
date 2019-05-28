<template>
  <div>
    <div class="banner">
      <span>机 器 视 觉</span>
    </div>
    <div class="catalogue">
      <article>
        <h3>2019</h3>
        <section>
          <span class="point-time point-green"></span>
          <time datetime="2019-2">
            <span>2-26</span>
          </time>
          <aside>
            <a href="/Machine-Vision/Picture-feature-extraction.html">图像的特征提取</a>
          </aside>
        </section>
        <section>
          <span class="point-time point-green"></span>
          <time datetime="2019-2">
            <span>2-7</span>
          </time>
          <aside>
            <a href="/Machine-Vision/Image-preprocessing.html">图像的预处理</a>
          </aside>
        </section>
      </article>
      <article>
        <h3>2018</h3>
        <section>
          <span class="point-time point-green"></span>
          <time datetime="2018-12">
            <span>12-24</span>
          </time>
          <aside>
            <a href="/Machine-Vision/Frame-difference-method.html">运动目标检测之帧差法</a>
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
    background-color: #00bb77;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23000' fill-opacity='.1' points='120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0'/%3E%3C/svg%3E");
  }
  .banner span{
    color: #fff;
    font-size: 50px;
  }
</style>
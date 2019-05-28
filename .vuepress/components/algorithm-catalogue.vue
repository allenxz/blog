<template>
  <div>
    <div class="banner">
      <span>算 法</span>
    </div>
    <div class="catalogue">
      <article>
        <h3>2019</h3>
        <section>
          <span class="point-time point-blue"></span>
          <time datetime="2019-2">
            <span>2-24</span>
          </time>
          <aside>
            <a href="/algorithm/Algorithm-problem-queue.html">算法题解-队列</a>
          </aside>
        </section>
        <section>
          <span class="point-time point-blue"></span>
          <time datetime="2019-2">
            <span>2-19</span>
          </time>
          <aside>
            <a href="/algorithm/Algorithm-problem-map.html">算法题解-Map</a>
          </aside>
        </section>
        <section>
          <span class="point-time point-blue"></span>
          <time datetime="2019-2">
            <span>2-16</span>
          </time>
          <aside>
            <a href="/algorithm/Algorithm-problem-simulation.html">算法题解-模拟</a>
          </aside>
        </section>
        <section>
          <span class="point-time point-blue"></span>
          <time datetime="2019-1">
            <span>1-30</span>
          </time>
          <aside>
            <a href="/algorithm/ACM-Practice-Guide.html">ACM修炼指南</a>
          </aside>
        </section>
      </article>
      <article>
        <h3>2018</h3>
        <section>
          <span class="point-time point-blue"></span>
          <time datetime="2018-12">
            <span>12-17</span>
          </time>
          <aside>
            <a href="/algorithm/Simulated-annealing-algorithm.html">模拟退火算法</a>
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
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 200 200'%3E%3Cpolygon fill='%23DCEFFA' points='100 0 0 100 100 100 100 200 200 100 200 0'/%3E%3C/svg%3E");
  }
  .banner span{
    color: rgb(88, 88, 88);
    font-size: 50px;
  }
</style>
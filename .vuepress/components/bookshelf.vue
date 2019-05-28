<template>
  <div class="Loader">
    <div class="shelf">
      <ul class="books">
        <li class="book one searching"></li>
        <li class="book two searching"></li>
        <li class="book three searching"></li>
        <li class="title">书架</li>
        <li class="book four searching"></li>
        <li class="book five searching"></li>
        <li class="book six searching"></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}

</script>
<style scoped>
li{
  list-style: none;
}
.Loader {
  min-height: 200px;         
  display: flex;
  justify-content: center;
  align-items: center;
}
.title{
  font-size: 45px;
  font-weight: 600;
  margin: 0 20px 10px 20px;
  text-align: center;
}
.shelf {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.shelf::after {
  content: "";
  position: absolute;
  width: 60vmin;
  margin: 0;
  border-bottom: 6px solid rgba(74, 191, 138, 0.8);
}

.books {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 60vmin;
  padding: 0;
  margin: 0;
}

.book {
  position: relative;
  list-style-type: none;
  height: 60px;
  width: 15px;
  border: 3px solid rgba(74, 191, 138, 1);
  margin: 0 1px 4px;
  padding: 0;
  border-radius: 2px;
  overflow: hidden;
  transform-origin: bottom left;
}

.book::before {
  content: "";
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  border: 2px solid rgba(74, 191, 138, 1);
  overflow: hidden;
}

.book::after {
  content: "";
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.one {
  width: 20px;
}

.one::after {
  content: "";
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  border: 2px solid rgba(74, 191, 138, 1);
}

.two {
  height: 70px;
  overflow:hidden;
}
.two::before {
  border: none;
}
.two::after {
  border: 6px solid rgba(74, 191, 138, 1);
}

.three {
  height: 72px;
  width: 22px;
}
.three::before {
  top: 20%;
}
.three::after {
  bottom: 65%;
  border: 2px solid rgba(74, 191, 138, 1);
}

.four {
  height: 78px;
}
.four::after {
  border: 2px solid rgba(74, 191, 138, 1);
}

.five {
  width: 20px;
}
.five::before {
  top: 50%;
  padding: 15px;
  border: 6px solid rgba(74, 191, 138, 1);
}

.six {
  height: 72px;
  width: 20px;
}


.book:nth-child(2) {
  -webkit-animation-delay: 200ms;
  animation-delay: 200ms;
}
.book:nth-child(3) {
  -webkit-animation-delay: 400ms;
  animation-delay: 400ms;
}
.book:nth-child(4) {
  -webkit-animation-delay: 800ms;
  animation-delay: 800ms;
}
.book:nth-child(5) {
  -webkit-animation-delay: 1000ms;
  animation-delay: 1000ms;
}
.book:nth-child(6) {
  -webkit-animation-delay: 1200ms;
  animation-delay: 1200ms;
}
.searching {
  animation: bounce 1200ms ease-in-out infinite;
}
/* animation */
@keyframes bounce {
  0% {
    transform: translateY(0px);
  }
  40% {
    transform: translateY(-30px);
  }
  100% {
    transform: translateY(0px);
  }
}
    
</style>
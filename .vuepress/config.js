module.exports = {
  title: 'Allen Tan',
  description: '阿政的前端博客',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', items: [
          { text: 'HTML/CSS', link: '/html-css/' },
          { text: 'JavaScript', link: '/JavaScript/' },
          { text: 'Vue', link: '/Vue/' },
          { text: '机器视觉', link: '/Machine-Vision/' },
          { text: '算法', link: '/algorithm/' },
          { text: '前端', link: '/front-end/' },
          { text: '笔/面试', link: '/Interview/' },
        ]
      },
      { text: '友情链接', link: '/link/' },
      { text: '书架', link: '/bookshelf/' },
      { text: '工具集', link: '/tools/' },
    ],
    search: true,
    searchMaxSuggestions: 10,
    sidebar: 'auto',
    lastUpdated: true,
    repo: 'https://github.com/allenxz',
    repoLabel: '我的Github',
  },
  markdown: {
    config: md => {
      md.set({html: true});
      md.use(require("markdown-it-katex"));
    }
  },
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css'}],
    ['link', { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css"}]
  ]
}

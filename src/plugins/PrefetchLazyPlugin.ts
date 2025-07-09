export const prefetchLazyPlugin = (paths: string[], prefix: string) => {
  const scriptArrs: string[] = []
  return {
    name: 'vite-plugin-prefetch-lazy',
    generateBundle(options, bundle) {
      console.log('bundle', bundle)
      const values = Object.values(bundle)
      values.forEach((item) => {
        if (paths.includes(item.name)) {
          // console.log('item', item.fileName);
          scriptArrs.push(prefix + item.fileName)
        }
      })
    },
    transformIndexHtml(html, ctx) {
      console.log('html', html, ctx)
      return scriptArrs.map((href) => {
        return {
          tag: 'link',
          attrs: {
            rel: 'prefetch',
            href,
            as: 'script',
          },
          injectTo: 'head',
        }
      })
    },
  }
}

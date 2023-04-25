import { ref, onMounted } from 'vue'

export const useMarkPosition = () => {
  let container = ref<HTMLElement>(document.body)

  let mo: any = null;
  let width: number = 200

  let height: number = 200
  let content: string = 'xw'
  let fontSize: string = '16px'
  let opacity: number = 0.16
  let zIndex: number = 1
  let rotate: number = -20
  let style: string = 'font-family: Arial; font-weight: bold'
  function add(args: any) {
    container.value = args
    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
                    <text x="10" y="50%"
                      transform="rotate(${rotate}, ${width / 2} ${height / 2})"
                      style="${style}; font-size: ${fontSize}; opacity: ${opacity}">
                      ${content}
                    </text>
                  </svg>`;
    const base64Url = `data:image/svg+xml;base64,${window.btoa(
      unescape(encodeURIComponent(svgStr))
    )}`;

    const __wm = document.querySelector('.__wm');
    const watermarkDiv = __wm || document.createElement('div');
    const styleStr = `
    position:absolute;
    top:0px;
    left:0px;
    width:100%;
    height:100%;
    z-index:${zIndex};
    pointer-events:none;
    background-repeat:repeat;
    background-image:url('${base64Url}')`;

    watermarkDiv.setAttribute('style', styleStr);
    watermarkDiv.classList.add('__wm');

    container.value.style.position = 'relative';
    if (!__wm) {
      container.value.appendChild(watermarkDiv);
    }
    const win: any = window
    const MutationObserver = win.MutationObserver || win.WebKitMutationObserver;
    if (MutationObserver) {
      const args = arguments[0];
      mo = new MutationObserver(function () {
        const __wm = document.querySelector('.__wm');
        if (
          (__wm && __wm.getAttribute('style') !== styleStr) ||
          !__wm ||
          container.value.style.position !== 'relative'
        ) {
          mo.disconnect();
          mo = null;
          add(args);
        }
      });
      // mo.observe(container, {
      //   attributes: true, 
      //   childList: true
      // })
    }
  }
  onMounted(() => {
    add(document.body)
  })
}
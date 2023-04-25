
import { defineComponent, h } from "vue";

export default defineComponent({
  name: "renderButton",
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null,
    },
  },

  setup: (props: any) => {
    const params = {
      row: props.row,
      column: props.column,
      index: props.index,
    };
    return () => props.render(params)
  },

});

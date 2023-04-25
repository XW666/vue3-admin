import {
  defineStore
} from 'pinia';
import { ref } from "vue"
import { type RouteLocationNormalized } from "vue-router"

export type ITagView = Partial<RouteLocationNormalized>

export const useTagsViewStore = defineStore('tagsView', {
  state: () => {
    return {
      visitedViews: ref<ITagView[]>([]),
      cachedViews: [],
    }
  },
  getters: {},
  actions: {
    addVisitedView(view: ITagView) {

      if (this.visitedViews.some(v => v.path === view.path)) return
      this.visitedViews.push(Object.assign({}, view))
    },
    delVisitedView(view: ITagView) {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
    },
    delOthersVisitedViews(view: ITagView) {
      const affixTags = this.visitedViews.filter(v => v.path === view.path)
      this.visitedViews = affixTags
    },
    delAllVisitedViews() {
      const affixTags = this.visitedViews.filter((tag) => tag.meta?.affix)
      this.visitedViews = affixTags
    }
  }
})
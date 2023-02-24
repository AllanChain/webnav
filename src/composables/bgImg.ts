import { type Config } from '@/store/config'
import { useDBStore } from '@/store/db'
import { type Ref, ref, watch } from 'vue'

export const useBGImg = (config: Ref<Config>): { bgImg: Ref<string | null> } => {
  const dbStore = useDBStore()
  const bgImg = ref<string | null>(null)
  watch(() => config.value.bgImg.url, async () => {
    const url = config.value.bgImg.url
    if (!url.startsWith('upload://')) {
      bgImg.value = url
    } else {
      const db = await dbStore.getDB()
      const bgName = url.slice('upload://'.length)
      const result = await db.get('backgrounds', bgName)
      bgImg.value = result === undefined ? '' : URL.createObjectURL(result.data)
    }
  }, { immediate: true })
  return { bgImg }
}

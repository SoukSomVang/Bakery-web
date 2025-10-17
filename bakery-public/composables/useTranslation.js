import enTranslations from '~/locales/en.json'
import loTranslations from '~/locales/lo.json'

export const useTranslation = () => {
  // Current locale state (default to English)
  const currentLocale = useState('locale', () => 'en')

  // Available locales
  const availableLocales = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'lo', name: 'ລາວ', flag: '🇱🇦' }
  ]

  // Translation data
  const translations = {
    en: enTranslations,
    lo: loTranslations
  }

  /**
   * Get translation by key path
   * @param {string} key - Dot notation path (e.g., 'manual.title')
   * @param {object} params - Optional parameters for interpolation
   * @returns {string} Translated text
   */
  const t = (key, params = {}) => {
    const locale = currentLocale.value
    const keys = key.split('.')

    let value = translations[locale]

    // Navigate through nested object
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback to English if key not found in current locale
        value = translations['en']
        for (const k of keys) {
          if (value && typeof value === 'object' && k in value) {
            value = value[k]
          } else {
            console.warn(`Translation key not found: ${key}`)
            return key
          }
        }
        break
      }
    }

    // If value is still an object, return the key
    if (typeof value === 'object') {
      console.warn(`Translation key is not a string: ${key}`)
      return key
    }

    // Replace parameters in translation string
    let result = value || key
    if (params && typeof params === 'object') {
      Object.keys(params).forEach(param => {
        result = result.replace(new RegExp(`\\{${param}\\}`, 'g'), params[param])
      })
    }

    return result
  }

  /**
   * Switch language
   * @param {string} locale - Locale code ('en' or 'lo')
   */
  const switchLocale = (locale) => {
    if (translations[locale]) {
      currentLocale.value = locale
      // Save to localStorage
      if (import.meta.client) {
        localStorage.setItem('locale', locale)
      }
    } else {
      console.error(`Locale not supported: ${locale}`)
    }
  }

  /**
   * Get current locale
   * @returns {string} Current locale code
   */
  const getLocale = () => {
    return currentLocale.value
  }

  /**
   * Check if locale is Lao
   * @returns {boolean}
   */
  const isLao = computed(() => currentLocale.value === 'lo')

  /**
   * Check if locale is English
   * @returns {boolean}
   */
  const isEnglish = computed(() => currentLocale.value === 'en')

  // Initialize locale from localStorage on client
  onMounted(() => {
    if (import.meta.client) {
      const savedLocale = localStorage.getItem('locale')
      if (savedLocale && translations[savedLocale]) {
        currentLocale.value = savedLocale
      }
    }
  })

  return {
    t,
    currentLocale,
    availableLocales,
    switchLocale,
    getLocale,
    isLao,
    isEnglish
  }
}

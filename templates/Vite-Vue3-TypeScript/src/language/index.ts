import {createI18n} from 'vue-i18n'
import zh from './zh.json'
import en from './en.json'

const messages = {
    zh: {...zh},
    en: {...en}
}

// 获取浏览器当前语言
const getCurrentLanguage = () => {
    const language = navigator.language
    const currentLanguage = language.indexOf('zh') !== -1 ? 'zh' : 'en'
    localStorage.setItem('language', currentLanguage)
    return currentLanguage
}

// 创建i18n实例
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: localStorage.getItem('language') || getCurrentLanguage() || 'zh',
    messages: messages
})

export default i18n

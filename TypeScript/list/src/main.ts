import './css/styles.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
    const fullList = FullList.instance
    const template = ListTemplate.instance

    const entryItemForm = document.getElementById('entryItemForm') as HTMLFormElement
    entryItemForm.addEventListener("submit", (event: SubmitEvent): void => {
        event.preventDefault()

        const inputNewItem = document.getElementById('newItem') as HTMLInputElement
        const newEntryText: string = inputNewItem.value.trim()
        if (!newEntryText.length) return

        const itemId: number = fullList.list.reduce((initId, id) => {
            return (initId = initId > parseInt(id.id) ? initId : parseInt(id.id) + 1)
        }, 1)

        const newItem = new ListItem(itemId.toString(), newEntryText)

        fullList.addItemInFront(newItem)
        inputNewItem.value = ""
        template.render(fullList)

    })

    const clearItems = document.getElementById('clearItems') as HTMLButtonElement

    clearItems.addEventListener('click', (): void => {
        fullList.clearList()
        template.clear()
})
    fullList.load()
    template.render(fullList)
}

document.addEventListener("DOMContentLoaded", initApp)

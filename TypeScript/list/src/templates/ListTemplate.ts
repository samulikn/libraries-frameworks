import '../css/styles.css'
import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
}

export default class ListTemplate implements DOMList {

    ul: HTMLUListElement

    static instance: ListTemplate = new ListTemplate()

    private constructor (){
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }

    clear(): void {
        this.ul.innerHTML = ''
    }

    render(fullList: FullList): void {
        this.clear()

        fullList.list.forEach(item => {
            const li = document.createElement("li") as HTMLLIElement
            li.className = "flex mb-0.5 justify-between text-white first:pt-2.5"

            const check = document.createElement("input") as HTMLInputElement
            check.className="mt-1 h-5 w-5 peer"
            check.type = "checkbox"
            check.id = item.id
            check.checked = item.checked
            li.append(check)

            check.addEventListener('change', () => {
                item.checked = !item.checked
                fullList.checkItem(item)
                this.render(fullList)
            })

            const label = document.createElement("label") as HTMLLabelElement
            label.className="px-1 grow text-lg peer-checked:line-through"
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)

            const button = document.createElement("button") as HTMLButtonElement
            button.className = "px-1 mt-0.5 flex-none rounded-md bg-gray-600 h-6 w-6 hover:text-blue-400"
            button.textContent = "X"
            li.append(button)

            button.addEventListener('click', () => {
                fullList.removeItem(item.id)
                this.render(fullList)
            })

            this.ul.append(li)
        })
    }

}


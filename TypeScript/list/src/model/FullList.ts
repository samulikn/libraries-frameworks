import ListItem from "./ListItem";

interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItemInFront(itemObj: ListItem): void,
    addItemBehind(itemObj: ListItem): void,
    removeItem(id: string): void,
    checkItem(itemObj: ListItem): void,
}

export default class FullList implements List {

    static instance: FullList = new FullList()

    private constructor(private _list: ListItem[] = []){}

    get list(): ListItem[] {
        return this._list
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("myList")
        if (typeof storedList !== "string") return

        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList)
        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)

            FullList.instance.addItemBehind(newListItem)
        })
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))
    } 

    clearList(): void {
        this._list = []
        this.save()
    }

    addItemInFront(itemObj: ListItem): void {
        this._list.unshift(itemObj)
        this.save()
    }

    addItemBehind(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }

    removeItem(id: string): void {
        this._list = this._list.filter(i => i.id !== id)
        this.save()
    }

    checkItem(itemObj: ListItem): void {
        this.removeItem(itemObj.id)
        if (itemObj.checked === false) {
            this.addItemInFront(itemObj)
        } else {
            this.addItemBehind(itemObj)
        }
    }
}
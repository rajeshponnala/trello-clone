interface Item {
    id: string
}

export const findItemIndexById = <T extends Item>(items: ReadonlyArray<T>, id: string) => {
    return items.findIndex((item: T) => item.id === id)
}
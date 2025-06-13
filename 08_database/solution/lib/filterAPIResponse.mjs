


export default function filterByName (array, name) {
    return array.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));
}
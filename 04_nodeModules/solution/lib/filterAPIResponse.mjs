


export default function filterByName (array, name) {
    console.log(name);
    return array.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));
}

export const fetching = async () => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10&_page=1')
        if(!res.ok){
         throw new Error (" data res isn't ok")
        }
        const data = await res.json()
        return data
    } catch (err) {
        console.error("Error fetching data", err)
    }
}
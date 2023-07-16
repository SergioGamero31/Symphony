import { ref, readonly } from "vue";

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export function useFetch(){
    const results = ref(null)
    const error = ref(null)

    const fetchData = async (url) => {
        try{
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': apiUrl
                }
            })
            const response = await res.json();
            results.value = response
        }catch(err){
            console.error(err)
            error.value = err
        }
    }
    return { fetchData, results: readonly(results), error }
}

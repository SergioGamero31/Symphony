import { ref, readonly } from "vue";
import config from "../../config";

export function useFetch(){
    const results = ref(null)
    const error = ref(null)

    const fetchData = async (url) => {
        try{
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': config.apikey,
                    'X-RapidAPI-Host': config.apiHost
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

export default function useGetLocalStorage() {
  if(typeof window !== 'undefined'){
    if(sessionStorage.getItem('adminData') === null ){
        return false
    } else {
        return true
    }
  }
}
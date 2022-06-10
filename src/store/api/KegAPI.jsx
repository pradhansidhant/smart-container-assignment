

export const getAllKegs = async () => {
    return fetch("data.json")
        .then(res => res.json())
        .then(data => {
            if (data && data.kegs) {
                return data.kegs
            } else {
                return []
            }
        }).catch(error => {
            console.log("Error", error)
            return null;
        })
}
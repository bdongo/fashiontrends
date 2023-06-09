export const harvard = async (query, num = 5) => {
    let output = [];

    let res = await fetch(`https://api.harvardartmuseums.org/image?q=${query}&size=${num}&apikey=12403398-3c09-42ff-af07-f434bfd000a1&hasimage=true&permissionlevel=0`, {
        headers: { "Accept": "application/json" }
    })

    if (res.ok) {
        let data = await res.json()
    
        for (let i = 0; i < data.records.length; i++) {
    
            if (data.records[i].baseimageurl) {
                let dateCheck = parseInt(data.records[i].date?.split("-")[0])
                if (dateCheck === 0) {
                    dateCheck = 1
                }
    
                let sourceInfo;
                if (data.records[i].copyright) {
                    sourceInfo = `Harvard Art Museums API/ ${data.records[i].copyright}`
                } else {
                    sourceInfo = "Harvard Art Museums API"
                }
                let desc;
                if (data.records[i].description) {
                    desc = data.records[i].description;
                } else {
                    desc = 1;
                }
    
                output.push({ 
                    url: data.records[i].baseimageurl,
                    date: dateCheck,
                    source: sourceInfo,
                    description: desc
                })
            }
        }
    
        return output;
    }
}

export const cleveland = async (query, num = 5) => {
    let output = [];

    let res = await fetch(`https://openaccess-api.clevelandart.org/api/artworks/?q=${query}&has_image=1&limit=${num}&created_after=1400`, {
        headers: { "Accept": "application/json" }
    })
    if (res.ok) {   
        let data = await res.json()
    
        for (let i = 0; i < data.data.length; i++) {
    
            if (data.data[i].images.web.url) {
                let dateCheck = data.data[i].creation_date_earliest
                if (dateCheck === 0) {
                    dateCheck = 1
                }
                let sourceInfo;
                if (data.data[i].creditline) {
                    sourceInfo = `The Cleveland Museum of Art API/ ${data.data[i].creditline}`
                } else {
                    sourceInfo = "The Cleveland Museum of Art API"
                }
    
                let desc;
                if (data.data[i].tombstone) {
                    desc = data.data[i].tombstone;
                } else {
                    desc = 1;
                }
                output.push({ 
                    url: data.data[i].images.web.url, 
                    date: dateCheck,
                    source: sourceInfo,
                    description: desc
                })
            }
        }
    
        return output;
    }
}

export const chicago2 = async (url) => {

    let res = await fetch(url, {
        headers: { "Accept": "application/json" }
    })
    if (res.ok) {
        let data = await res.json()
        let dateInfo =  data.data.date_start
        let linkStr = `${data.config.iiif_url}/${data.data.image_id}/full/843,/0/default.jpg`
        let sourceInfo;
        if (data.data.credit_line) {
            sourceInfo = `Art Institute of Chicago API/ ${data.data.credit_line}`
        } else {
            sourceInfo = "Art Institute of Chicago API"
        }
        let desc;
        if (data.data.title) {
            desc = data.data.title
        } else {
            desc = 1;
        }
        return {
                url: linkStr, 
                date: dateInfo,
                source: sourceInfo,
                description: desc
            }
    }
}

export const chicago = async (query, num = 5) => {
    let output = []

    let res = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${query}&limit=${num}/manifest.json`, {
        headers: { "Accept": "application/json" }
    })

    if (res.ok) {
        let data = await res.json()
    
        for (let i = 0; i < data.data.length; i++) {
    
            const link = await data.data[i].api_link
                
            let infoObj = await chicago2(link)
            output.push(infoObj);
        }
    
        return output
    }

}

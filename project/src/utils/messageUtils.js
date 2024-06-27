// Function to send message with ImpcApiData
export function sendIMPCMessage(iframe, data) {

    console.log("Sending message to iframe")
    // TODO: Full disease Phenotypes have to be brought using another API call - for now use static

    // For now lets pass the phenotypes of the matched phenotypes only
    // TODO: Using the matched phenotypes only affects the colouring of the grid. 
    // Might be best to have another API call to bring the full disease phenotypes

    // Create an array to store the objects containing the phenogrid data
    var objectSets = []

    for (let i = 0; i < data['response']['docs'].length; i++) {
        const doc = data['response']['docs'][i]
        const phenotypes = doc['model_matched_phenotypes']
        const id = doc['model_description']
        const phenodigm_score = ((doc['disease_model_avg_norm'] + doc['disease_model_max_norm']) / 2).toFixed(2)
        const label = `${phenodigm_score}-${doc['model_description']}`


        // Parse the phenotypes to extract an array with only MP terms
        const mpTerms = []

        // Iterate over phenotypes, if not empty, extract MP ID only. 
        for (let i = 0; i < phenotypes.length; i++) {
            if (phenotypes[i].trim().length > 0) {
                var mpTerm = phenotypes[i].split(" ", 1).toString();
                mpTerms.push(mpTerm);
            }
        }

        // Create the object where the data will be stored
        var dict = {
            id: id,
            label: label,
            phenotypes: mpTerms
        }

        // Append to array
        objectSets.push(dict)
    }


// Send the message to the monarch API
    iframe.contentWindow?.postMessage({
        subjects: ["HP:0000855",
            "HP:0031819",
            "HP:0000006",
            "HP:0005978",
            "HP:0003584"],
        "object-sets": objectSets,
    }, "http://monarchinitiative.org");
}
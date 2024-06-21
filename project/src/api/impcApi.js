// Function to call the IMPC API
export async function callImpcApi(markerId, diseaseId) {

    console.log("calling IMPC API")
    const url = `https://www.ebi.ac.uk/mi/impc/solr/phenodigm/select?rows=100&q=type:disease_model_summary%20AND%20marker_id:%22${markerId}%22%20AND%20disease_id:%22${diseaseId}%22&`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
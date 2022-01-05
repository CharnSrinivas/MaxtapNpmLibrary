
export const queryData = (file_name: string):Promise<[]> => {

    return new Promise((res, rej) => {
        if (!file_name.includes('.json')) {
            file_name += '.json';
        }
        fetch(`https://storage.googleapis.com/maxtap-adserver-dev.appspot.com/${file_name}`
            , {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        )
            .then(fetch_res => {
                fetch_res.json().then((json_data: []) => {
                    json_data.sort((a, b) => {
                        if (parseInt(a['start']) < parseInt(b['start'])) {
                            return -1;
                        }
                        if (parseInt(a['start']) > parseInt(b['start'])) {
                            return 1;
                        }
                        return 0;
                    })
                    res(json_data);
                })
            }).catch(err => {
                rej(err);
            })
    })
}
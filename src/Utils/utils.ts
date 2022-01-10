import { DataUrl } from "../config";
export const fetchAdData = (file_name: string): Promise<[]> => {

    return new Promise((res, rej) => {
        try {
            if (!file_name.includes('.json')) {
                file_name += '.json';
            }
            fetch(`${DataUrl}/${file_name}`
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
                            if (parseInt(a['start_time']) < parseInt(b['start_time'])) {
                                return -1;
                            }
                            if (parseInt(a['start_time']) > parseInt(b['start_time'])) {
                                return 1;
                            }
                            return 0;
                        })
                        res(json_data);
                    })
                }).catch(err => {
                    rej(err);
                })
        } catch (err) {
            rej(err)
        }
    })

}
// POST voor het opvragen van een management api access token
export async function getManagmentAccessApiToken(){
var axios = require("axios").default;
// POST voor management api access token te krijgen
var options = {
  method: 'POST',
  url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
  headers: {'content-type': 'application/json'},
  data: {
    grant_type: 'client_credentials',
    client_id: 'xoLVQ2s1wWCntDRgQ64TD8JNF205iC3L',
    client_secret: '0O2aObPZrLEn2qOOHikjwrnzehIXXvSetSluwi4SY2LnzCNRxRXLVwZP5A7o8VV7',
    audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`
  }
};

const resp = await axios.request(options);
return resp.data;

}

// export async function getAllUsers(accessToken){
//     const response = await fetch (`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users`, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${accessToken}`
//         }
//     });
//     const users = await response.json();
//     return users;
// }
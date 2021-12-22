// POST voor het opvragen van een management api access token
export async function getManagmentAccessApiToken(){
var axios = require("axios").default;
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
// GET voor het opvragen van alle users
export async function getAllUsers(accessToken){
  var axios = require("axios").default;
  var options = {
    method: 'GET',
    url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users`,
    headers: {'authorization': `Bearer ${accessToken}`},
  };
  
  const resp = await axios.request(options);
  return resp.data;
}
// DELETE voor het uitschrijven vanuit de website
export async function deleteUser(accessToken,user_id){
  var axios = require("axios").default;
  var options = {
    method: 'GET',
    url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user_id}`,
    headers: {'authorization': `Bearer ${accessToken}`},
  };
  const resp = await axios.request(options);
  return resp.data;
}
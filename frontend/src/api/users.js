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
// export async function getManagmentAccessApiToken(){
//     const response = await fetch (`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded'
//         },
//         body: JSON.stringify({
//             client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
//             client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
//             audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2`,
//             grant_type: "client_credentials",
//         })
//     }).then(function (resp){
//         return resp.json();
//     }).then(function (data){
//         console.log('token',data);
//     }).catch(function (err){
//         console.log('Something went wrong', err);
//     });

//     return response;
// }
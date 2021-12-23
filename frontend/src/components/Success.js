import React, {useState, useEffect} from "react";
import {useAuth0} from "@auth0/auth0-react";
import { initializeApp } from "firebase/app";
import { getStorage, ref , uploadBytes,getDownloadURL  } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

// Set the configuration for your app
// TODO: Replace with your app's config object
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};  

const firebaseApp = initializeApp(config);

const Success = () => {

    const {user } = useAuth0();
    const [downloadUrl, setDownloadUrl] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);  
    
    
    async function getReadableStream(body){
        const reader = body.getReader();

        return await new ReadableStream({
            start(controller) {
            // The following function handles each data chunk
            function push() {
                // "done" is a Boolean and value a "Uint8Array"
                reader.read().then( ({done, value}) => {
                // If there is no more data to read
                if (done) {
                    //console.log('done', done);
                    controller.close();
                    return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);
                // Check chunks by logging to the console
                //console.log(done, value);
                push();
                })
            }

            push();
            }
            });
        }

    useEffect(() => {
        (async() => {
            if (user){
                const urlParams = new URLSearchParams(window.location.search);
                let datum = urlParams.get('datum');
                const uur = urlParams.get('uur');
                const zaal = urlParams.get('zaal');
                const datumList = datum.split(" ");
                const mapping = {
                    "december" : "12",
                    "januari" : "01",
                    "februari" : "02",
                    "maart" : "03",
                    "april" : "04",
                    "mei" : "05",
                    "juni" : "06",
                    "juli" : "07",
                    "augustus" : "08",
                    "september" : "09",
                    "oktober" : "10",
                    "november" : "11"
                }

                datum = datumList[0] + "/" + mapping[datumList[1].toLowerCase()] + "/" + datumList[2];
                var params = new URLSearchParams(window.location.search);
                var id = params.get('id');
                const res = await fetch(`${process.env.REACT_APP_API_URL}/checkout-session?id=${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const {line_items} = await res.json();
                const order = {
                    items: line_items.data,
                    order_nr: id,
                    vertoning: {
                        zaal: zaal,
                        uur: uur,
                        datum: datum
                    }
                }
                const customerObject = {
                    name: user.name,
                    email: user.email,
                }

                const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({customerObject,order})        
                });
                const stream = await getReadableStream(response.body);
                const blob = await new Response(stream, { headers: { "Content-Type": "application/pdf" } }).blob();;
                const storage = getStorage(firebaseApp);
                const storageRef = ref(storage, `/pdf/${uuidv4()}.pdf`);
                //console.log("Saving in storage");
                //console.log(blob);
                const snapshot = await uploadBytes(storageRef, blob);
                const downloadURL = await getDownloadURL(snapshot.ref);
                setDownloadUrl(downloadURL);
                await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({url: downloadURL, email: user.email})
                  });
                setIsLoading(true);
            }})();
    }, [user]);


    return (
        <div>
            {
            user && <Container> 
                        {
                            isLoading === false ? <Loader></Loader> : <h1 style={{ fontSize: "4rem" }}>Bedankt om uw tickets bij ons te kopen !</h1>
                        }
                    </Container>
            }
        </div>
    );
}

export default Success;


const Loader = styled.div`
   border: 16px solid #f3f3f3; 
  border-top: 16px solid #3498db; 
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
 `   
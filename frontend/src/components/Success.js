import React from "react";
import {useAuth0} from "@auth0/auth0-react";

const Success = () => {

    const {user } = useAuth0();
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

    const getPdf = async() => {
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

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank').focus();
    }


    return (
        <div>
            {
            user && <> 
                        <h1>Thanks for buying our product</h1>
                        <button onClick={getPdf}> Show pdf</button>
                    </>
            }
        </div>
    );
}

export default Success;
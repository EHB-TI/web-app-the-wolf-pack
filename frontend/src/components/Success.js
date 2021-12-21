import React from "react";
import {useAuth0} from "@auth0/auth0-react";

const Success = () => {

    const {user } = useAuth0();
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
            order_nr: id
        }
        const customer = {
            name: user.name,
            email: user.email,
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({customer,order})        
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank').focus();
    }


    return (
        <div>
            <h1>Thanks for buying our product</h1>
            <button onClick={getPdf}> Show pdf</button>
        </div>
    );
}

export default Success;
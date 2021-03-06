import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AllPromotions } from "../../Library/UseFetch";
import jeans from "../../Assets/promotionsImages/jeans.png";
import shoes from "../../Assets/promotionsImages/shoes.png";
import dresses from "../../Assets/promotionsImages/dresses.png";
import handbags from "../../Assets/promotionsImages/handbags.png";
import home from "../../Assets/promotionsImages/home.png";
import Style from "./PromotionDisplay.module.css";

export default function PromotionsDisplay() {
    const [data, setData] = useState([]);
    let randomPromotions = [];
    console.log(data);
    useEffect(() => {
        AllPromotions().then((response) => setData(response));
    }, []);

    if (data.length > 0) {
        //JSON parse and JSON.stringify clone the Array instead of referencing it
        const tempData = JSON.parse(JSON.stringify(data));
        const promotionsBuffer = [];
        for (let i = 0; i < 2; i++) {
            const randomElementsArray = tempData.splice(
                //Generate a random number between 0 and the lenght of our data
                Math.floor(Math.random() * tempData.length - 1),
                1
            );
            //Splice reeturn an Array of elements, we only need the fisrt one
            promotionsBuffer.push(randomElementsArray[0]);
        }
        randomPromotions = promotionsBuffer;
        for (let i = 0; i < randomPromotions.length; i++) {
            switch (randomPromotions[i].promotionID) {
                case 1:
                    randomPromotions[i].picture = jeans;
                    break;
                case 2:
                    randomPromotions[i].picture = handbags;
                    break;
                case 3:
                    randomPromotions[i].picture = home;
                    break;
                case 4:
                    randomPromotions[i].picture = dresses;
                    break;
                case 5:
                    randomPromotions[i].picture = shoes;
                    break;
                default:
                    break;
            }
        }
    }
    return (
        <div>
            {randomPromotions.map((el, index) => (
                <section className="card mb-3 back" key={index}>
                    <img src={el.picture} className="card-img-top width height" alt={el.description} />
                </section>
            ))}
        </div>
    );
}

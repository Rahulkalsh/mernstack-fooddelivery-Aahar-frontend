import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    let foodItem = props.foodItem;
    let options = props.options;
    let priceOptions = Object.keys(options);
    const priceRef = useRef();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === foodItem._id) {
                food = item;

                break;
            }
        }
        console.log(food)
        console.log(new Date())
        if (food.length !== 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }

        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


        // setBtnEnable(true)

    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "16rem", "maxHeight": "360px" ,gap:"20px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />

                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                            <select className='m-2 h-100 rounded w-20'  style={{ backgroundColor: "MediumSeaGreen", select: "#FF0000" }} onChange={(e) => setQty(e.target.value)}>
                                {
                                    Array.from(Array(6), (e, i) => {
                                        return (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        )
                                    })
                                }
                            </select>
                            <select className='m-2 h-100 rounded w-20' style={{ backgroundColor: "MediumSeaGreen", select: "#FF0000" }} ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {
                                    priceOptions.map((data) => {
                                        return <option key={data} value={data}>{data}</option>
                                    })
                                }
                            </select>
                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                ₹{finalPrice}/-
                            </div>
                        </div>
                        <hr>
                        </hr>
                        <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

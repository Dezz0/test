import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addLikeOnPhoto,
    deletePhoto,
    fetchPhotos,
    filtred,
    photos,
    showLikedPhotos
} from "../features/counter/photosSlice";
import style from "../styles/photo.module.css";

export default function App() {
    const dispatch = useDispatch();
    const filter = useSelector(filtred);
    const data = useSelector(photos);
    const render = filter ? data.filter((photo) => photo.isLiked === true) : data;

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    function handleAddLike(id) {
        dispatch(addLikeOnPhoto(id));
    }
    function handleRemovePhoto(id) {
        dispatch(deletePhoto(id));
    }
    const handleChangeFilter = () => {
        dispatch(showLikedPhotos());
    };

    return (
        <div className={style.center}>
            <div className={style.filter_btn}>
                <input
                    className={style.filter_input}
                    type="checkbox"
                    name="like"
                    id="like_btn"
                    checked={filter}
                    onChange={handleChangeFilter}
                />
                <label className={style.filter_label} htmlFor="like_btn">
                    {filter ? "Показать все" : "Понравившиеся"}
                </label>
            </div>
            {render.map((photo) => (
                <div key={photo.id} className={style.card}>
                    <div className={style.like_btn} onClick={() => handleAddLike(photo.id)}>
                        <svg
                            width="32px"
                            height="32px"
                            viewBox="0 0 24 24"
                            fill={photo.isLiked ? "black" : "#d4d4d4"}
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                                    fill={photo.isLiked ? "#fe9090" : "#fffafa"}></path>
                            </g>
                        </svg>
                    </div>
                    <div className={style.delete_btn} onClick={() => handleRemovePhoto(photo.id)}>
                        <svg
                            width="30px"
                            height="30px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                    d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                                    stroke="#636363"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"></path>{" "}
                            </g>
                        </svg>
                    </div>
                    <img className={style.photo} src={photo.thumbnailUrl} alt="" />
                    <p>{photo.title}</p>
                </div>
            ))}
        </div>
    );
}

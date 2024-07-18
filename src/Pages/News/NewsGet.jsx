import React, { useEffect, useState } from 'react';

export default function NewsGet() {
    const [news, setNews] = useState([]);
    const urlImg = "https://api.dezinfeksiyatashkent.uz/api/uploads/images/";

    const getNews = () => {
        fetch("https://api.dezinfeksiyatashkent.uz/api/news/")
            .then(res => res.json())
            .then(news => {
                setNews(news.data);
            });
    };

    useEffect(() => {
        getNews();
    }, []);

    return (
        <>
            {news && news.map((item, index) => (
                <div className='flex' key={index}>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Title</th>
                            <th>Title</th>
                            <th>Title</th>
                            <th>Title</th>
                            <th>Title</th>
                            <th>Title</th>
                        </tr>
                        <tr>
                            <td>{item.title_en}</td>
                            <td>Griffin</td>
                        </tr>
                        <tr>
                            <td>Lois</td>
                            <td>Griffin</td>
                        </tr>
                     
                        {(
                            <img className='w-[300px] h-[300px]'
                                src={`${urlImg}${item.news_images[0]?.['image.src']}`}
                                alt={item.title}
                                onError={(e) => console.error(`Ошибка загрузки изображения: ${e.target.src}`)}
                            />
                        )}
                    </table>
                </div>
            ))}
        </>
    );
}

import Link from "next/link";

export default function NewsList({ news }) {
    return (
        <ul id="news" className="news-list">
          {Array.isArray(news) ? news.map(news => (
            <li key={news.id}>
              <Link href={`/news/${news.slug}`}>
                <img src={`/images/news/${news.image}`} alt={news.title} />
                <span>{news.title}</span>
              </Link>
            </li>
          )) : <p>No news available</p>}
        </ul>
    )
}
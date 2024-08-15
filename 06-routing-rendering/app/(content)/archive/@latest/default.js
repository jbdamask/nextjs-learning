import NewsList from "@/components/news-list";
import { getLatestNews } from "@/lib/utils-news";

export default function LatestPage() {
    const latestNews = getLatestNews();
    return (
        <>
            <h2>Latest</h2>
            <NewsList news={latestNews} />
        </>
    );
  }
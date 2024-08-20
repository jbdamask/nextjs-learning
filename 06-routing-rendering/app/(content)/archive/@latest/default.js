import NewsList from "@/components/news-list";
import { getLatestNews } from "@/lib/utils-news";

export default async function LatestPage() {
    const latestNews = await getLatestNews();
    return (
        <>
            <h2>Latest</h2>
            <NewsList news={latestNews} />
        </>
    );
  }